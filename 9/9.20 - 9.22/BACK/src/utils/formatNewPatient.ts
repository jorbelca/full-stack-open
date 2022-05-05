import { Gender, newPatient } from "../types/Patient";



export const formatNewPatient = (patient:newPatient): newPatient =>{
return {

        name: parseName(patient.name),
        ssn: parseSSN(patient.ssn),
        gender: parseGender(patient.gender),
        dateOfBirth: parseDateOfB(patient.dateOfBirth),
        occupation: parseOccupation(patient.occupation),
        entries:[]
  }
}; 



const parseName =(name:unknown): string => {
 if(!name || !isString(name)) {
    throw new Error('Incorrect or missing field name: ' + name);
 }
 return name;
};

const parseSSN = (ssn:any): string => {
if(ssn && isString(ssn) && isSSN(ssn)){
    return ssn;
 }
 throw new Error('Incorrect or missing field ssn: ' + ssn);
 
};
const parseGender = (gender:unknown):  Gender => {
if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing field gender: ' + gender);
}
return gender;
};
const parseDateOfB = (date:unknown):string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing field date: ' + date);
    }
    return date;
};
const parseOccupation = (occupation:unknown):string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing field name: ' + occupation);
     }
     return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
  
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const isGender = (param: any) :param is Gender => {

return Object.values(Gender).includes(param);
};

const isSSN = (ssn:string): boolean => {
    const regex = /\d{6}[-][A-Za-z\d]{3}/;
    return regex.test(ssn);

};