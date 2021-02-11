import GoogleAuth from 'google-auth-library';
import bcrypt from 'bcrypt';
import Profile from '../models/profile.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

import ResetPassword from '../models/resetPassword.js';
import jwt from 'jsonwebtoken';
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
  if (!username) errors.push('name is required');
  if (!email) errors.push('email is required');
  if (!password) errors.push('password is required');
  if (password !== confirmationPassword) errors.push('passwords do not match');

  if (errors.length > 1) {
    return res.send(422).json({ errors });
  }

  try {
    const user = await Profile.findOne({ email });
    if (user) {
      return res.status(422).json({ errors: ['Email already taken'] });
    } else {
      const newProfile = new Profile({ username, email, password });

      const salt = await bcrypt.genSalt(10);

      if (!salt) {
        console.log('Here baby');
        return res
          .status(500)
          .json({ errors: 'Something went wrong with Bcrypt' });
      }

      const hashedPassword = await bcrypt.hash(password, salt);
      if (!hashedPassword) {
        return res
          .status(500)
          .json({ errors: 'Something went wrong with Bcrypt' });
      }

      newProfile.password = hashedPassword;
      await newProfile.save();

      // create a JWT token for the user
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
    return res.status(500).json({ errors: err });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  // check that all required fields are there
  const errors = [];
  if (!password) errors.push('password is required');
  if (!email) errors.push('email is required');
  if (errors.length > 0) return res.status(422).json({ errors: errors });

  try {
    const user = await Profile.findOne({ email });

    // user with such email not found
    if (!user)
      return res
        .status(404)
        .status(404)
        .json({ errors: ['User with such email not found'] });

    // make sure password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ errors: ['incorrect password'] });

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
    console.log('here');
    return res.status(500).json({ errors: err });
  }
}

export async function getUser(req, res) {
  console.log(req.user);
  try {
    const user = await Profile.findById(req.user.userId);
    return res.json(user);
  } catch (error) {}
}

export async function getUserInfo(req, res) {
  try {
    const user = await Profile.findById(req.user.userId);
    const categories = user.categoryList;
  } catch (error) {}
}

export async function updateUser(req, res) {
  const { username, email } = req.body;
  console.log('update');
  try {
    const user = await Profile.findByIdAndUpdate(req.user.userId, {
      username,
      email,
    });
    return res.status(200).json({ user });
  } catch (error) {}
}

export function googleLogin(req, res) {
  const { tokenId, username } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: googleClient,
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        Profile.findOne({ email }).exec((error, user) => {
          if (error) {
            return res.status(400).json({ error: error.message });
          } else {
            if (user) {
              return res.status(200).json({ x: 'user already logged in' });
            } else {
              let password = email + name;
              const newProfile = new Profile({ name, email, password });
              newProfile.save((error, data) => {
                if (error) {
                  return res.status(400).json({ error: error.message });
                }
                return res.status(200).json(data);
              });
            }
          }
        });
      }
      console.log(email_verified, name, email);
    })
    .catch((error) => {
      console.log(error);
    });
}

// create token code for user to verify email
export async function generatePassCode(req, res) {
  const { email } = req.body;
  try {
    // look for user with this email
    const user = await Profile.findOne({ email });
    if (!user) return res.status(404).json({ errors: ['Email was not found'] });

    //create random token and save it into reset password
    const token = crypto.randomBytes(8).toString('hex');
    var reset = await ResetPassword.findOne({ userId: user._id });
    if (!reset) {
      reset = new ResetPassword({});
    }
    reset.userId = user._id;
    reset.token = token;
    reset.expire = expireTime();
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
    return res.status(500).json({ errors: error });
  }
}

function expireTime() {
  const today = new Date();
  today.setHours(today.getHours() + 1);
  return today;
}

// verify that user code is corect
export async function verifyResetCode(req, res) {
  const { email, code } = req.body;
  try {
    const resetToken = await ResetPassword.findOne({ email });
  } catch (error) {}
}

// update password
export async function updatePassword(req, res) {}
