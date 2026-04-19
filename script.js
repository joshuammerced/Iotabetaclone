const textContent = siteContent;

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function renderStats(stats) {
  const statsRoot = document.getElementById("hero-stats");
  statsRoot.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-card">
          <dt>${stat.label}</dt>
          <dd class="stat-value">${stat.value}</dd>
        </div>
      `
    )
    .join("");
}

function renderHighlights(highlights) {
  const root = document.getElementById("feature-highlights");
  root.innerHTML = highlights
    .map(
      (item, index) => `
        <article class="highlight-item">
          <div class="highlight-icon">${index + 1}</div>
          <div class="highlight-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function createCard(item) {
  const hasImage = item.image && item.image.trim().length > 0;
  const media = hasImage
    ? `<img src="${item.image}" alt="${item.title}">`
    : `<div class="card-fallback">${item.title}</div>`;
  const meta = item.meta
    .map((entry) => `<span class="meta-pill">${entry}</span>`)
    .join("");

  return `
    <article class="content-card reveal">
      <div class="card-media">${media}</div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-description">${item.description}</p>
        <div class="card-meta">${meta}</div>
      </div>
    </article>
  `;
}

function renderCards(id, items) {
  const root = document.getElementById(id);
  root.innerHTML = items.map(createCard).join("");
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

setText("hero-title", textContent.hero.title);
setText("hero-description", textContent.hero.description);
renderStats(textContent.hero.stats);

setText("feature-title", textContent.feature.title);
setText("feature-description", textContent.feature.description);
renderHighlights(textContent.feature.highlights);

setText("about-title", textContent.about.title);
setText("about-description", textContent.about.description);
setText("about-quote", textContent.about.quote);

renderCards("projects-grid", textContent.projects);
renderCards("fundraisers-grid", textContent.fundraisers);
renderCards("members-grid", textContent.members);

setupReveal();
