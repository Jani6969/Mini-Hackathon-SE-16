// Shared category list keeps form options and automatic card images in sync.
export const FISH_CATEGORIES = [
  'Balaya (Skipjack)',
  'Kelawalla (Yellowfin)',
  'Hurulla',
  'Thalapath (Seer)',
  'Isso (Prawns)',
  'Paraw (Trevally)',
  'Koduwa (Barramundi)',
  'Linna (Frigate Tuna)',
  'Kumbalawa (Indian Mackerel)',
  'Salaya (Sardine)'
];

const FISH_IMAGES = {
  'Balaya (Skipjack)': '/fish/balaya.jpg',
  'Kelawalla (Yellowfin)': '/fish/kelawalla.jpg',
  Hurulla: '/fish/hurulla.jpg',
  'Thalapath (Seer)': '/fish/thalapath.jpg',
  'Isso (Prawns)': '/fish/isso.jpg',
  'Paraw (Trevally)': '/fish/paraw.jpg',
  'Koduwa (Barramundi)': '/fish/koduwa.jpg',
  'Linna (Frigate Tuna)': '/fish/linna.jpg',
  'Kumbalawa (Indian Mackerel)': '/fish/kumbalawa.jpg',
  'Salaya (Sardine)': '/fish/salaya.jpg'
};

const FALLBACK_IMAGE = '/fish/default.jpg';

export function fishImage(fish) {
  return FISH_IMAGES[fish] || FALLBACK_IMAGE;
}
