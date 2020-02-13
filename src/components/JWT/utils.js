import jwt from 'jsonwebtoken';

const TOKEN_NAME = 'jwt-token';

export const isAuthenticated = () => {
  try {
    let _ = jwt.verify(localStorage.getItem(TOKEN_NAME), process.env.REACT_APP_JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

export const signToken = (email, callback) => {
  jwt.sign({ user: email }, process.env.REACT_APP_JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 }, (error, token) => {
    if (error) {
      callback(error);
    } else {
      localStorage.setItem(TOKEN_NAME, token);
      callback();
    }
  });
};