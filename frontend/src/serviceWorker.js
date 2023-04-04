/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  console.log("Push received", event);
  event.waitUntil(handleNotification(event));
});

async function handleNotification(event) {
  if (event.data) {
    const payload = event.data.json();
    const { title, message } = payload;
    await self.registration.showNotification(title, { body: message });
  }
}

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          `${process.env.PUBLIC_URL}/service-worker.js`,
          { type: "module" }
        );
        console.log("Service Worker Registered", registration.scope);
      } catch (err) {
        console.error("Service worker registration failed", err);
      }
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
