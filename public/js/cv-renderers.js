export function renderProfileTemplate(profile) {
  return `
    <div>
      <header class="profile-header">
        <img class="profile-picture" src="${profile.photo || profile.image}" alt="Photo de profil de ${profile.firstName || ''} ${profile.lastName || profile.name || ''}" />
        <div class="profile-info">
          <div class="name-status">
            <div class="name">${(profile.lastName ? profile.lastName.toUpperCase() + ' ' : '') + (profile.firstName || '') || profile.name || ''}</div>
            <div class="status">${profile.professionalSummary || profile.status || "Titre non défini"}</div>
          </div>
          <div class="contact-info">
            <div class="line">
              <span class="label">Téléphone :</span>
              <span class="value">${profile.phone || ''}</span>
              <span class="label">Email :</span>
              <span class="value">${profile.email || ''}</span>
            </div>
            <div class="line">
              <span class="label">Adresse :</span>
              <span class="value">${profile.address || ''}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="separateur"></div>
    </div>
  `;
}

export function renderEducationSectionTemplate(education) {
  return `
    <div>
      <section class="mysection">
        <h2>Éducation</h2>
        <div class="education">
          ${education.map(item => `
            <div class="education-item">
              <div class="school">${item.organisation} | <span class="year">${item.year}</span></div>
              <div class="degree">${item.diploma}</div>
            </div>
          `).join('')}
        </div>
      </section>
      <div class="separateur"></div>
    </div>
  `;
}

export function renderExperiencesSectionTemplate(experiences) {
  // Ne prendre que les 2 premières expériences
  const topTwoExperiences = experiences.slice(0, 2);

  return `
    <div>
      <section class="mysection">
        <h2>Expérience</h2>
        <div class="experience">
          ${topTwoExperiences.map(exp => `
            <div class="experience-item">
              <div class="title">${exp.organisation} | ${exp.type}</div>
              <div class="experience-meta">
                <div class="date">📅<span class="duration">Durée : ${exp.duration}</span></div>
              </div>
              <div class="description">${exp.title}</div>
              <div class="technologies"><strong>Technologies :</strong> ${exp.technologies.join(", ")}</div>
            </div>
          `).join('')}
        </div>
      </section>
      <div class="separateur"></div>
    </div>
  `;
}
export function renderTechnologySkillsSection(technologySkills) {
  return `
    <div>
      <section class="mysection">
        <h2>Technologies</h2>
        <div class="competence">
          ${technologySkills.map(skill => `
            <div class="skill-group">
              <span class="skill-title">${skill.skill} :</span>
                <span class="skill-details">${skill.details.join(", ")}</span>
            </div>
          `).join('')}
        </div>
      </section>
      <div class="separateur"></div>
    </div>
  `;
}

export function renderInfoSectionTemplate(softSkills, languages, interests) {
  return `
    <section class="info-section">
      <div class="info-block">
        <div class="section-title">Soft Skills:</div>
        ${softSkills.slice(0, 3).map(skill => `<div class="item">${skill}</div>`).join('')}
      </div>
      <div class="vertical-line"></div>
      <div class="info-block">
        <div class="section-title">Langues:</div>
        ${languages.slice(0, 3).map(lang => `<div class="item">${lang.language}</div>`).join('')}
      </div>
      <div class="vertical-line"></div>
      <div class="info-block">
        <div class="section-title">Loisirs:</div>
        ${interests.slice(0, 3).map(interest => `<div class="item">${interest}</div>`).join('')}
      </div>
    </section>
  `;
}
