

let apps = document.querySelectorAll('.app');


apps.forEach(app => {
  app.addEventListener('mouseover', () => {
    app.style.transform = 'scale(1.05)';
  });
  app.addEventListener('mouseout', () => {
    app.style.transform = 'scale(1)';
  });
});



function showTime(){
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  if (h==0){
    h=12;
  }

  h = (h < 10)? "0" + h : h;
  m = (m < 10)? "0" + m : m;
  // s = (s < 10)? "0" + s : s;

  let time = h + ":" + m 

  document.getElementById("clockdisplay").innerText = time;
  document.getElementById("clockdisplay").textContent = time;
  setTimeout(showTime, 1000);
}

showTime()