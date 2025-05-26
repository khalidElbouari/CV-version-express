import * as cvRepository from '../repositories/cv-repository.js';

export function getAllCVs() {
  return cvRepository.getAllCVs();
}

export function getCVById(id) {
  return cvRepository.getCVById(id);
}

export function addCV(newCV) {
  cvRepository.addCV(newCV);
}

export function updateCV(id, updatedCV) {
  return cvRepository.updateCV(id, updatedCV);
}

export function deleteCV(id) {
  return cvRepository.deleteCV(id);
}

// **Nouvelle fonction de recherche par nom**
export function searchCVsByName(name) {
  const cvs = cvRepository.getAllCVs();
  const lowerName = name.toLowerCase();
  return Object.values(cvs).filter(cv => 
    cv.profile.firstName.toLowerCase().includes(lowerName) ||
    cv.profile.lastName.toLowerCase().includes(lowerName)
  );
}

// **Nouvelle fonction de recherche par technologie**
export function searchCVsByTechnology(technology) {
  const cvs = cvRepository.getAllCVs();
  const lowerTech = technology.toLowerCase();
  return Object.values(cvs).filter(cv => 
    cv.technologySkills.some(skill =>
      skill.skill.toLowerCase().includes(lowerTech) ||
      skill.details.some(detail => detail.toLowerCase().includes(lowerTech))
   )
  );
}
