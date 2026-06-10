import express from "express";

import {
  getIzinTurleri,
  createIzinTuru,
  getIzinTuruById,
  updateIzinTuru,
  deleteIzinTuru
}
from "../controllers/izinTuruController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: IzinTuru
 *   description: İzin Türü Yönetimi API
 */

/**
 * @swagger
 * /api/izin-turleri:
 *   get:
 *     summary: Tüm izin türlerini getirir
 *     tags: [IzinTuru]
 *     responses:
 *       200:
 *         description: İzin türü listesi başarıyla döndürüldü
 *
 *   post:
 *     summary: Yeni izin türü oluşturur
 *     tags: [IzinTuru]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: İzin türü başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz veri
 */

/**
 * @swagger
 * /api/izin-turleri/{id}:
 *   get:
 *     summary: Id'ye göre izin türü getirir
 *     tags: [IzinTuru]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İzin türü bulundu
 *       404:
 *         description: İzin türü bulunamadı
 *
 *   put:
 *     summary: İzin türü günceller
 *     tags: [IzinTuru]
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
 *     responses:
 *       200:
 *         description: İzin türü güncellendi
 *       404:
 *         description: İzin türü bulunamadı
 *
 *   delete:
 *     summary: İzin türü siler
 *     tags: [IzinTuru]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İzin türü silindi
 *       404:
 *         description: İzin türü bulunamadı
 */

router.get("/", getIzinTurleri);

router.post(
  "/",
  createIzinTuru
);

router.get(
  "/:id",
  getIzinTuruById
);

router.put(
  "/:id",
  updateIzinTuru
);

router.delete(
  "/:id",
  deleteIzinTuru
);

export default router;
