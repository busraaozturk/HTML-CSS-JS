import express from "express";

import {
  getDepartmanlar,
  createDepartman,
  getDepartmanById,
  updateDepartman,
  deleteDepartman
}
from "../controllers/departmanController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departman
 *   description: Departman Yönetimi API
 */

/**
 * @swagger
 * /api/departman:
 *   get:
 *     summary: Tüm departmanları getirir
 *     tags: [Departman]
 *     responses:
 *       200:
 *         description: Departman listesi başarıyla döndürüldü
 *
 *   post:
 *     summary: Yeni departman oluşturur
 *     tags: [Departman]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Departman başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz veri
 */

/**
 * @swagger
 * /api/departman/{id}:
 *   get:
 *     summary: Id'ye göre departman getirir
 *     tags: [Departman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Departman bulundu
 *       404:
 *         description: Departman bulunamadı
 *
 *   put:
 *     summary: Departman günceller
 *     tags: [Departman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departman güncellendi
 *       404:
 *         description: Departman bulunamadı
 *
 *   delete:
 *     summary: Departman siler
 *     tags: [Departman]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Departman silindi
 *       404:
 *         description: Departman bulunamadı
 */

router.get("/", getDepartmanlar);

router.post(
  "/",
  createDepartman
);

router.get(
  "/:id",
  getDepartmanById
);

router.put(
  "/:id",
  updateDepartman
);

router.delete(
  "/:id",
  deleteDepartman
);

export default router;
