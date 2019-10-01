var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var calendarDate = new Date();
var dayImageErrorUrl = "./images/logo.png";
var hovering = false;
var loopInc = 0;

function CalendarInit() {
    var data = jsonData[calendarDate.getMonth() + "" + calendarDate.getFullYear()];
    if (data === undefined) {
        nextMonth();
        return;
    }

    title = document.getElementById("calendar-monthTitle");
    title.innerHTML = monthNames[calendarDate.getMonth()] + " Calendar";
    title.style.color = "#" + data.tc;
    var textShadow = "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px aqua, 0 0 30px aqua, 0 0 40px aqua, 0 0 55px aqua, 0 0 75px aqua";
    textShadow = textShadow.replace(/aqua/g, "#" + data.ec);
    title.style.textShadow = textShadow;

    document.getElementById("calendar-hero-img").src = data.som;

    var calendar = document.getElementById("calendar-panel");
    var sidebar = document.getElementById("calendar-sidebar");
    var day;
    for (var i = 0; i < data.days.length; i++) {
        day = data.days[i];
        calendar.appendChild(CreateDay(day, data));
        if (day.d >= calendarDate.getDate() && day.d < calendarDate.getDate() + 10) {
            var sd = CreateSidebarDay(day);
            if (sd !== undefined)
                sidebar.appendChild(sd);
        }
    }
    nextPrevMonthExists();
}

function CreateDay(day, data) {
    var helper;
    if (day.e !== undefined) {
        helper = day;
        day = day.e[0];
        day.d = helper.d;
    }
    var div = document.createElement("div");
    div.className = "day calendar-container border";

    var el = document.createElement("img");
    el.src = day.i;

    el.onerror = function () {
        dayImgError(this, data);
    };
    div.appendChild(el);

    if (day.d !== 0) {
        el = document.createElement("span");
        el.innerHTML = day.d;
        div.appendChild(el);

        el = document.createElement("span");
        el.innerHTML = day.t;
        el.className = "calendar-event-time";
        div.appendChild(el);

        el = document.createElement("span");
        el.innerHTML = day.n;
        el.className = "calendar-event-name";
        div.appendChild(el);

        if (day.n === "OX Event" || day.n === "Mining Party")
            div.classList.add("flip");

        if (helper !== undefined) {
            doubleDay(helper, div, data.som);
        } else {
            if (day.u != undefined) {
                var img = document.createElement("img");
                img.src = day.u;
                img.width = "1px";
                img.height = "1px";
                document.getElementById("hiddenContainer").appendChild(img);
                div.addEventListener("mouseenter", function () {
                    document.getElementById("calendar-hero-img").src = day.u;
                    title.className = "hidden";
                });

                div.addEventListener("mouseleave", function () {
                    document.getElementById("calendar-hero-img").src = data.som;
                    title.className = "";
                });
            }
            div.addEventListener("click", function () {
                if (day.g !== "")
                    window.open(day.g, '_blank');
            });
        }
    }
    return div;
}


//function doubleDay(day, div, som) {
//    var helper = div.getElementsByTagName("span");
//    var eventTime = helper[1];
//    var eventName = helper[2];
//    var img = div.getElementsByTagName("img")[0];
//    div.removeChild(img);
    
//    var data = [];
//    var els = [];
//    for (var i = 0; i < day.e.length; i++) {
//        var d = day.e[i];
//        var image = document.createElement("img");
//        image.src = d.i;
//        div.appendChild(image);
//        data.push(d);
//        els.push(image);
//    }
//    //var img2 = document.createElement("img");
//    //img = document.createElement("img");
//    //img.src = pics[0];
//    //img2.src = pics[1];
//    //div.appendChild(img2);

//    div.addEventListener("mouseenter", function () {
//        hovering = true;
//        document.getElementById("calendar-hero-img").src = els[i].src;
//        title.className = "hidden";
//    });
//    div.addEventListener("mouseleave", function () {
//        hovering = false;
//        document.getElementById("calendar-hero-img").src = som;
//        title.className = "";
//    });
//    div.addEventListener("click", function () {
//        window.open(data., '_blank');
//    });

//    setInterval(function () {
//        if (!hovering) {
//            if (loopInc == 1) {
//                img.className = "hidden";
//                img2.className = "";
//                div.insertBefore(img2, div.firstChild);
//                div.removeChild(img);
//            } else {
//                img.className = "";
//                img2.className = "hidden";
//                div.insertBefore(img, div.firstChild);
//                div.removeChild(img2);
//            }
//            eventTime.innerHTML = times[loopInc];
//            eventName.innerHTML = names[loopInc];
//            loopInc = loopInc + 1;
//            if (loopInc == pics.length) {
//                loopInc = 0;
//            }
//        }
//    }, 1000);
//}

function doubleDay(day, div, som) {
    div.addEventListener("mouseenter", function () {
        hovering = true;
        if (loopInc == 1) {
            document.getElementById("calendar-hero-img").src = "https://i.imgur.com/jSB6MuY.png";
        } else {
            document.getElementById("calendar-hero-img").src = img2.src;
        }
        title.className = "hidden";
    });
    div.addEventListener("mouseleave", function () {
        hovering = false;
        document.getElementById("calendar-hero-img").src = som;
        title.className = "";
    });
    div.addEventListener("click", function () {
        if (loopInc == 1) {
            window.open("https://www.sg2global.com/forum/index.php?thread/367-event-moonlight-treasure-box/", '_blank');
        } else {
            //window.open("", '_blank'); //goes to given forum link
        }
    });
    var helper = div.getElementsByTagName("span");
    var eventTime = helper[1];
    var eventName = helper[2];
    var img = div.getElementsByTagName("img")[0];
    div.removeChild(img);

    var names = ["Moonlight Box", "Budokan PvP"];
    var pics = ["https://i.imgur.com/zGm6lA5.png", "https://i.imgur.com/IllUyVq.png?"];

    var times = ["All Day", "19:00"];
    var img2 = document.createElement("img");
    img = document.createElement("img");
    img.src = pics[0];
    img2.src = pics[1];
    div.appendChild(img2);

    setInterval(function () {
        if (!hovering) {
            if (loopInc == 1) {
                img.className = "hidden";
                img2.className = "";
                div.insertBefore(img2, div.firstChild);
                div.removeChild(img);
            } else {
                img.className = "";
                img2.className = "hidden";
                div.insertBefore(img, div.firstChild);
                div.removeChild(img2);
            }
            eventTime.innerHTML = times[loopInc];
            eventName.innerHTML = names[loopInc];
            loopInc = loopInc + 1;
            if (loopInc == pics.length) {
                loopInc = 0;
            }
        }
    }, 1000);
}

function CreateSidebarDay(day) {
    if (day.n === "")
        return undefined;
    var li = document.createElement("li");
    li.className = "box24";
    var el = document.createElement("a");
    el.href = day.g;
    li.appendChild(el);
    var el2 = document.createElement("img");
    el2.src = day.i;
    el2.style.width = "32px";
    el2.style.height = "32px";
    el2.className = "userAvatarImage";
    el.appendChild(el2);
    var div = document.createElement("div");
    div.className = "sidebarItemTitle";
    li.appendChild(div);
    el2 = document.createElement("h3");
    div.appendChild(el2);
    el = document.createElement("a");
    el.href = day.g;
    el.innerHTML = day.n;
    el2.appendChild(el);
    el2 = document.createElement("small");
    div.appendChild(el2);
    el2.innerHTML = day.d + " " + monthNames[calendarDate.getMonth()] + " - ";
    if (day.t === "" || day.t == "All Day")
        el2.innerHTML += day.t;
    else
        el2.innerHTML += day.t + " GMT";
    return li;
}


function dayImgError(el, data) {
    var div = el.parentNode;
    div.removeChild(el);
    div.className += " calendar-img-fail-load";
    el = document.createElement("img");
    el.src = dayImageErrorUrl;
    div.appendChild(el);
}

function previousMonth() {
    var m = calendarDate.getMonth() - 1;
    if (m < 0) {
        calendarDate.setMonth(11);
        calendarDate.setFullYear(calendarDate.getFullYear() - 1);
    } else {
        calendarDate.setMonth(m);
    }
    var date = new Date();
    if (date.getMonth === calendarDate.getMonth()) {
        calendarDate.setUTCDate(date.getUTCDate());
    } else {
        calendarDate.setUTCDate(1);
    }
    ClearContainers();
    CalendarInit();
}

function nextMonth() {
    var m = calendarDate.getMonth() + 1;
    if (m > 11) {
        calendarDate.setMonth(0);
        calendarDate.setFullYear(calendarDate.getFullYear() + 1);
    } else {
        calendarDate.setMonth(m);
    }
    var date = new Date();
    if (date.getMonth === calendarDate.getMonth()) {
        calendarDate.setUTCDate(date.getUTCDate());
    } else {
        calendarDate.setUTCDate(1);
    }
    ClearContainers();
    CalendarInit();
}

function ClearContainers() {
    var myNode = document.getElementById("calendar-panel");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    myNode = document.getElementById("calendar-sidebar");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function nextPrevMonthExists() {
    var m = calendarDate.getMonth() + 1;
    var newDate;
    if (m > 11) {
        newDate = new Date(calendarDate.getFullYear() + 1, 0);
    } else {
        newDate = new Date(calendarDate.getFullYear(), m);
    }
    if (jsonData[newDate.getMonth() + "" + newDate.getFullYear()] !== undefined) {
        document.getElementById("calendar-next").style.width = "50%";
    } else {
        document.getElementById("calendar-next").style.width = "0px";
    }

    m = calendarDate.getMonth() - 1;// prev
    if (m < 0) {
        newDate = new Date(calendarDate.getFullYear() - 1, 11);
    } else {
        newDate = new Date(calendarDate.getFullYear(), m);
    }

    if (jsonData[newDate.getMonth() + "" + newDate.getFullYear()] !== undefined) {
        document.getElementById("calendar-prev").style.width = "50%";
    } else {
        document.getElementById("calendar-prev").style.width = "0px";
    }
}
