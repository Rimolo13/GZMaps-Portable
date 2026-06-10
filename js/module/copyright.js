const copyright = document.getElementById("copyright");
let date_now = new Date();
copyright.textContent = `©${date_now.getUTCFullYear()}\u00A0`;
