const version = "1.02";
const app = document.getElementById("app");
const app_version = document.getElementById("app").getAttribute("name");
const link_list = [
  "/favicon.webp",
  "/css/index.css",
  "/html/app.html",
  "/js/script.js",
];

function linkmaker(listlinknumber) {
  if (app_version === "normal") {
    return link_list[listlinknumber] + `?v=${version}`;
  } else {
    return (
      "https://cdn.jsdelivr.net/gh/Rimolo13/GZMaps-Portable@main" +
      link_list[listlinknumber] +
      `?v=${version}`
    );
  }
}

async function load() {
  app.innerHTML = await (await fetch(linkmaker(2))).text();
  document.getElementById("title").textContent = "GZMaps - Gesamte Karte";
  document.getElementById("icon").href = linkmaker(0);
  document.getElementById("css").href = linkmaker(1);
  import(linkmaker(3));
}
load();
