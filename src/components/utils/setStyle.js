export default function setStyle(
   element = ".main",
   value = "margin-top: 5rem"
) {
   const root = document.querySelector(element);
   root.setAttribute("style", value);
}
