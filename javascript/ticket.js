let str = document.URL.split("?")[1];
console.log(str);

let data = str.split("&");
console.log(data);

let namevalue = [];
for (let i = 0; i < data.length; i++) {
    namevalue[i] = data[i].split("=");
}
console.log(namevalue);

namevalue[0][1] = namevalue[0][1].replace(/[+]/g, " ");
console.log(namevalue[0][1]);

let values = [];
for (let i = 0; i < namevalue.length; i++) {
    values[i] = namevalue[i][1];
}
console.log(values);
let movieName = values[0];

//Find movie id
let movies = getMovies();
let matchId = 0;
while (movies[matchId].name != movieName) {
    matchId++;
}
let movieId = movies[matchId].id;
let showIndex = values[1];

//Match show index
let cinemas = getCinemas();
let matchCinema = 0;
let matchMovie = 0;
let matchShow = 0;
while (cinemas[matchCinema].movies[matchMovie].id != movieId || cinemas[matchCinema].movies[matchMovie].shows[matchShow].index != showIndex) {
    if (matchShow < cinemas[matchCinema].movies[matchMovie].shows.length - 1)
        matchShow++;
    else if (matchMovie < cinemas[matchCinema].movies.length - 1) {
        matchShow = 0;
        matchMovie++;
    }
    else if (matchCinema < cinemas.length - 1) {
        matchShow = 0;
        matchMovie = 0;
        matchCinema++;
    }
}
console.log(matchCinema);
console.log(matchMovie);
console.log(matchShow);

//Build detailed information
let detail = document.querySelector("div section:first-child");
detail.innerHTML = "";
detail.innerHTML = detail.innerHTML + "<input type='text' name='cinema' value='Cinema - " + cinemas[matchCinema].branchName.slice(14) + "'>";
detail.innerHTML = detail.innerHTML + "<input type='text' name='movie' value='Movie - " + movieName + "'>";
detail.innerHTML = detail.innerHTML + "<input type='text' name='time' value='" + cinemas[matchCinema].movies[matchMovie].shows[matchShow].datetime + "'>";
detail.innerHTML = detail.innerHTML + "<input type='text' name='house' value='House " + cinemas[matchCinema].movies[matchMovie].shows[matchShow].house + "'>";

//Book a seat
let seats = document.querySelectorAll("td~td");
console.log(seats);
let seatInfo = document.querySelector("#seat");
seatInfo.value = "";
let multipleSeats = false;
for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener("click", function bookSeat() {
        let row;
        switch (Math.floor(i / 5)) {
            case 0:
                row = 'A';
                break;
            case 1:
                row = 'B';
                break;
            case 2:
                row = 'C';
                break;
            case 3:
                row = 'D';
                break;
            default:
        }
        let column = seats[i].innerHTML;
        let seat = row + column;
        if (multipleSeats === false){
            seatInfo.value = seatInfo.value + seat;
            multipleSeats=true;
        }
        else
            seatInfo.value = seatInfo.value + ',' + seat;
        seats[i].style.background = "red";
        seats[i].removeEventListener("click", bookSeat);
    });
}
