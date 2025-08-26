import { betterAuth } from "better-auth";
import pool from "../config/db.js";
import {
  registerTenant,
  getTenantByEmail,
  getTenantById,
  updateTenant,
  // softDeletTenant
} from "../models/tenantModel.js";

export const register = async (req, res) => {
  const { name, email } = req.body;
  const result = await registerTenant({ name, email, betterAuthId: "some-id" });
  res.status(201).json({ message: "Tenant registered", data: result });
};

export const updateTenantInfo = async (req, res) => {
  const { id } = req.tenant;
  const { name, email } = req.body;
  const result = await updateTenant(id, name, email);
  req.json({ message: "Tenant updated", result });
};

export const registerTenantPage = (req, res) => {
  const { userId } = req.query;
  res.render("tenantRegister", { userId });
};

export const deleteTenant = async (req, res) => {
  const { id } = req.tenant;

  //   const result = await softDeletTenant(id);
  //   res.json({ message: 'Tenant deleted (soft)', result });
};

export const getTenantDetails = async (req, res) => {
  res.json({ tenant: req.tenant });
};
