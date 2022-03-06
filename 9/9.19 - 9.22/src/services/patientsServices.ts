import patients from '../../data/patients';
import { newPatient, NonSSNPatient, Patient } from '../types/Patient';

const getAllPatients=():NonSSNPatient[]=>{
return patients.map(({id, name, gender, dateOfBirth, occupation})=>({
id,name, gender, dateOfBirth, occupation
}));
};

const getSinglePatient = (id:string) :Patient | undefined => {
  const pat  = patients.find(patient => patient.id === id);
    return pat ;
   };

const addPatient = (patient: newPatient) :newPatient=> {

console.log(patient);

patients.push(patient);
return patient;
};

export default {getAllPatients,addPatient,getSinglePatient};