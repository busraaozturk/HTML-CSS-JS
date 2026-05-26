import express from "express";

import {
  getPersoneller,
  createPersonel,
  getPersonelById,
  updatePersonel,
  deletePersonel
}
from "../controllers/personelController.js";

const router = express.Router();

router.get(
  "/",
  getPersoneller
);

router.post(
  "/",
  createPersonel
);

router.get(
  "/:id",
  getPersonelById
);

router.put(
  "/:id",
  updatePersonel
);

router.delete(
  "/:id",
  deletePersonel
);

export default router;