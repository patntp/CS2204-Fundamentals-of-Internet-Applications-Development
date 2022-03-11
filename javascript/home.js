let movies = getMovies();
let nowList = document.querySelector("#nowlist");
let upcomingList = document.querySelector("#upcominglist");
nowList.innerHTML = "";
upcomingList.innerHTML = "";

let nowIdArr = [];
let upcomingIdArr = [];

for (let i = 0, j = 0, k = 0; i < movies.length; i++) {
    if (movies[i].type === "now") {
        nowList.innerHTML = nowList.innerHTML + "<li><p><span>Movie:</span> " + movies[i].name + "</p>";
        nowList.innerHTML = nowList.innerHTML + "<img src='../image/" + movies[i].thumbnail + "' alt='" + movies[i].name + "' title='" + movies[i].name + "' onclick='chooseMovie(" + movies[i].id + ")'>";
        nowList.innerHTML = nowList.innerHTML + "<p><span>Cast:</span> " + movies[i].cast + "</p>";
        nowList.innerHTML = nowList.innerHTML + "<p><span>Director:</span> " + movies[i].director + "</p>";
        nowList.innerHTML = nowList.innerHTML + "<p><span>Duration:</span> " + movies[i].duration + " mins</p></li>";
        nowIdArr[j] = movies[i].id;
        j++;
    }
    else {
        upcomingList.innerHTML = upcomingList.innerHTML + "<li><p><span>Movie:</span> " + movies[i].name + "</p>";
        upcomingList.innerHTML = upcomingList.innerHTML + "<img src='../image/" + movies[i].thumbnail + "' alt='" + movies[i].name + "' title='" + movies[i].name + "' onclick='chooseMovie(" + movies[i].id + ")'>";
        upcomingList.innerHTML = upcomingList.innerHTML + "<p><span>Cast:</span> " + movies[i].cast + "</p>";
        upcomingList.innerHTML = upcomingList.innerHTML + "<p><span>Director:</span> " + movies[i].director + "</p>";
        upcomingList.innerHTML = upcomingList.innerHTML + "<p><span>Duration:</span> " + movies[i].duration + " mins</p></li>";
        upcomingIdArr[k] = movies[i].id;
        k++;
    }
}
console.log(nowIdArr);
console.log(upcomingIdArr);

let moviesIdArr = [];
let moviesIdIndex = 0;
for (let i = 0; i < nowIdArr.length; i++) {
    moviesIdArr[moviesIdIndex] = nowIdArr[i];
    moviesIdIndex++;
}
for (let i = 0; i < upcomingIdArr.length; i++) {
    moviesIdArr[moviesIdIndex] = upcomingIdArr[i];
    moviesIdIndex++;
}
console.log(moviesIdArr);

let v;
v = document.querySelector("#video video source");
let idx = 0;
let a = 0;
while (movies[a].id != moviesIdArr[idx]) {
    a++;
}
v.src = movies[a].src;
v = document.querySelector("#video video");
v.load();

function vplay() {
    v.play();
    v.onended = function () {
        setTimeout(changeMovie, 2000);
    }
}

function vstop() {
    v.currentTime = 0;
    v.pause();
}

function changeMovie() {
    idx++;
    if (idx === moviesIdArr.length)
        idx = 0;
    console.log(idx);
    v = document.querySelector("#video video source");
    let a = 0;
    console.log(movies[a].id);
    while (movies[a].id != moviesIdArr[idx]) {
        a++;
    }
    v.src = movies[a].src;
    v = document.querySelector("#video video");
    v.load();
    vplay();
}

function chooseMovie(x) {
    v.pause();
    v = document.querySelector("#video video source");
    let i = 0;
    while(movies[i].id!=x){
        i++;
    }
    v.src = movies[i].src;
    v = document.querySelector("#video video");
    v.load();
    idx=x-1;
    vplay();
}