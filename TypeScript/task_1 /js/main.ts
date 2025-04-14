// defentetion teatcher interface 
interface Teacher{
    readonly firstName: string;
    readonly lastName:string; 
    fullTimeEmployee : boolean;
    yearsOfExperience?:number;
    location: string;
    [key:string]: any
}
const teatcher1: Teacher ={
firstName:'tarek',
lastName:'zainaldin',
fullTimeEmployee:true,
location:'france',
contract:true
};
console.log(teatcher1);