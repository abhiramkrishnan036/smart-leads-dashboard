import express from "express";
import authMiddleware from "../middleware/authMiddleware";

import {
  addLeadController,
  getLeadsController,
  deleteLeadController,
  updateLeadController,
} from "../controllers/leadController";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addLeadController
);

router.get(
  "/",
  authMiddleware,
  getLeadsController
);

router.put(
  "/:id",
  authMiddleware,
  updateLeadController
);

router.delete(
  "/:id",
  authMiddleware,
  deleteLeadController
);

export default router;