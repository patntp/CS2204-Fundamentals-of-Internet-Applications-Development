let str = document.URL.split("?")[1];
console.log(str);

let data = str.split("&");
console.log(data);

let namevalue = [];
for (let i = 0; i < data.length; i++) {
    namevalue[i] = data[i].split("=");
}
console.log(namevalue);

for (let i = 0; i < namevalue.length; i++) {
    namevalue[i][1] = namevalue[i][1].replace(/[+]/g, " ");
    namevalue[i][1] = namevalue[i][1].replace(/%2C/g, ",");
    namevalue[i][1] = namevalue[i][1].replace("%3A", ":");
}

let values = [];
for (let i = 0; i < namevalue.length; i++) {
    values[i] = namevalue[i][1];
}
console.log(values[4].length);

let numTicket = 1;
let seats = [];
for (let i = 0; i < values[4].length; i++) {
    if (values[4][i] === ",") {
        if (numTicket === 1)
            seats[numTicket - 1] = values[4].substring(0, i);
        seats[numTicket] = values[4].substring(i + 1, i + 3);
        numTicket++;
    }
}
console.log(numTicket);
console.log(seats);

//Build tickets
let tickets = document.querySelector("div");
tickets.innerHTML = "";
console.log(tickets);
for (let i = 0; i < numTicket; i++) {
    tickets.innerHTML = tickets.innerHTML + "<fieldset></fieldset>";
    let ticketsInfo = document.querySelector("div fieldset:last-child");
    ticketsInfo.innerHTML = ticketsInfo.innerHTML + "<legend>Ticket " + (i + 1) + "</legend>";
    ticketsInfo.innerHTML = ticketsInfo.innerHTML + "<label>Cinema:</label><input type='text' name='cinema' value='" + values[0].slice(9) + "' readonly>";
    ticketsInfo.innerHTML = ticketsInfo.innerHTML + "<label>Movie:</label><input type='text' name='movie' value='" + values[1].slice(8) + "' readonly>";
    ticketsInfo.innerHTML = ticketsInfo.innerHTML + "<label>Date Time:</label><input type='text' name='time' value='" + values[2] + "' readonly>";
    ticketsInfo.innerHTML = ticketsInfo.innerHTML + "<label>House No.:</label><input type='text' name='house' value='" + values[3].slice(6) + "' readonly>";
    ticketsInfo.innerHTML = ticketsInfo.innerHTML + "<label>Seat:</label><input type='text' name='seat' value='" + seats[i] + "' readonly>";
}