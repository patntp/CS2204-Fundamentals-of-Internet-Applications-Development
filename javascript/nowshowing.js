let cinemas = getCinemas();
let dropdownCinema = document.querySelector("div section:first-child");
dropdownCinema.innerHTML = "";
console.log(dropdownCinema);
dropdownCinema.innerHTML = dropdownCinema.innerHTML + "<label for='cinema'>Select Cinema: </label>";
dropdownCinema.innerHTML = dropdownCinema.innerHTML + "<select name='cinema' id='cinema' onchange='chooseCinema(value)'>";

let choiceCinema = document.querySelector("div section:first-child select");
console.log(choiceCinema);
for (let i = 0; i < cinemas.length; i++) {
    if (i === 0)
        choiceCinema.innerHTML = choiceCinema.innerHTML + "<option value='" + cinemas[i].branchName + "' selected='selected'>" + cinemas[i].branchName + "</option>";
    else
        choiceCinema.innerHTML = choiceCinema.innerHTML + "<option value='" + cinemas[i].branchName + "'>" + cinemas[i].branchName + "</option>";
}

let choiceMovie = document.querySelector("div section:first-child + section");
choiceMovie.innerHTML = "";

let movies = getMovies();

//Create first cinema's movies
createCinemaDetail(0);

function createCinemaDetail(y){
    for (let i = 0; i < cinemas[y].movies.length; i++) {
        let matchId = 0;
        while (movies[matchId].id != cinemas[y].movies[i].id) {
            matchId++;
        }
        let movieInfo = movies[matchId];
        console.log(movieInfo);
        console.log(movieInfo.name);
        choiceMovie.innerHTML = choiceMovie.innerHTML + "<div><form method='GET' action='ticket.html'></form></div>";
        let formMovie = document.querySelector("div section:first-child + section div:last-child form");
        console.log(formMovie);
        console.log(choiceMovie);
        formMovie.innerHTML = formMovie.innerHTML + "<img src='../image/" + movieInfo.thumbnail + "' alt='" + movieInfo.name + "'title='" + movieInfo.name + "'>";
        formMovie.innerHTML = formMovie.innerHTML + "<input type='text' name='moviename' value='" + movieInfo.name + "'>";
        formMovie.innerHTML = formMovie.innerHTML + "<select name='showindex'>";
        let schedule = document.querySelector("div section:first-child + section div:last-child form select");
    
        //Create schedules of each movie
        for (let j = 0; j < cinemas[y].movies[i].shows.length; j++) {
            if (j === 0)
                schedule.innerHTML = schedule.innerHTML + "<option value='" + cinemas[y].movies[i].shows[j].index + "' selected='selected'>" + cinemas[y].movies[i].shows[j].datetime + ", House " + cinemas[y].movies[i].shows[j].house + "</option>";
            else
                schedule.innerHTML = schedule.innerHTML + "<option value='" + cinemas[y].movies[i].shows[j].index + "'>" + cinemas[y].movies[i].shows[j].datetime + ", House " + cinemas[y].movies[i].shows[j].house + "</option>";
        }
    
        formMovie.innerHTML = formMovie.innerHTML +"<input type='submit' value='Buy Ticket'>";
    }
}

function chooseCinema(x){
    let y=0;
    while(cinemas[y].branchName!=x){
        y++;
    }

    choiceMovie.innerHTML="";
    createCinemaDetail(y);
}