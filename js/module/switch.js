import { load_values,edit_mode } from "/js/module/inputs.js";

const routes = [
  "#full-map",
  "#house-1",
  "#house-2",
  "#house-3",
  "#house-4",
  "#house-5",
  "#house-6",
  "#house-8",
  "#house-11",
];

const houses_ids = [
  "back-to-full-map",
  "house-1",
  "house-2",
  "house-3",
  "house-4",
  "house-5",
  "house-6",
  "house-8",
  "house-11",
];

const houses_maps_ids = [
  "full-map",
  "house-1-map",
  "house-2-map",
  "house-3-map",
  "house-4-map",
  "house-5-map",
  "house-6-map",
  "house-8-map",
  "house-11-map",
];

const title_maps = [
  "Gesamte Karte",
  "Haus 1",
  "Haus 2",
  "Haus 3",
  "Haus 4",
  "Haus 5",
  "Haus 6",
  "Haus 8",
  "Haus 11",
];

const edit_bar = document.getElementById("edit-bar");

["load", "popstate"].forEach((e) => window.addEventListener(e, repage));

function repage() {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i] === window.location.hash) {
      switchmap(i);
      return;
    }
  }
  let path = routes[0];
  history.pushState({}, "", path);
  switchmap(0);
}

for (let i = 0; i < routes.length; i++) {
  const houses = document.getElementById(houses_ids[i]);
  let path = routes[i];
  houses.addEventListener("click", () => {
    history.pushState({}, "", path);
    switchmap(i);
  });
}

async function switchmap(map) {
  load_values();
  for (let i = 0; i < houses_maps_ids.length; i++) {
    if (i === map) {
      document.title = `GZMaps - ${title_maps[i]}`;
      document.getElementById("header").textContent =
        `GZMaps - ${title_maps[i]}`;
      const activ_map = document.getElementById(houses_maps_ids[i]);
      activ_map.classList.add("hidden");
      activ_map.classList.remove("not-displayed");
      setTimeout(() => {
        activ_map.classList.remove("hidden");
      }, 30);
      if (map === 0) {
        edit_bar.classList.add("hidden");
        if (edit_mode === 1) {
          edit_switch();
        }
      } else {
        edit_bar.classList.remove("hidden");
      }
    } else {
      const inactiv_map = document.getElementById(houses_maps_ids[i]);
      inactiv_map.classList.add("not-displayed");
    }
  }
}