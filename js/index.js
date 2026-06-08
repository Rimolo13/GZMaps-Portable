const version = "1.03";
const app = document.getElementById("app");
const app_version = document.getElementById("app").getAttribute("name");
const link_list = ["/favicon.webp", "/css/index.css", "/html/app.html"];
const script_list = ["copyright", "inputs", "scale", "switch"];

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

function scriptimport() {
  if (app_version === "normal") {
    for (let i = 0; i<script_list.length; i++){
      import(`/js/module/${script_list[i]}.js?v=${version}`)
    }
  } else {
    for (let i = 0; i<script_list.length; i++){
      import(`https://cdn.jsdelivr.net/gh/Rimolo13/GZMaps-Portable@main/js/module/${script_list[i]}.js?v=${version}`)
    }
  }
}

async function load() {
  app.innerHTML = await (await fetch(linkmaker(2))).text();
  document.getElementById("title").textContent = "GZMaps - Gesamte Karte";
  document.getElementById("icon").href = linkmaker(0);
  document.getElementById("css").href = linkmaker(1);
  scriptimport();
}
load();
