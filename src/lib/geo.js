const EARTH_RADIUS_KM = 6371;
const NOMINATIM_HEADERS = {
  Accept: 'application/json',
  'Accept-Language': 'en',
};

export function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseNominatimResult(result) {
  return {
    lat: parseFloat(result.lat),
    lng: parseFloat(result.lon),
    label: result.display_name,
  };
}

async function fetchNominatim(url) {
  const response = await fetch(url.toString(), { headers: NOMINATIM_HEADERS });
  if (!response.ok) return null;
  return response.json();
}

export async function geocodeLocation(query) {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', `${trimmed}, India`);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');
  url.searchParams.set('countrycodes', 'in');

  const results = await fetchNominatim(url);
  if (!results?.length) return null;

  return parseNominatimResult(results[0]);
}

export async function searchLocationSuggestions(query, limit = 6) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', trimmed);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('countrycodes', 'in');
  url.searchParams.set('addressdetails', '1');

  const results = await fetchNominatim(url);
  if (!results?.length) return [];

  return results.map(parseNominatimResult);
}

export async function reverseGeocode(lat, lng) {
  const url = new URL('https://nominatim.openstreetmap.org/reverse');
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lng));
  url.searchParams.set('format', 'json');

  const result = await fetchNominatim(url);
  if (!result) return null;

  return {
    lat,
    lng,
    label: result.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
  };
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: 'Your current location',
        }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  });
}
