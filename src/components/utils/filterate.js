export function filtrate(items, currentGenre) {
   if (currentGenre === "All Genre") return items;
   return items.filter((item) => item.genre.name === currentGenre);
}
