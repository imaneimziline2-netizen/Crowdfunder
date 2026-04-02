// DELETE /projects/:id    → delete
// GET    /projects/:id/investors

import express from "express";
import {
    createProject,
    getMyProjects,
    updateProject,
    closeProject,
    deleteProject
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
router.put(
  '/:id/close',
  authMiddleware,
  roleMiddleware('project_owner'),
  closeProject
);
router.delete(
  '/:id/delete',
  authMiddleware,
  roleMiddleware('project_owner'),
  deleteProject
);

export default router;
