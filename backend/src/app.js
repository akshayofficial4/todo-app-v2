import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js'
import { requireAuth } from './middlewares/auth.middleware.js';
import todoRoutes from "./modules/todos/todo.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();

 app.use(cors());

 app.use(express.json());

 app.use("/api/auth", authRoutes);
 app.use("/api/analytics", analyticsRoutes);
 app.use("/api/todos", todoRoutes);

 app.get("/api/protected", requireAuth, ( req , res ) => {
    res.json({
        message: "you are authenticated",
        user: req.user.email,
    });
 });
 

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;