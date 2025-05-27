import { allCVs, fetchFilteredCVs, renderCVs, loadAndRenderAllCVs } from "./cv-api.js";

document.addEventListener("DOMContentLoaded", () => {
  // Chargement initial
  loadAndRenderAllCVs().then(() => {
    updateResultsInfo(Object.keys(allCVs).length);
  });

  const nameInput = document.getElementById('name-filter');
  const techInput = document.getElementById('tech-filter');
  const titleInput = document.getElementById('title-filter');

  async function onFilterChange() {
    const name = nameInput.value.trim();
    const tech = techInput.value.trim();
    const title = titleInput.value.trim();

    if (!name && !tech && !title) {
      await loadAndRenderAllCVs();
      updateResultsInfo(Object.keys(allCVs).length);
      return;
    }

    const filteredCVs = await fetchFilteredCVs(name, tech, title);
    renderCVs(filteredCVs);
    updateResultsInfo(Object.keys(filteredCVs).length);
  }

  nameInput.addEventListener('input', onFilterChange);
  techInput.addEventListener('input', onFilterChange);
  titleInput.addEventListener('input', onFilterChange);

  window.clearAllFilters = function() {
    nameInput.value = '';
    techInput.value = '';
    titleInput.value = '';
    loadAndRenderAllCVs().then(() => {
      updateResultsInfo(Object.keys(allCVs).length);
    });
  };
});

function updateResultsInfo(count) {
  const resultsInfo = document.getElementById('cv-count');
  if (resultsInfo) {
    resultsInfo.textContent = `${count} CV${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
  }
}
