function getBackgroundImage(movie, index) {
   try {
      const url = movie.images[index].image;
      return `url(${url})`;
   } catch (error) {
      return "";
   }
}

function getImage(movie, index) {
   try {
      const url = movie.images[index].image;
      return `${url}`;
   } catch (error) {
      return "";
   }
}

export { getBackgroundImage, getImage };
