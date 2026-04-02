// PUT    /projects/:id    → update
// DELETE /projects/:id    → delete
// GET    /projects/:id/investors

import express from "express";
import {
    createProject,
    getMyProjects,
    updateProject,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("project_owner"),
    createProject,
);
router.get("/my", authMiddleware, getMyProjects);
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("project_owner"),
    updateProject,
);

export default router;
