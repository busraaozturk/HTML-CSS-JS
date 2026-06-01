import Repository from "../repositories/Repository.js";
import {
  validatePersonel
}
from "../utils/validation.js";

const personelRepository =
  new Repository(
    "./src/data/personeller.json"
  );

export const getPersoneller =
  async (req, res) => {

    const personeller =
      await personelRepository.getAll();

    res.json(personeller);
};

export const getPersonelById =
  async (req, res) => {

    const personel =
      await personelRepository.getById(
        req.params.id
      );

    if (!personel) {
      return res.status(404).json({
        message:
          "Personel bulunamadı"
      });
    }

    res.json(personel);
};

export const createPersonel =
  async (req, res) => {

    const errors = validatePersonel(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const yeniPersonel =
      await personelRepository.create(
        req.body
      );

    res
      .status(201)
      .json(yeniPersonel);
};

export const updatePersonel =
  async (req, res) => {

    const errors = validatePersonel(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedPersonel =
      await personelRepository.update(
        req.params.id,
        req.body
      );

    if (!updatedPersonel) {
      return res.status(404).json({
        message:
          "Personel bulunamadı"
      });
    }

    res.json(updatedPersonel);
};

export const deletePersonel =
  async (req, res) => {

    const result = await personelRepository.delete(
      req.params.id
    );

    if (!result) {
      return res.status(404).json({
        message:
          "Personel bulunamadı"
      });
    }

    res.json({
      message:
        "Personel başarıyla silindi"
    });
  };