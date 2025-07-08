// Al cargar la página, setear idioma guardado o español por defecto
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'es';
  document.documentElement.lang = savedLang;

  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    if (el.dataset[savedLang]) {
      el.textContent = el.dataset[savedLang];
    }
  });
});

// Botón para cambiar idioma y guardar preferencia
document.getElementById('lang-toggle').addEventListener('click', () => {
  const currentLang = document.documentElement.lang || 'es';
  const newLang = currentLang === 'es' ? 'en' : 'es';
  document.documentElement.lang = newLang;
  localStorage.setItem('lang', newLang);

  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    if (el.dataset[newLang]) {
      el.textContent = el.dataset[newLang];
    }
  });
});
