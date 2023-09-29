/* eslint-disable no-restricted-globals */
export function handleNotification(event) {
  if (event.data) {
    const notificationData = event.data.json();
    console.log(notificationData);
    // Show a notification
    const notificationOptions = {
      body: notificationData.message,
      icon: "/logo192.png",
    };
    self.registration.showNotification(
      notificationData.title,
      notificationOptions
    );
  }
}
