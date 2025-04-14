interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  }

  const student1: Student = {
    firstName: 'John',
    lastName: 'Doe',
    age: 20,
    location: 'New York',
  };
  
  const student2: Student = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 22,
    location: 'Los Angeles',
  };
  
 const studentsList: Student[] = [student1, student2];
  

 function renderTable() {
    const table = document.createElement('table');
    table.setAttribute('border', '1');
  
    // create the header row table 
    const headerRow = table.insertRow();
    const header1 = headerRow.insertCell();
    header1.textContent = 'First Name';
    const header2 = headerRow.insertCell();
    header2.textContent = 'Location';
  
    // adding rows contant to the table 
    studentsList.forEach(student => {
      const row = table.insertRow();
      const cell1 = row.insertCell();
      cell1.textContent = student.firstName;
      const cell2 = row.insertCell();
      cell2.textContent = student.location;
    });
  
    // Adding the table on the page html 
    document.body.appendChild(table);
  }
  
  renderTable();
  