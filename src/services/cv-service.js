import * as cvRepository from '../repositories/cv-repository.js';

export function getAllCVs() {
  return cvRepository.getAllCVs();
}

export function getCVById(id) {
  return cvRepository.getCVById(id);
}

export function addCV(newCV) {
  return cvRepository.addCV(newCV); // ✅ rajouter return si besoin d’attendre
}

export function updateCV(id, updatedCV) {
  return cvRepository.updateCV(id, updatedCV);
}


export function deleteCV(id) {
  return cvRepository.deleteCV(id);
}


export async function searchCVs({ name, technology, title }) {
  const allCVs = await getAllCVs(); // ✅ corrige le problème

  const includesIgnoreCase = (text = '', search = '') =>
    text.toLowerCase().includes(search.toLowerCase());

  const filteredCVs = Object.fromEntries(
    Object.entries(allCVs).filter(([key, cv]) => {
      const matchName =
        !name ||
        includesIgnoreCase(cv.profile.firstName, name) ||
        includesIgnoreCase(cv.profile.lastName, name);

      const techSkillsMatch = cv.technologySkills?.some(ts =>
        includesIgnoreCase(ts.skill, technology) ||
        ts.details?.some(detail => includesIgnoreCase(detail, technology))
      );

      const experiencesTechMatch = cv.experiences?.some(exp =>
        exp.technologies?.some(tech => includesIgnoreCase(tech, technology))
      );

      const matchTechnology =
        !technology || techSkillsMatch || experiencesTechMatch;

      const matchTitle =
        !title ||
        includesIgnoreCase(cv.profile.professionalSummary, title);

      return matchName && matchTechnology && matchTitle;
    })
  );

  return filteredCVs;
}
