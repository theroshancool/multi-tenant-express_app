import express from "express";
import {
  register,
  getTenantDetails,
  updateTenantInfo,
  deleteTenant,
} from "../controllers/tenantController.js";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "Tenant Routes active" });
});

router.post("/register", register);

router.get("/info", getTenantDetails);
router.put("/update", updateTenantInfo);
router.delete("/delete", deleteTenant);

export default router;
