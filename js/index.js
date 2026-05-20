const app = document.getElementById("app");
async function load() {
  app.innerHTML = await (await fetch("/html/index.html")).text();
  import("/js/script.js")
}
load();
