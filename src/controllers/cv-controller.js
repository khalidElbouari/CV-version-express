import { getAllCVs, getCVById, addCV, updateCV, deleteCV,searchCVs } from '../services/cv-service.js';

// GET /cvs
export function getAllCVsHandler(req, res) {
  const data = getAllCVs();
  res.json(data);
}

// GET /cvs/:id
export function getCVByIdHandler(req, res) {
  const id = req.params.id;
  const cv = getCVById(id);
  if (cv) {
    res.json(cv);
  } else {
    res.status(404).json({ message: "CV non trouvé" });
  }
}

// POST /cvs
export function addCVHandler(req, res) {
  const newCV = req.body;
  addCV(newCV);
  res.status(201).json({ message: "CV ajouté avec succès" });
}

// PUT /cvs/:id
export function updateCVHandler(req, res) {
  const id = req.params.id;
  const updatedCV = req.body;
  const result = updateCV(id, updatedCV);
  if (result) {
    res.json({ message: "CV mis à jour" });
  } else {
    res.status(404).json({ message: "CV non trouvé" });
  }
}

// DELETE /cvs/:id
export function deleteCVHandler(req, res) {
  const id = req.params.id;
  const result = deleteCV(id);
  if (result) {
    res.json({ message: "CV supprimé" });
  } else {
    res.status(404).json({ message: "CV non trouvé" });
  }
}

export function searchCVsHandler(req, res) {
  const { name, technology, title } = req.query;

  const results = searchCVs({ name, technology, title });

  res.json(results);
}
