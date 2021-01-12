import GoogleAuth from 'google-auth-library';
import Profile from '../models/profile.js';
import { googleClientId } from '../config/config.js';

var client = new GoogleAuth.OAuth2Client(googleClientId);

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
