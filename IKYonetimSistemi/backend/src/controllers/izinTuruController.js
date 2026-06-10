import Repository from "../repositories/Repository.js";
import {
  validateIzinTuru
}
from "../utils/validation.js";

const izinTuruRepository =
  new Repository(
    "./src/data/izinTurleri.json"
  );

export const getIzinTurleri =
  async (req, res) => {

    const izinTurleri =
      await izinTuruRepository.getAll();

    res.json(izinTurleri);
};

export const getIzinTuruById =
  async (req, res) => {

    const izinTuru =
      await izinTuruRepository.getById(
        req.params.id
      );

    if (!izinTuru) {
      return res.status(404).json({
        message:
          "İzin türü bulunamadı"
      });
    }

    res.json(izinTuru);
};

export const createIzinTuru =
  async (req, res) => {

    const errors = validateIzinTuru(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const yeniIzinTuru =
      await izinTuruRepository.create(
        req.body
      );

    res
      .status(201)
      .json(yeniIzinTuru);
};

export const updateIzinTuru =
  async (req, res) => {

    const errors = validateIzinTuru(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedIzinTuru =
      await izinTuruRepository.update(
        req.params.id,
        req.body
      );

    if (!updatedIzinTuru) {
      return res.status(404).json({
        message:
          "İzin türü bulunamadı"
      });
    }

    res.json(updatedIzinTuru);
};

export const deleteIzinTuru =
  async (req, res) => {

    const result = await izinTuruRepository.delete(
      req.params.id
    );

    if (!result) {
      return res.status(404).json({
        message:
          "İzin türü bulunamadı"
      });
    }

    res.json({
      message:
        "İzin türü başarıyla silindi"
    });
  };
