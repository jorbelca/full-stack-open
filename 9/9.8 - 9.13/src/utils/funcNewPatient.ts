import { Gender, newPatient } from "../types/Patient";
import { v4 as uuid } from "uuid";


export const funcNewPatient = (patient:newPatient): newPatient =>{
    const newP:newPatient = { 
        id: uuid(),
        name: parseName(patient.name),
        ssn: parseSSN(patient.ssn),
        gender: parseGender(patient.gender),
        dateOfBirth: parseDateOfB(patient.dateOfBirth),
        occupation: parseOccupation(patient.occupation)
    };
    return newP;
};



const parseName =(name:unknown): string => {
 if(!name || !isString(name)) {
    throw new Error('Incorrect or missing field name: ' + name);
 }
 return name;
};

const parseSSN = (ssn: any): string => {
if(!ssn || ssn.length < 8 ){
    throw new Error('Incorrect or missing field ssn: ' + ssn);
 }
 // eslint-disable-next-line @typescript-eslint/no-unsafe-return
 return ssn;

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
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
return Object.values(Gender).includes(param);
};

// const isSSN = (ssn:any): string => {
//     // // eslint-disable-next-line no-useless-escape
//     // const reg = new RegExp('/^[0-9]{1,6}\-\w\w\w\w?/gm');
//     // console.log(ssn !=  reg);
    
//     // if(ssn !==  reg) {
//     //     throw new Error('Incorrect or missing field ssn: ' + ssn);
//     // }
//     // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     return ssn;
// };