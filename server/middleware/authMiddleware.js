import jwt from 'jsonwebtoken';

// auth middle
export default function requireAuth(req, res, next) {
  const cookies = req.cookies;
  if (!cookies)
    return res
      .status(404)
      .json({ errors: { authorization: 'You must be loggin first' } });

  let { token } = cookies;

  // check if token exist
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({ errors: { error: err } });
      }
      console.log(decoded);
      next();
    });
  }
  return res
    .status(404)
    .json({ errors: { authorization: 'You must be loggin first' } });
}
