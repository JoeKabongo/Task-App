import jwt from 'jsonwebtoken';

// auth middle
export default function requireAuth(req, res, next) {
  const { jwtToken } = req.cookies;
  // check if token exist
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({ errors: { error: err } });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(404).json({ errors: ['You must be loggin first'] });
  }
}
