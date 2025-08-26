import express from "express";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import dashboard from "./routes/dashboard.js"
import pool from "./config/db.js"
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./utils/Auth.js"
import swaggerDocument from "./swagger_output.json" with {type:'json'}  // Import the generated spec
import createUserTable from "./data/createUserTable.js";
import { protect } from "./utils/protect.js";
import createTenantTable from "./data/createTenantTable.js"

const app = express();

const PORT = 3000;


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use((req, res, next) => {
  next()
})

// app.set("View engine", "ejs")

app.use("/", dashboard);
app.use("/tenant", tenantRoutes);
app.use("/user", authRoutes);
app.use("/api", userRoutes);


app.get("/ping", (_req, res) => {
  res.json({ message: "Auth Routes active" });
});

app.get("/secure", protect, (req, res) => {
  res.json({
    message: ` Welcome back, ${req.user.email}!`,
    user: req.user,
  });
});

app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    
    if (!session) return res.status(401).json({ message: "No session"});
    return res.json(session);
});

createUserTable();
createTenantTable();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is : ${result.rows[0].current_database}`);
}); 




app.listen(PORT, () => {
  console.log(`sever is running on port http://localhost:${PORT}`);
});
