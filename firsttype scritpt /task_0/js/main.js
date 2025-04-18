var student1 = {
    firstName: 'James',
    lastName: 'Joyce',
    age: 90,
    location: 'Europe'
};
var student2 = {
    firstName: 'Jordan',
    lastName: 'Peterson',
    age: 57,
    location: 'Canada'
};
var studentsList = [student1, student2];
var labels = ['firstName', 'location'];
var table = document.createElement('table');
var tbody = document.createElement('tbody');
var thead = document.createElement('thead');
document.body.appendChild(table);
table.appendChild(thead);
table.appendChild(tbody);
for (var i = 0; i < labels.length; i++) {
    var th = document.createElement('th');
    th.appendChild(document.createTextNode("" + labels[i]));
    thead.appendChild(th);
}
for (var i = 0; i < studentsList.length; i++) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    var values = [studentsList[i].firstName, studentsList[i].location];
    for (var j = 0; j < values.length; j++) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("" + values[j]));
        tr.appendChild(td);
    }
}
