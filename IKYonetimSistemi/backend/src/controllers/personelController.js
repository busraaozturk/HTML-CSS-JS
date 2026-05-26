import Repository
from "../repositories/Repository.js";

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

    await personelRepository.delete(
      req.params.id
    );

    res.json({
      message:
        "Personel silindi"
    });
};