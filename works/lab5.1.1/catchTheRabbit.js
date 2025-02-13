
window.addEventListener("load", function (event) {
    let r1 = document.getElementById("rabbit1");
    let r2 = document.getElementById("rabbit2");
    let r3 = document.getElementById("rabbit3");
    let r4 = document.getElementById("rabbit4");

    r2.style.visibility = "hidden";
    r3.style.visibility = "hidden";
    r4.style.visibility = "hidden";

    let noeggs = document.getElementById("noeggs");
    let slow = document.getElementById("slow");

    noeggs.style.visibility = "hidden";
    slow.style.visibility = "hidden";

    let count = 0;

    function counter() {
        if (count === 4) {
            noeggs.style.visibility = "visible";
        };
    
        if (count === 20) {
            slow.style.visibility = "visible";
        };
    }

    r1.addEventListener("mouseover", function (event) {
        r1.style.visibility = "hidden";
        r2.style.visibility = "visible";
        count += 1;
        counter();
    });

    r2.addEventListener("mouseover", function (event) {
        r2.style.visibility = "hidden";
        r3.style.visibility = "visible";
        count +=1;
        counter();
    });

    r3.addEventListener("mouseover", function (event) {
        r3.style.visibility = "hidden";
        r4.style.visibility = "visible";
        count += 1;
        counter();
    });

    r4.addEventListener("mouseover", function (event) {
        r4.style.visibility = "hidden";
        r1.style.visibility = "visible";
        count += 1;
        counter();
    });

});
