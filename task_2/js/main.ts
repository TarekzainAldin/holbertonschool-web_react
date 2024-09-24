// Define the Director and Teacher types
interface Director {
    workDirectorTasks: () => void;
    salary: number;
}

interface Teacher {
    workTeacherTasks: () => void;
    salary: number;
}

// Union type for Employee
type Employee = Director | Teacher;

// Create a function to create an Employee based on salary
function createEmployee(salary: number): Employee {
    if (salary > 500) {
        return {
            salary,
            workDirectorTasks: () => console.log('Getting to director tasks')
        };
    } else {
        return {
            salary,
            workTeacherTasks: () => console.log('Getting to work')
        };
    }
}

// Type predicate to check if employee is a Director
function isDirector(employee: Employee): employee is Director {
    return (employee as Director).workDirectorTasks !== undefined;
}

// Execute the work based on the employee type
function executeWork(employee: Employee): void {
    if (isDirector(employee)) {
        employee.workDirectorTasks();
    } else {
        (employee as Teacher).workTeacherTasks();
    }
}

// Testing the solution
executeWork(createEmployee(200));   // Output: Getting to work
executeWork(createEmployee(1000));  // Output: Getting to director tasks
