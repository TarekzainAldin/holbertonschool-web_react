interface Teacher {
	readonly firstName: string,
	readonly lastName: string,
	fullTimeEmployee: boolean,
	yearsOfExperience?: number,
	location: string;
	[key: string]: any;
}

const teacher3: Teacher = {
	firstName: 'John',
	fullTimeEmployee: false,
	lastName: 'Doe',
	location: 'London',
	contract: false,
  };

  console.log(teacher3);

interface Directors extends Teacher {
	numberOfReports: number
}

const director1: Directors = {
	firstName: 'John',
	lastName: 'Doe',
	location: 'London',
	fullTimeEmployee: true,
	numberOfReports: 17,
  };
  console.log(director1);

interface printTeacherFunction {
	(firstName: string, lastName: string): string;
  }

const PrintTeacher:printTeacherFunction = (firstName, lastName) => {
	return `${firstName.charAt(0)}. ${lastName}`;
	};

	console.log(PrintTeacher("John", "Doe"));

interface Studentconstructor {
	firstName: string;
	lastName: string;
}

interface StudentClass {
	workOnHomework(): string;
	displayName(): string;
}
	class Student implements StudentClass{
		firstName: string;
		lastName: string;

		constructor(firstName: string, lastName: string) {
			this.firstName = firstName;
			this.lastName = lastName;
		}
		workOnHomework(): string{
		return "Currently working";
	}
		displayName(): string {
		return this.firstName;
	}
}

const student = new Student("John", "Doe");
console.log(student.workOnHomework());
console.log(student.displayName());
