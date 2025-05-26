import { 
  renderProfileTemplate, 
  renderEducationSectionTemplate, 
  renderExperiencesSectionTemplate, 
  renderInfoSectionTemplate 
} 
from './cv-renderers.js';

export async function loadAndRenderAllCVs() {
  try {
    const response = await fetch("http://localhost:3000/api/cvs");
    if (!response.ok) throw new Error("Erreur HTTP " + response.status);

    const data = await response.json();

    const container = document.getElementById("cv-container");
    if (!container) throw new Error("Element #cv-container introuvable");

    let allHTML = "";

    // Parcours de tous les CVs dans l'objet JSON
    for (const cvKey in data) {
      if (data.hasOwnProperty(cvKey)) {
        const cv = data[cvKey];

        allHTML += `<div class="cv-wrapper" id="${cvKey}">`;
        allHTML += renderProfileTemplate(cv.profile);
        allHTML += renderEducationSectionTemplate(cv.education);
        allHTML += renderExperiencesSectionTemplate(cv.experiences);
        allHTML += renderInfoSectionTemplate(cv.softSkills, cv.languages, cv.interests);
        allHTML += `</div><hr/>`; // séparation visuelle entre CVs
      }
    }

    container.innerHTML = allHTML;

  } catch (error) {
    console.error("Erreur lors du chargement des CVs :", error);
  }
}

