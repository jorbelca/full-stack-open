import patients from '../../data/patients';
import { Entry, EntryWithoutId, newPatient, NonSSNPatient, Patient } from '../types/Patient';
import { v1 as uuidv1 } from "uuid";

const getAllPatients=():NonSSNPatient[]=>{
return patients.map(({id, name, gender, dateOfBirth, occupation, entries, ssn})=>({
id,name, gender, dateOfBirth, occupation,entries, ssn
}));
};

const getSinglePatient = (id:string) :Patient | undefined => {
  const pat  = patients.find(patient => patient.id === id);
    return pat ;
   };



const addPatient = (patient: newPatient): Patient=> {

console.log(patient);
const newPatient ={
  id: uuidv1(),
  ...patient,
}

patients.push(newPatient);
return newPatient;
};



const addSinglePatient = (entry: EntryWithoutId, id: string): Entry => {
  console.log(entry);
  const newEntry = {
    id: uuidv1(),
    ...entry,
  };
  console.log("NEW ENTRY: ", newEntry);
  const patientToBeUpdated = patients.find((p) => p.id === id);
  if (patientToBeUpdated) {
    patientToBeUpdated.entries = [...patientToBeUpdated.entries, newEntry];
    return newEntry;
  }
  throw new Error(`Cannot find the patient with the ID: ${id}`);
};

export default {getAllPatients,addPatient,getSinglePatient,addSinglePatient};