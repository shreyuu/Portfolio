// Resolves true when the text reached the clipboard and false when the browser
// refused (insecure context, denied permission, no Clipboard API), so each
// caller can show its own fallback instead of failing silently.

export async function copyText(text) {
  if (!navigator.clipboard?.writeText) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
