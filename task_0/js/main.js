var student1 = {
    firstName: 'tarek',
    lastName: 'zainaldin',
    age: 26,
    location: 'laval, fr'
};
var student2 = {
    firstName: 'ammar',
    lastName: 'zain aldin ',
    age: 22,
    location: 'laval , fr'
};
var studentsList = [student1, student2];
var table = document.createElement('table');
document.body.appendChild(table);
studentsList.forEach(function (student) {
    var newRow = table.insertRow();
    var newRowFirstName = newRow.insertCell();
    var newRowLocation = newRow.insertCell();
    newRowFirstName.innerHTML = student.firstName;
    newRowLocation.innerHTML = student.location;
});
