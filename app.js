// Notificaciones simuladas
document.addEventListener("DOMContentLoaded", () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});

// Instalación de PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Modo offline (simulado)
window.addEventListener('load', () => {
    if (!navigator.onLine) {
        alert('Estás en modo offline. Algunas funciones pueden no estar disponibles.');
    }
});

// Registro de Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        caches.keys().then(names => names.forEach(name => caches.delete(name)));

        navigator.serviceWorker.register('serviceworker.js')
            .then(reg => console.log('Service Worker registrado:', reg.scope))
            .catch(err => console.error('Error al registrar el Service Worker:', err));
    });
}

// Botón para instalar la PWA
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('Usuario aceptó la instalación');
            } else {
                console.log('Usuario canceló la instalación');
            }
            deferredPrompt = null;
            installBtn.style.display = 'none';
        }
    });
});

