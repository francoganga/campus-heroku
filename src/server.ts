import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api';
import cors from 'cors';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  // -----------------------------------------------------------------------
  // authentication middleware

  const auth = {
    login: process.env.BASIC_HTTP_AUTH_USER,
    password: process.env.BASIC_HTTP_AUTH_PASSWORD,
  };

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next();
  }

  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
  res.status(401).send('Authentication required.'); // custom message

  // -----------------------------------------------------------------------
});
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server running in ${PORT} on ${process.env.NODE_ENV}`);
});
