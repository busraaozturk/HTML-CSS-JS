import express from "express";

import {
  getIzinler,
  createIzin,
  getIzinById,
  updateIzin,
  deleteIzin
}
from "../controllers/izinController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Izin
 *   description: İzin Yönetimi API
 */

/**
 * @swagger
 * /api/izin:
 *   get:
 *     summary: Tüm izinleri getirir
 *     tags: [Izin]
 *     responses:
 *       200:
 *         description: İzin listesi başarıyla döndürüldü
 *
 *   post:
 *     summary: Yeni izin oluşturur
 *     tags: [Izin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personelId:
 *                 type: integer
 *               departmanId:
 *                 type: integer
 *               baslangicTarih:
 *                 type: string
 *                 format: date
 *               bitisTarih:
 *                 type: string
 *                 format: date
 *               izinTuruId:
 *                 type: integer
 *               durum:
 *                 type: string
 *     responses:
 *       201:
 *         description: İzin başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz veri
 */

/**
 * @swagger
 * /api/izin/{id}:
 *   get:
 *     summary: Id'ye göre izin getirir
 *     tags: [Izin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İzin bulundu
 *       404:
 *         description: İzin bulunamadı
 *
 *   put:
 *     summary: İzin günceller
 *     tags: [Izin]
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
 *               personelId:
 *                 type: integer
 *               departmanId:
 *                 type: integer
 *               baslangicTarih:
 *                 type: string
 *                 format: date
 *               bitisTarih:
 *                 type: string
 *                 format: date
 *               izinTuruId:
 *                 type: integer
 *               durum:
 *                 type: string
 *     responses:
 *       200:
 *         description: İzin güncellendi
 *       404:
 *         description: İzin bulunamadı
 *
 *   delete:
 *     summary: İzin siler
 *     tags: [Izin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: İzin silindi
 *       404:
 *         description: İzin bulunamadı
 */

router.get("/", getIzinler);

router.post(
  "/",
  createIzin
);

router.get(
  "/:id",
  getIzinById
);

router.put(
  "/:id",
  updateIzin
);

router.delete(
  "/:id",
  deleteIzin
);

export default router;
