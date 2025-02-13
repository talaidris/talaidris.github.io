

let apps = document.querySelectorAll('.app');


apps.forEach(app => {
  app.addEventListener('mouseover', function (event) {
    app.style.transform = 'scale(1.05)';
  });
  app.addEventListener('mouseout', function (event) {
    app.style.transform = 'scale(1)';
  });
});



function showTime() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  // let s = date.getSeconds();

  if (h == 0) {
    h = 12;
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  // s = (s < 10)? "0" + s : s;

  let time = h + ":" + m

  document.getElementById("clockdisplay").innerText = time;
  document.getElementById("clockdisplay").textContent = time;
  setTimeout(showTime, 1000);
}

showTime()


let screen = document.getElementById("device-screen");
let appgrid = document.getElementById("app-grid");
let homeB = document.getElementById("home")
let about = document.getElementById("aboutme");
let projects = document.getElementById("projectspage");
let journal = document.getElementById("journalpage");


let acon = document.getElementById("aboutC");
acon.style.display = "none";

let pcon = document.getElementById("projectsC");
pcon.style.display = "none";

let jcon = document.getElementById("journalC");
jcon.style.display = "none";

about.addEventListener("click", function (event) {
  acon.style.display = "block";
  appgrid.style.display = "none";

  screen.style.backgroundImage = "none"
  screen.style.backgroundColor = "gray"
});

projects.addEventListener("click", function (event) {
  pcon.style.display = "block"
  appgrid.style.display = "none";

  screen.style.backgroundImage = "none"
  screen.style.backgroundColor = "pink"
});

journal.addEventListener("click", function (event) {
  jcon.style.display = "block"
  appgrid.style.display = "none";

  screen.style.backgroundImage = "none"
  screen.style.backgroundColor = "pink"
});

homeB.addEventListener("click", function (event) {
  acon.style.display = "none";
  pcon.style.display = "none";
  jcon.style.display = "none";
  appgrid.style.display = "grid";

  screen.style.backgroundImage = "url('../images/bg.png')"
});




