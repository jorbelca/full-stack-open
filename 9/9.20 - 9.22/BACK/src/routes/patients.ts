import express from 'express';
import patientsServices from '../services/patientsServices';

import { formatNewPatient } from '../utils/formatNewPatient';
import { createEntryForPatient } from '../utils/utils';


const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res)=>{
 res.send(patientsServices.getAllPatients());
});

patientsRouter.get('/:id', (req, res)=>{

    try{
        const patient = patientsServices.getAllPatients().filter((p) => p.id === req.params.id);

        res.status(200).json(patient);
    }catch(e){
        res.status(400).send("Error: something went wrong" + e);
    }
   
   });

patientsRouter.post('/',(req,res)=>{
try{
    
    const newPatient = formatNewPatient(req.body);
    const newP = patientsServices.addPatient(newPatient);

    res.json(newP).status(200);
} catch(error){
     res.status(400).send("Error: something went wrong" + error).end();
 }
});

patientsRouter.post("/:id/entries", (req, res) => {
    try {
      const entry = createEntryForPatient(req.body);
  
      const newPatientEntry = patientsServices.addSinglePatient(
        entry,
        req.params.id
      );
      res.json(newPatientEntry);

    } catch (error) {
      if (error instanceof Error) {

        res.status(400).send(error.message).end();
      }
    }
  });
export default patientsRouter;


