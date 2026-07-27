import { APP_HOST, APP_PACKAGE, APP_SCHEME, PLAY_STORE_URL } from '../constants/brand';

export function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

export function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function isMobile() {
  return isAndroid() || isIOS();
}

export function getAndroidIntentUrl(fallbackUrl = PLAY_STORE_URL) {
  return (
    `intent://${APP_HOST}#Intent;` +
    `scheme=${APP_SCHEME};` +
    `package=${APP_PACKAGE};` +
    `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};` +
    `end`
  );
}

export function getAppOpenHref() {
  if (isAndroid()) return getAndroidIntentUrl();
  if (isIOS()) return `${APP_SCHEME}://${APP_HOST}`;
  return PLAY_STORE_URL;
}

export function openAppOrPlayStore(event) {
  if (event) event.preventDefault();

  if (isAndroid()) {
    window.location.href = getAndroidIntentUrl();
    return;
  }

  if (isIOS()) {
    window.location.href = `${APP_SCHEME}://${APP_HOST}`;
    window.setTimeout(() => {
      window.location.href = PLAY_STORE_URL;
    }, 1500);
    return;
  }

  window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
}
