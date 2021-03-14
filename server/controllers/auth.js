import GoogleAuth from 'google-auth-library';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import Profile from '../models/profile.js';
import ResetPassword from '../models/resetPassword.js';
var googleClient = new GoogleAuth.OAuth2Client(process.env.GOOGLE_CLIENT);

const tokenDuration = 15 * 24 * 60 * 60; // 15 days

// function to create JWT token
function createJWT(email, userId, duration) {
  const payload = {
    email,
    userId,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
}

export async function signup(req, res) {
  const { username, email, password, confirmationPassword } = req.body;

  // make sure the request has valid fields
  const errors = [];
  if (!username) {
    errors.push({
      error: 'bad request',
      message: 'name is required in the request',
    });
  }
  if (!email) {
    errors.push({
      error: 'bad request',
      message: 'email is required in the request',
    });
  }
  if (!password) {
    errors.push({
      error: 'bad request',
      message: 'password is required in the request',
    });
  }
  if (password !== confirmationPassword) {
    errors.push({ error: 'bad request', message: 'passwords do not match' });
  }

  // request did not provided all required field
  if (errors.length > 0) {
    return res.send(400).json({ errors });
  }

  try {
    const user = await Profile.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: 'Duplicate content', message: 'Email already taken' });
    } else {
      const newProfile = new Profile({ username, email, password });

      // hashpassword
      const salt = await bcrypt.genSalt(process.HASH_DIGIT);
      if (!salt) {
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Something went wrong in the server',
        });
      }

      const hashedPassword = await bcrypt.hash(password, salt);
      if (!hashedPassword) {
        return res.status(500).json({
          error: 'Internal Server',
          message: 'Something went wrong with Bcrypt',
        });
      }

      newProfile.password = hashedPassword;
      await newProfile.save();

      // create a JWT token for the user and send request
      const access_token = createJWT(
        newProfile.email,
        newProfile._id,
        tokenDuration
      );

      return res.status(200).json({
        jwtToken: access_token,
        user: {
          id: newProfile._id,
          username: newProfile.username,
          email: newProfile.email,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: 'something went wrong on our server',
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  // check that all required fields are there
  const errors = [];
  if (!email) {
    errors.push({
      error: 'bad request',
      message: 'email is required in the request',
    });
  }
  if (!password) {
    errors.push({
      error: 'bad request',
      message: 'password is required in the request',
    });
  }
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const user = await Profile.findOne({ email });

    // user with such email not found
    if (!user)
      return res.status(404).json({
        error: '404 error ',
        message: 'User with such email not found',
      });

    // make sure password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(403)
        .json({ error: 'invalid password', message: 'incorrect password' });

    // create a JWT token for the user
    const access_token = createJWT(user.email, user._id, tokenDuration);
    return res.status(200).json({
      jwtToken: access_token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}

export async function getUser(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized error ',
      message: 'User is not authorized to view this information',
    });
  }

  try {
    const user = await Profile.findById(req.user.userId);
    if (!user) {
      res.status(404).json({
        error: 'Not found error',
        message: 'User was not found',
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}

export async function updateUser(req, res) {
  const { username, email } = req.body;
  // check that all required fields are there
  const errors = [];
  if (!username) {
    errors.push({
      error: 'bad request',
      message: 'username is required in the request',
    });
  }
  if (!email) {
    errors.push({
      error: 'bad request',
      message: 'email is required in the request',
    });
  }
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const user = await Profile.findByIdAndUpdate(req.user.userId, {
      username,
      email,
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}

export async function googleLogin(req, res) {
  const { tokenId } = req.body;

  // no tokenId provided return bad request code
  if (!tokenId) {
    return res
      .status(400)
      .json({ error: 'bad request', message: 'Token id is required' });
  }

  try {
    // verify the token
    const clientResponse = await googleClient.verifyIdToken({
      idToken: tokenId,
    });

    const { email_verified, email } = clientResponse.payload;

    // proceed only if email was verified
    if (email_verified) {
      const user = await Profile.findOne({ email });

      // make sure this email was already registerd, then send a new response with token
      if (user) {
        const access_token = createJWT(user.email, user._id, tokenDuration);
        return res.status(200).json({
          jwtToken: access_token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        return res.status(404).json({
          error: 'Not found error',
          message: 'Email not found in server database',
        });
      }
    } else {
      return res
        .status(400)
        .json({ error: 'authentication', message: 'email was not verified' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}

// create token code for user to verify email and reset password
export async function generatePassCode(req, res) {
  const { email } = req.body;

  // make sure request is valid with email field
  if (!email) {
    return res
      .status(400)
      .json({ error: 'bad request', message: 'Email is required' });
  }
  try {
    // look for user with this email
    const user = await Profile.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: 'Not found error', message: 'Email was not found' });
    }

    //create random token and save it into reset password
    const token = crypto.randomBytes(6).toString('hex');
    var reset = await ResetPassword.findOne({ userId: user._id });
    if (!reset) {
      reset = new ResetPassword({});
    }
    reset.userId = user._id;
    reset.token = token;
    reset.expire_in = expireTime();
    await reset.save();

    // Send email to user with the code generated
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: 'Reset Password Code',
      text: `Hi from Task Tracker! The code is ${token} Use this code for next step to reset your password. It will expire in a hour`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: 'Token was created' });
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}

// verify that user reset code is corect
export async function verifyResetCode(req, res) {
  const { email, code } = req.body;

  // make sure the request have required fields
  const errors = [];
  if (!email) {
    errors.push({
      error: 'bad request',
      message: 'There must be a email field in the requeset',
    });
  }

  if (!code) {
    errors.push({
      error: 'bad request',
      message: 'There must be a email field in the requeset',
    });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // look for user with this email
    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'Not found error',
        message: 'User with such email not found',
      });
    }

    const resetToken = await ResetPassword.findOne({ userId: user._id });
    if (!resetToken)
      return res.status(404).json({
        error: 'Not found error',
        message: 'No reset passcode found for this email',
      });

    if (resetToken.token !== code) {
      return res.status(400).json({
        error: 'Incorrect code',
        message: 'Reset code is incorrect!',
      });
    }

    resetToken.used = true;
    resetToken.save();
    return res.status(200).json({ success: 'passcode was verified' });
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}

function expireTime() {
  const today = new Date();
  today.setHours(today.getHours() + 1);
  return today;
}

// update password
export async function updatePassword(req, res) {
  const { email, password } = req.body;

  // make sure email and password are provided
  // check that all required fields are there
  const errors = [];
  if (!email) {
    errors.push({
      error: 'bad request',
      message: 'Email is required in the request',
    });
  }
  if (!password) {
    errors.push({
      error: 'bad request',
      message: 'Password is required in the request',
    });
  }
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const user = await Profile.findOne({ email });

    // user not found
    if (!user) {
      return res.status(404).json({
        error: 'Not found error',
        message: 'user with that email not found',
      });
    }

    // hash and save new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      return res.status(500).json({
        error: 'Server error',
        message: 'Something went wrong on the server',
      });
    }

    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ success: 'password has been updated' });
  } catch (error) {
    return res.status(500).json({
      error: 'Server side error',
      message: 'something went wrong on the server',
    });
  }
}
