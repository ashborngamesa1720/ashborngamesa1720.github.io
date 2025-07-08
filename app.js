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
