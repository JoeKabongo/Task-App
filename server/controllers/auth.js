import GoogleAuth from 'google-auth-library';
import bcrypt from 'bcrypt';
import Profile from '../models/profile.js';
import jwt from 'jsonwebtoken';
var googleClient = new GoogleAuth.OAuth2Client(process.env.GOOGLE_CLIENT);

export function signup(req, res) {
  const { name, email, password, confirmationPassword } = req.body;
  const errors = [];
  if (!name) errors.push({ name: 'name is required' });
  if (!email) errors.push({ email: 'email is required' });
  if (!password) errors.push({ password: 'password is required' });
  if (password !== confirmationPassword)
    errors.push({ password: 'passwords do not match' });

  if (errors.length > 1) {
    return res.send(422).json({ errors: erros });
  }

  Profile.findOne({ email }).then((user) => {
    if (user) {
      return res.status(422).json({ error: 'Email already taken' });
    } else {
      const newProfile = new Profile({ name, email, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.

          if (err) return res.status(500).json({ errors: { error: err } });
          newProfile.password = hash;
          newProfile
            .save()
            .then((response) => {
              return res.status(200).json({ success: true, result: response });
            })
            .catch((err) => {
              return res.status(500).json({ error: err.message });
            });
        });
      });
    }
  });
}

export function login(req, res) {
  const { email, password } = req.body;
  const errors = [];
  if (!password) errors.push({ name: 'password is required' });
  if (!email) errors.push({ email: 'email is required' });

  if (errors.length > 0) return res.status(422).json({ errors: errors });

  Profile.findOne({ email })
    .then((user) => {
      if (!user)
        return res
          .status(404)
          .json({ error: 'User with such email not found' });
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ error: err });
        if (!match) {
          return res.status(400).json({ error: 'incorrect password' });
        }
        const access_token = createJWT(user.email, user._id, 3600);
        jwt
          .verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) res.status(500).json({ error: err });
            if (decoded) {
              return res.status(200).json({
                success: true,
                token: access_token,
                message: user,
              });
            }
          })
          .catch((err) => res.status(500).json({ erros: err }));
      });
    })
    .catch((err) => res.status(500).json({ erros: err }));
}

export function createJWT(email, userId, duration) {
  const payload = {
    email,
    userId,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
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
