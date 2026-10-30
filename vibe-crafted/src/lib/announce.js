// Polite screen-reader announcements, spoken through the one live region App
// renders (#sr-status). Clearing it first lets the same message repeat.

const REANNOUNCE_DELAY_MS = 60;

export function announce(message) {
  const region = document.getElementById("sr-status");
  if (!region) return;
  region.textContent = "";
  window.setTimeout(() => {
    region.textContent = message;
  }, REANNOUNCE_DELAY_MS);
}
