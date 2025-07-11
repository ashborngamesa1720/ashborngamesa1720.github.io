// Manejo del botón de instalación PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene que el mini-infobar aparezca en mobile
  e.preventDefault();
  // Guarda el evento para que pueda ser activado después
  deferredPrompt = e;
  // Muestra el botón de instalación
  installBtn.style.display = 'block';
  
  installBtn.addEventListener('click', async () => {
    // Oculta el botón después de que el usuario lo presione
    installBtn.style.display = 'none';
    // Muestra el prompt de instalación
    deferredPrompt.prompt();
    // Espera a que el usuario responda al prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', () => {
  // Oculta el botón después de la instalación
  installBtn.style.display = 'none';
  deferredPrompt = null;
  console.log('PWA fue instalada');
});

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('ServiceWorker registrado con éxito: ', registration.scope);
        
        // Verifica si hay una nueva versión del Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('Nueva versión disponible!');
                // Aquí podrías mostrar un mensaje al usuario para actualizar
              }
            }
          });
        });
      })
      .catch(error => {
        console.log('Error al registrar el ServiceWorker: ', error);
      });
  });
}

// Manejo del cambio de idioma (si lo necesitas)
document.getElementById('lang-toggle').addEventListener('click', function() {
  // Tu código existente para cambiar idioma
});