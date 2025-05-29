import {
  getAllCVs,
  getCVById,
  addCV,
  updateCV,
  deleteCV,
  searchCVs,
} from '../services/cv-service.js';

// GET /cvs
export async function getAllCVsHandler(req, res) {
  try {
    const data = await getAllCVs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// GET /cvs/:id
export async function getCVByIdHandler(req, res) {
  try {
    const id = req.params.id;
    const cv = await getCVById(id);
    if (cv) {
      res.json(cv);
    } else {
      res.status(404).json({ message: "CV non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// POST /cvs
export async function addCVHandler(req, res) {
  try {
    const newCV = req.body;
    await addCV(newCV);
    res.status(201).json({ message: "CV ajouté avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// PUT /cvs/:id
export async function updateCVHandler(req, res) {
  try {
    const id = req.params.id;
    const updatedCV = req.body;
    const result = await updateCV(id, updatedCV);
    if (result) {
      res.json({ message: "CV mis à jour" });
    } else {
      res.status(404).json({ message: "CV non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// DELETE /cvs/:id
export async function deleteCVHandler(req, res) {
  try {
    const id = req.params.id;
    const result = await deleteCV(id);
    if (result) {
      res.json({ message: "CV supprimé" });
    } else {
      res.status(404).json({ message: "CV non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// GET /cvs/search?name=...&technology=...&title=...
export async function searchCVsHandler(req, res) {
  try {
    const { name, technology, title } = req.query;
    const results = await searchCVs({ name, technology, title });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}
