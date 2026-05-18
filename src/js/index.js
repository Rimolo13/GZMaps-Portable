//resize fullmap
const full_map = document.getElementById("full-map");
const height_70p = (window.innerHeight / 100) * 70;

correct_resize();

window.addEventListener("resize", (e) => {
  correct_resize();
});

function correct_resize() {
  if (window.innerWidth < height_70p) {
    full_map.classList.add("full-map-scale-width");
    full_map.classList.remove("full-map-scale-hight");
  } else {
    full_map.classList.add("full-map-scale-hight");
    full_map.classList.remove("full-map-scale-width");
  }
}

//all about inputs
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

let edit_button = document.getElementById("edit-button");
let save_button = document.getElementById("save-button");

const houses_inputs = [10, 10, 18, 5, 4, 3, 6, 2];
const basements = [2, 2, 3, 1, 1, 1, 2, 0];
let input_list = [];
let value_list = [];

for (let i = 1; i < houses_maps_ids.length; i++) {
  let map = document.getElementById(houses_maps_ids[i]);
  for (let x = 1; x <= houses_inputs[i - 1]; x++) {
    let input = document.createElement("input");
    input.type = "Text";
    input.id = `h${i}-${x}`;
    input.placeholder = `${x}`;
    input.readOnly = true;
    if (houses_inputs[i - 1] - basements[i - 1] < x) {
      input.classList.add("basements");
    }
    input_list.push(input);
    map.appendChild(input);
  }
}

edit_button.addEventListener("click", edit_switch);

save_button.addEventListener("click", save);

async function save() {
  value_list = [];
  input_list.forEach((e) => {
    value_list.push(e.value);
  });
  await fetch("/t/POSTMapData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: value_list,
    }),
  });
  edit_switch();
}

let edit_mode = 0;
async function edit_switch() {
  if (edit_mode == 0) {
    const getpassword = prompt("Password:");
    const code_words = [
      "LemmyIsGod",
      "PrinceOfFuckingDarkness",
      "ComeTouchMyMetalMachine",
      "MetalGods",
    ];
    const nice_links = [
      "https://youtu.be/fM1UPeAOyHM?si=B5QVM3Gl32ScGb6w",
      "https://youtu.be/S6A13bOB76A?si=bw6tJRjNZ_Gt4rA7",
      "https://youtube.com/shorts/mTQffwXF1k8?si=QN8msGXkStp0srmz",
      "https://youtu.be/CLWlCQZy87g?si=nNuZagMzejflPyff",
    ];
    for (let i = 0; i < code_words.length; i++) {
      if (getpassword === code_words[i]) {
        console.log(code_words[i], nice_links[i]);
        window.open(nice_links[i], "_blank");
        return;
      }
    }
    if (getpassword != "" && getpassword != null) {
      const password_valid = await fetch("/t/POSTPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PasswordInput: getpassword,
        }),
      });
      if ((await password_valid.json()).isValid === true) {
        input_list.forEach((e) => {
          e.readOnly = false;
        });
        save_button.classList.remove("hidden");
        edit_button.textContent = "abbrechen";
        edit_mode = 1;
      }
    }
  } else {
    input_list.forEach((e) => {
      e.readOnly = true;
    });
    save_button.classList.add("hidden");
    edit_button.textContent = "bearbeiten";
    edit_mode = 0;
    load();
  }
}

load_values();
async function load_values() {
  try {
    value_list = (await (await fetch("/t/GETMapData")).json()).values;
    load();
  } catch (err) {}
}

function load() {
  for (let i = 0; i < input_list.length; i++) {
    if (value_list[i] != undefined) {
      input_list[i].value = value_list[i];
    }
  }
}

//switch maps
const routes = [
  "/full-map",
  "/house-1",
  "/house-2",
  "/house-3",
  "/house-4",
  "/house-5",
  "/house-6",
  "/house-8",
  "/house-11",
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
    if (routes[i] === window.location.pathname) {
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

//date for copyright
const copyright = document.getElementById("copyright");
let date_now = new Date();
copyright.textContent = `©${date_now.getUTCFullYear()}\u00A0`;
