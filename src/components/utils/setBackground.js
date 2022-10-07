export default function setBackground(
   value = "background-color: #050410; color: #eee"
) {
   const root = document.body;
   root.setAttribute("style", value);
}
