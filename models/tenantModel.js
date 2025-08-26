import pool from "../config/db.js";

export const registerTenant = async (name, email, betterAuthId) => {
  const result = await pool.query(
    "INSERT INTO tenant (name, email, better_auth_id) VALUES ($1, $2, $3)",
    [name, email, betterAuthId]
  );
  return result.rows[0];
};

export const getTenantByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM tenants WHERE email = $1 AND is_deleted = FALSE",
    [email]
  );
  return result.rows[0];
};

export const getTenantById = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM tenants WHERE user_id = $1 LIMIT 1",
    [userId]
  );
  return result.rows[0];
};

export const updateTenant = async (id, name, email) => {
  const [result] = await pool.query(
    "UPDATE tenants SET name = $1, email = $2 WHERE id = $3",
    [name, email, id]
  );
  return result.row.count;
};

export const softDeleteTenant = async (id) => {
  const [result] = await pool.query(
    "UPDATE tenants SET is_deleted = TRUE WHERE id = $1",
    [id]
  );
  return result.rowCount;
};
