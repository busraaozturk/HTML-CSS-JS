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
 * @swagger
 * tags:
 *   name: Personel
 *   description: Personel Yönetimi API
 */

/**
 * @swagger
 * /api/personel:
 *   get:
 *     summary: Tüm personelleri getirir
 *     tags: [Personel]
 *     responses:
 *       200:
 *         description: Personel listesi başarıyla döndürüldü
 *
 *   post:
 *     summary: Yeni personel oluşturur
 *     tags: [Personel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ad:
 *                 type: string
 *               soyad:
 *                 type: string
 *               email:
 *                 type: string
 *               telefon:
 *                 type: string
 *               departmanId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Personel başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz veri
 */

/**
 * @swagger
 * /api/personel/{id}:
 *   get:
 *     summary: Id'ye göre personel getirir
 *     tags: [Personel]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personel bulundu
 *       404:
 *         description: Personel bulunamadı
 *
 *   put:
 *     summary: Personel günceller
 *     tags: [Personel]
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
 *               ad:
 *                 type: string
 *               soyad:
 *                 type: string
 *               email:
 *                 type: string
 *               telefon:
 *                 type: string
 *               departmanId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Personel güncellendi
 *       404:
 *         description: Personel bulunamadı
 *
 *   delete:
 *     summary: Personel siler
 *     tags: [Personel]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personel silindi
 *       404:
 *         description: Personel bulunamadı
 */

router.get("/", getPersoneller);

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