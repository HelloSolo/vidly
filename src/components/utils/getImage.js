export default function getImage(movie, index) {
   try {
      const url = movie.images[index].image;
      return `url(${url})`;
   } catch (error) {
      return "";
   }
}
