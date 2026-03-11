export function generateStudentId(count:number){

 const year = new Date().getFullYear();

 const number = String(count + 1).padStart(3,"0");

 return `SSS-${year}-${number}`;

}