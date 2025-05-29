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


document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('download-pdf-btn')) {
    const cvId = event.target.getAttribute('data-cvid');
    const cvElement = document.getElementById(cvId);
    if (!cvElement) {
      alert('CV non trouvé');
      return;
    }

    // Afficher temporairement tous les boutons de téléchargement (au cas où ils sont masqués)
    const downloadButtons = cvElement.querySelectorAll('.download-pdf-btn');
    downloadButtons.forEach(btn => btn.style.display = 'block');

    const { jsPDF } = window.jspdf;

    // Capture du CV
    const canvas = await html2canvas(cvElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Re-masquer les boutons après la capture
    downloadButtons.forEach(btn => btn.style.display = 'none');

    // Génération du PDF
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = pdfWidth / imgWidth;
    const imgHeightInPdf = imgHeight * ratio;

    let heightLeft = imgHeightInPdf;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeightInPdf);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeightInPdf;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeightInPdf);
      heightLeft -= pdfHeight;
    }

    pdf.save(`CV_${cvId}.pdf`);
  }
});
