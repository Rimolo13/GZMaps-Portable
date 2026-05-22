const app = document.getElementById("app");
async function load() {
  app.innerHTML = await (await fetch("/html/app.html")).text();
  import("/js/script.js");
}
load();
//(document.getElementById("app")).getAttribute("name")
