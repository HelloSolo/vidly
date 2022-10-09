export default function moveOneLevelUp(data) {
   let items = [];
   data.forEach((element) => {
      items.push(element.movie);
   });
   return items;
}
