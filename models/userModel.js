import pool from "../config/db.js";

export const createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
    [name, email, password]
  );
  return result.rows[0].id;
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: string,
//       required: true,
//     },
//     email: {
//       type: string,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: string,
//       required: true,
//     },
//   },
//   { timesstamps: true }
// );
