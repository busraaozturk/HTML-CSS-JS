import Repository from "../repositories/Repository.js";
import {
  validateIzin
}
from "../utils/validation.js";

const izinRepository =
  new Repository(
    "./src/data/izinler.json"
  );

export const getIzinler =
  async (req, res) => {

    const izinler =
      await izinRepository.getAll();

    res.json(izinler);
};

export const getIzinById =
  async (req, res) => {

    const izin =
      await izinRepository.getById(
        req.params.id
      );

    if (!izin) {
      return res.status(404).json({
        message:
          "İzin bulunamadı"
      });
    }

    res.json(izin);
};

export const createIzin =
  async (req, res) => {

    const errors = validateIzin(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const yeniIzin =
      await izinRepository.create(
        req.body
      );

    res
      .status(201)
      .json(yeniIzin);
};

export const updateIzin =
  async (req, res) => {

    const errors = validateIzin(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedIzin =
      await izinRepository.update(
        req.params.id,
        req.body
      );

    if (!updatedIzin) {
      return res.status(404).json({
        message:
          "İzin bulunamadı"
      });
    }

    res.json(updatedIzin);
};

export const deleteIzin =
  async (req, res) => {

    const result = await izinRepository.delete(
      req.params.id
    );

    if (!result) {
      return res.status(404).json({
        message:
          "İzin bulunamadı"
      });
    }

    res.json({
      message:
        "İzin başarıyla silindi"
    });
  };
