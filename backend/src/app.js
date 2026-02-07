import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js'
import { requireAuth } from './middlewares/auth.middleware.js';
const app = express();

 app.use(cors());

 app.use(express.json());

 app.use("/api/auth", authRoutes)

 app.get("/api/protected", requireAuth, (req , res) => {
    res.json({
        message: "you are authenticated",
        user: req.user.email,
    });
 });

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
})
 export default app;