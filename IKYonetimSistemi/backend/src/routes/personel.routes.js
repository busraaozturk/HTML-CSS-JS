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

/**
 * @openapi
 * /api/personel:
 *   get:
 *     summary: Tüm personelleri getirir
 *     tags:
 *       - Personel
 *     responses:
 *       200:
 *         description: Personel listesi başarıyla döndü
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   ad:
 *                     type: string
 *                   soyad:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get(
  "/", (req, res) => {
    res.json({
      message: "Personel listesi getirildi"
    });
  }
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