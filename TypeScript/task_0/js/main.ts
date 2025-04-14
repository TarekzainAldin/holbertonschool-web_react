window.onload = () => {
    interface Student {
      firstName: string;
      lastName: string;
      age: number;
      location: string;
    }
  
    const student1: Student = {
      firstName: "Tarek",
      lastName: "ziad",
      age: 25,
      location: "syria "
    };
  
    const student2: Student = {
      firstName: "Sara",
      lastName: "Mohamed",
      age: 23,
      location: "damas"
    };
  
    const studentsList: Student[] = [student1, student2];
  
    // Create table
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "First Name";
    const locationHeader = document.createElement("th");
    locationHeader.textContent = "Location";
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(locationHeader);
    table.appendChild(headerRow);
  
    // Add rows for each student
    studentsList.forEach((student) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = student.firstName;
      const locationCell = document.createElement("td");
      locationCell.textContent = student.location;
      row.appendChild(nameCell);
      row.appendChild(locationCell);
      table.appendChild(row);
    });
  
    document.body.appendChild(table);
  };
  