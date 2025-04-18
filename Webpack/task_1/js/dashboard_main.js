import $ from "jquery";
import _ from "lodash";

let count = 0;

function updateCounter() {
    count += 1;
    $("#count").text(`${count} clicks on the button`);
}

// version "debounced" de updateCounter avec un délai de 500ms
const debouncedUpdateCounter = _.debounce(updateCounter, 500);

$("body").append("<p>Holberton Dashboard</p>");
$("body").append("<p>Dashboard data for the students</p>");
$("body").append("<button id='clickButton'>Click here to get started</button>");
$("body").append("<p id='count'></p>");
$("body").append("<p>Copyright - Holberton School</p>");

// Attacher l'événement click du bouton à la version "debounced" de updateCounter
$("#clickButton").on("click", debouncedUpdateCounter);
