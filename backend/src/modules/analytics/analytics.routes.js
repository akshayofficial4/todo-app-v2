import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireAdmin } from "../../middlewares/role.middleware.js";
import { User } from "../auth/auth.model.js";
import { Todo } from "../todos/todo.model.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, async ( req , res ) => {
    const totalUsers = await User.countDocuments();
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({
        completed: true,
    });
    res.json({
        totalUsers,
        totalTodos,
        completedTodos,
    });
});

export default router;