import { 
  renderProfileTemplate, 
  renderEducationSectionTemplate, 
  renderExperiencesSectionTemplate, 
  renderInfoSectionTemplate,
  renderTechnologySkillsSection
} 
from './cv-renderers.js';

export let allCVs = {};  // variable globale

export async function loadAndRenderAllCVs() {
  try {
    const response = await fetch("http://localhost:3000/api/cvs");
    if (!response.ok) throw new Error("Erreur HTTP " + response.status);

    const data = await response.json();
    allCVs = data;  // garde toutes les données ici

    renderCVs(data);  // affichage initial

  } catch (error) {
    console.error("Erreur lors du chargement des CVs :", error);
  }
}

// fonction pour afficher les CVs (extrait de ta fonction existante)
export function renderCVs(data) {
  const container = document.getElementById("cv-container");
  if (!container) throw new Error("Element #cv-container introuvable");

  let allHTML = "";

  for (const cvKey in data) {
    if (data.hasOwnProperty(cvKey)) {
      const cv = data[cvKey];

      allHTML += `<div class="cv-wrapper" id="${cvKey}">`;
      allHTML += renderProfileTemplate(cv.profile);
      allHTML += renderEducationSectionTemplate(cv.education);
      allHTML += renderExperiencesSectionTemplate(cv.experiences);
      allHTML += renderTechnologySkillsSection(cv.technologySkills);
      allHTML += renderInfoSectionTemplate(cv.softSkills, cv.languages, cv.interests);
      // Nouveau bouton Télécharger PDF
      allHTML += `<button class="download-pdf-btn" data-cvid="${cvKey}">Télécharger en PDF</button>`;

      allHTML += `</div>`;
    }
  }
  container.innerHTML = allHTML;
}

export async function fetchFilteredCVs(name = '', technology = '', title = '') {
  try {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (technology) params.append('technology', technology);
    if (title) params.append('title', title);

    const url = `http://localhost:3000/api/cvs/search?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

    const filteredData = await response.json();
    return filteredData;

  } catch (error) {
    console.error('Erreur lors du chargement des CVs filtrés :', error);
    return {};
  }
}