export function getSectionIdFromHref(href) {
  if (!href?.includes('#')) return null;
  return href.split('#')[1] || null;
}

export function scrollToSection(sectionId, { behavior = 'smooth', offset = 16 } = {}) {
  const id = sectionId?.replace(/^#/, '');
  if (!id) return;

  const headerHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '80',
    10
  );

  let attempts = 0;
  const maxAttempts = 60;

  const tryScroll = () => {
    const target = document.getElementById(id);
    if (!target) return false;

    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - offset;
    window.scrollTo({ top: Math.max(0, top), behavior });
    return true;
  };

  if (tryScroll()) return;

  const poll = () => {
    if (tryScroll() || attempts >= maxAttempts) return;
    attempts += 1;
    requestAnimationFrame(poll);
  };

  requestAnimationFrame(poll);
}
