import patients from '../../data/patients.json';
import { newPatient, NonSSNPatient } from '../types/Patient';

const getAllPatients=():NonSSNPatient[]=>{
return patients.map(({id, name, gender, dateOfBirth, occupation})=>({
id,name, gender, dateOfBirth, occupation,
}));
};


const addPatient = (patient: newPatient) :newPatient=> {

console.log(patient);

patients.push(patient);
return patient;
};

export default {getAllPatients,addPatient};