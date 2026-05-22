const app = document.getElementById("app");
async function load() {
  app.innerHTML = await (
    await fetch(
      "https://cdn.jsdelivr.net/gh/Rimolo13/GZMaps-Portable@main/html/app.html",
    )
  ).text();
  import("https://cdn.jsdelivr.net/gh/Rimolo13/GZMaps-Portable@main/js/script.js");
}
load();
