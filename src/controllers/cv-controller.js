import { getAllCVs, getCVById, addCV, updateCV, deleteCV, searchCVsByName, searchCVsByTechnology } from '../services/cv-service.js';

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

// **Nouveau handler pour la recherche**
export function searchCVsHandler(req, res) {
  const { name, technology } = req.query;

  if (name) {
    const results = searchCVsByName(name);
    return res.json(results);
  }

  if (technology) {
    const results = searchCVsByTechnology(technology);
    return res.json(results);
  }

  // Si aucun filtre, retourne tout
  const allCVs = getAllCVs();
  res.json(allCVs);
}
