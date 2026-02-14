import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { create, update, remove, getAll } from "./todo.controller.js";
import { reorder } from "./todo.controller.js";

const router = Router();

router.use(requireAuth);

router.post("/", create);

router.patch("/reorder", reorder);

router.get("/", getAll);

router.patch("/:id", update);

router.delete("/:id", remove);

export default router;
