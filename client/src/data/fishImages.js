// Maps a reported fish name to a photo in `client/public/fish/`.
// To swap in a better photo, overwrite the file at the same path — no code change.
// Files marked "placeholder" are generated stand-ins waiting for a real photo.
const FISH_IMAGES = {
  'Balaya (Skipjack)': '/fish/balaya.jpg',
  'Isso (Prawns)': '/fish/isso.jpg',
  'Thalapath (Seer)': '/fish/thalapath.jpg',
  'Paraw (Trevally)': '/fish/paraw.jpg',
  'Kelawalla (Yellowfin)': '/fish/kelawalla-v2.png',
  Hurulla: '/fish/hurulla-v2.png',
  'Koduwa (Barramundi)': '/fish/koduwa.jpg' // placeholder
};

const FALLBACK_IMAGE = '/fish/default.jpg';

export function fishImage(fish) {
  return FISH_IMAGES[fish] || FALLBACK_IMAGE;
}
