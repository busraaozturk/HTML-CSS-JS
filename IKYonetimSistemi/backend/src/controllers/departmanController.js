import Repository from "../repositories/Repository.js";
import {
  validateDepartman
}
from "../utils/validation.js";

const departmanRepository =
  new Repository(
    "./src/data/departmanlar.json"
  );

export const getDepartmanlar =
  async (req, res) => {

    const departmanlar =
      await departmanRepository.getAll();

    res.json(departmanlar);
};

export const getDepartmanById =
  async (req, res) => {

    const departman =
      await departmanRepository.getById(
        req.params.id
      );

    if (!departman) {
      return res.status(404).json({
        message:
          "Departman bulunamadı"
      });
    }

    res.json(departman);
};

export const createDepartman =
  async (req, res) => {

    const errors = validateDepartman(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const yeniDepartman =
      await departmanRepository.create(
        req.body
      );

    res
      .status(201)
      .json(yeniDepartman);
};

export const updateDepartman =
  async (req, res) => {

    const errors = validateDepartman(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedDepartman =
      await departmanRepository.update(
        req.params.id,
        req.body
      );

    if (!updatedDepartman) {
      return res.status(404).json({
        message:
          "Departman bulunamadı"
      });
    }

    res.json(updatedDepartman);
};

export const deleteDepartman =
  async (req, res) => {

    const result = await departmanRepository.delete(
      req.params.id
    );

    if (!result) {
      return res.status(404).json({
        message:
          "Departman bulunamadı"
      });
    }

    res.json({
      message:
        "Departman başarıyla silindi"
    });
  };
