import GoogleAuth from 'google-auth-library';
import bcrypt from 'bcrypt';
import Profile from '../models/profile.js';
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
  const { name, email, password, confirmationPassword } = req.body;

  // make sure the request has valid fields
  const errors = [];
  if (!name) errors.push({ name: 'name is required' });
  if (!email) errors.push({ email: 'email is required' });
  if (!password) errors.push({ password: 'password is required' });
  if (password !== confirmationPassword)
    errors.push({ password: 'passwords do not match' });
  if (errors.length > 1) {
    return res.send(422).json({ errors: erros });
  }

  try {
    const user = await Profile.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ errors: [{ email: 'Email already taken' }] });
    } else {
      const newProfile = new Profile({ name, email, password });

      // hashed the user password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.status(500).json({ errors: { error: err } });

          newProfile.password = hash;
          await newProfile.save();

          // create a JWT token for the user
          const access_token = createJWT(
            newProfile.email,
            newProfile._id,
            tokenDuration
          );

          res.cookie('token', access_token, {
            httpOnly: true,
            maxAge: tokenDuration * 1000,
          });

          return res.status(200).json({
            success: true,
            token: access_token,
            userId: newProfile._id,
          });
        });
      });
    }
  } catch (err) {
    return res.status(500).json({ errors: [{ error: err }] });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  // check that all required fields are there
  const errors = [];
  if (!password) errors.push({ name: 'password is required' });
  if (!email) errors.push({ email: 'email is required' });
  if (errors.length > 0) return res.status(422).json({ errors: errors });

  try {
    const user = await Profile.findOne({ email });

    // user with such email not found
    if (!user)
      return res
        .status(404)
        .status(404)
        .json({ errors: [{ email: 'User with such email not found' }] });

    // compare password of the user with that of the database
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ errors: [{ error: err }] });

      if (!match) return res.status(400).json({ error: 'incorrect password' }); // password do not match
      const access_token = createJWT(user.email, user._id, tokenDuration); // create a JWT token for the user
      return res.status(200).json({
        success: true,
        token: access_token,
        userId: user._id,
      });
    });
  } catch (error) {
    return res.status(500).json({ errors: [{ error: err }] });
  }
}

export function googleLogin(req, res) {
  //   const { tokenId, username } = req.body;
  //   client
  //     .verifyIdToken({
  //       idToken: tokenId,
  //       audience:
  //         '903652213309-hjjerrj4ktv1r8ugh1jju9lje5mofd04.apps.googleusercontent.com',
  //     })
  //     .then((response) => {
  //       const { email_verified, name, email } = response.payload;
  //       if (email_verified) {
  //         Profile.findOne({ email }).exec((error, user) => {
  //           if (error) {
  //             return res.status(400).json({ error: error.message });
  //           } else {
  //             if (user) {
  //               return res.status(200).json({ x: 'user already logged in' });
  //             } else {
  //               let password = email + name;
  //               const newProfile = new Profile({ name, email, password });
  //               newProfile.save((error, data) => {
  //                 if (error) {
  //                   return res.status(400).json({ error: error.message });
  //                 }
  //                 return res.status(200).json(data);
  //               });
  //             }
  //           }
  //         });
  //       }
  //       console.log(email_verified, name, email);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
}
