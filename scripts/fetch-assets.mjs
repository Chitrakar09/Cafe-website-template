// Downloads the original Latte template images into public/images (run: npm run assets).
import { mkdir, writeFile } from 'node:fs/promises'
const base = 'https://framerusercontent.com/images/'
const files = {
  croissant: 'PRDfIQEwfBAD6WhfpVujpWW5c', 'hot-chocolate': 'rgN0P1vQKsq9ZG5BJOPaR9KY', latte: 'ffAQuLErAZ9FhPrK3M7QLPo5g',
  'cafe-entrance': 'wGH7yhEM7Dvwg5tG7oiMVQd0M', 'cafe-interior': 'HxZ5ZF3EmNZV8ft3wsqxeOgQE', 'chai-latte': 'i6aEvR24jRpFkZDao1hmf0YYo',
  logo: 'V5tIwQyz2S0O66AuNJHLQeGtQ',
}
await mkdir('public/images', { recursive: true })
for (const [name, id] of Object.entries(files)) {
  const res = await fetch(`${base}${id}.png`)
  if (!res.ok) { console.error(`✗ ${name} (${res.status})`); continue }
  await writeFile(`public/images/${name}.png`, Buffer.from(await res.arrayBuffer()))
  console.log(`✓ ${name}.png`)
}
