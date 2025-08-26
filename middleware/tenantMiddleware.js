import { getTenantById } from '../models/tenantModel.js';

export const tenantContextMiddleware = async (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];

  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID missing in header (x-tenant-id)' });
  }

  const tenant = await getTenantById(tenantId);
  if (!tenant) {
    return res.status(404).json({ message: 'Tenant not found or deleted' });
  }

  req.tenant = tenant; // attach tenant to request
  next();
};
