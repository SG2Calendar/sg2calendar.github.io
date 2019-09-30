var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var calendarDate = new Date();
var dayImageErrorUrl = "./images/sg2global/logo156x88.png"; //change my url if needed
var hovering = false;
var loopInc = 0;



/**
 * Manages the calendar data
 */
function CalendarInit() {

    //var img = [document.getElementById("imgff"), document.getElementById("img2")];
    //console.log(document.getElementById("imgggg"));
    //setInterval(function () {
    //    img[0].toogleClass('hidden');
    //    img[1].toogleClass('hidden');
    //    s.innerHtml += 1;
    //}, 1000);

    var data = jsonData[calendarDate.getMonth() + "" + calendarDate.getFullYear()]; // fetch current month data
    if (data === undefined) {
        nextMonth();
        return;
    }

    title = document.getElementById("calendar-monthTitle"); // setup the title
    title.innerHTML = monthNames[calendarDate.getMonth()] + " Calendar";
    title.style.color = "#" + data.tc;
    var textShadow = "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px aqua, 0 0 30px aqua, 0 0 40px aqua, 0 0 55px aqua, 0 0 75px aqua";
    textShadow = textShadow.replace(/aqua/g, "#" + data.ec);
    title.style.textShadow = textShadow;

    document.getElementById("calendar-hero-img").src = data.som; // screen of the month

    var calendar = document.getElementById("calendar-panel"); // fetch day container
    var sidebar = document.getElementById("calendar-sidebar");
    var day;
    for (var i = 0; i < data.days.length; i++) { //create each day
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

/**
 * Creates the html require for displaying a day. Example day:
 * <div class="day calendar-container border">
 *      <img src="http://i.imgur.com/o3294505.png" />
 *      <span>30</span>
 *      <span class="calendar-event-time">19:00</span>
 *  </div>
 * @param {object} day contains the day number, event image and time and forum link
 * @param {object} data contains data relating to this day month
 * @returns {Day} day html
 */
function CreateDay(day, data) {
    var helper;
    if (day.e !== undefined) {
        helper = day;
        day = day.e[0];
        day.d = helper.d;
    }
    var div = document.createElement("div"); //create day container
    div.className = "day calendar-container border";

    var el = document.createElement("img"); //create day image
    el.src = day.i; //image url

    el.onerror = function () {
        dayImgError(this, data);
    };
    div.appendChild(el);

    if (day.d !== 0) { //no need to append text on empty days
        el = document.createElement("span"); //create the day number
        el.innerHTML = day.d; //day number
        div.appendChild(el);

        el = document.createElement("span"); //create the event time
        el.innerHTML = day.t; // event time
        el.className = "calendar-event-time";
        div.appendChild(el);

        el = document.createElement("span"); //create the event time
        el.innerHTML = day.n; // event time
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
                    document.getElementById("calendar-hero-img").src = data.som; //screen of the month
                    title.className = "";
                });
            }
            div.addEventListener("click", function () { //adds on click event
                if (day.g !== "")
                    window.open(day.g, '_blank'); //goes to given forum link
            });
        }
    }
    return div;
}


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
        document.getElementById("calendar-hero-img").src = som; //screen of the month
        title.className = "";
    });
    div.addEventListener("click", function () { //adds on click event
        if (loopInc == 1) {
            window.open("https://www.sg2global.com/forum/index.php?thread/367-event-moonlight-treasure-box/", '_blank'); //goes to given forum link
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

/*
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
        document.getElementById("calendar-hero-img").src = som; //screen of the month
        title.className = "";
    });
    div.addEventListener("click", function () { //adds on click event
        if (loopInc == 1) {
            window.open("https://www.sg2global.com/forum/index.php?thread/367-event-moonlight-treasure-box/", '_blank'); //goes to given forum link
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
} */


/**
 * Creates the html require for displaying a day on the sidebar. Example day:
 * <li class="box24">
 *      <a href="https://www.sg2global.com/forum/index.php?thread/482-legendary-blue-scale-9-8avg-res-and-800hp/">
 *      <img src="./SG2 Global_files/35-f4a2d4ac291a116a4891a4a77526515d374d4d23.jpg" width="24" height="24" alt="" class="userAvatarImage"></a>
 *      <div class="sidebarItemTitle">
 *          <h3><a href="https://www.sg2global.com/forum/index.php?thread/482-legendary-blue-scale-9-8avg-res-and-800hp/&amp;action=firstNew">Legendary Blue Scale +9 8AVG RES AND 800HP</a></h3>
 *      </div>
 *      <small>
 *          16 March - 19:00 GMT
 *      </small>
 *  </li>
 * @param {object} day contains the day number, event image and time and forum link
 * @param {object} data contains data relating to this day month
 * @returns {Day} day html
 */
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
    el = document.createElement("img"); //create day image
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

    // prev
    m = calendarDate.getMonth() - 1;
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