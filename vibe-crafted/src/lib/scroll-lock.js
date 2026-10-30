// Shared page-scroll lock for overlays (menu, palette, project drawer).
// A counter, not a toggle: one overlay closing must not unlock the page while
// another is still open on top of it.

let locks = 0;

export function lockScroll() {
  if (locks === 0) document.body.style.overflow = "hidden";
  locks += 1;
  let released = false;
  return function unlock() {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = "";
  };
}
