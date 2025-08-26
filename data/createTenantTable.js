import pool from "../config/db.js";

const createTenantTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS Tenant(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    better_auth_id VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `;

  try {
    pool.query(queryText);
    console.log("Tenant table created (if not exists)");
  } catch (error) {
    console.log("Error creaing Tenant table: ", error.message);
  }
};

export default createTenantTable;
