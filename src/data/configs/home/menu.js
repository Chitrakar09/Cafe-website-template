// Placeholder items keep the original layout (8 / 4 / 4 / 5). Replace with real items.
const placeholders = (n) =>
  Array.from({ length: n }, (_, i) => ({ name: `[Item ${i + 1}]`, price: '$0.00', description: '[Short item description]' }))

export const menu = {
  title: 'Our Menu',
  categories: [
    { id: 'coffee', name: '[Category 1]', badge: '[Badge]', image: '/images/latte.png', imageSide: 'right', items: placeholders(8) },
    { id: 'specialty', name: '[Category 2]', badge: '[Badge]', image: '/images/chai-latte.png', imageSide: 'left', items: placeholders(4) },
    { id: 'drinks', name: '[Category 3]', badge: '[Badge]', image: '/images/hot-chocolate.png', imageSide: 'right', items: placeholders(4) },
    { id: 'pastries', name: '[Category 4]', badge: '[Badge]', image: '/images/croissant.png', imageSide: 'left', items: placeholders(5) },
  ],
}
