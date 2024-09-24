// Define the Teacher interface
interface Teacher {
    readonly firstName: string;       // can only be set during initialization
    readonly lastName: string;        // can only be set during initialization
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;      // optional
    location: string;
    [key: string]: any;               // allows any other property to be added dynamically
}

// Create a class that implements the Teacher interface
class SchoolTeacher implements Teacher {
    // Define properties
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    location: string;
    yearsOfExperience?: number;

    constructor(
        firstName: string,
        lastName: string,
        fullTimeEmployee: boolean,
        location: string,
        yearsOfExperience?: number,
        additionalAttributes?: { [key: string]: any }
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullTimeEmployee = fullTimeEmployee;
        this.location = location;
        this.yearsOfExperience = yearsOfExperience;

        // Dynamically add additional attributes to the object
        if (additionalAttributes) {
            Object.assign(this, additionalAttributes);
        }
    }
}

// Example usage:
const teacher1 = new SchoolTeacher("Alice", "Smith", true, "New York", 5, { contract: true });
const teacher2 = new SchoolTeacher("Bob", "Johnson", false, "California", undefined, { department: "Math" });

// Log the created Teacher objects
console.log(teacher1);
console.log(teacher2);
