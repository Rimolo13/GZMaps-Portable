const full_map = document.getElementById("full-map");
const height_70p = (window.innerHeight / 100) * 70;

correct_resize();

window.addEventListener("resize", () => {
  setTimeout(correct_resize, 150);
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
