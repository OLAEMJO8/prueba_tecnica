import jwt from "jsonwebtoken";

// Token con jsonwebtoken
export const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, "mjo123", { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
