export const announcePolite = (message) => {
  const region = document.getElementById("app-live-region");
  if (!region) return;

  region.textContent = "";
  window.requestAnimationFrame(() => {
    region.textContent = message;
  });
};
