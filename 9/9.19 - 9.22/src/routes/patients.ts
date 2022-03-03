import express from 'express';
import patientsServices from '../services/patientsServices';
import { newPatient } from '../types/Patient';
import { funcNewPatient } from '../utils/funcNewPatient';


const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res)=>{
 res.send(patientsServices.getAllPatients());
});

patientsRouter.get('/:id', (req, res)=>{
    const id:string = req.params.id;
    try{
         res.send(patientsServices.getSinglePatient(id));
    }catch(e){
        res.status(400).send("Error: something went wrong" + e);
    }
   
   });

patientsRouter.post('/',(req,res)=>{
try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient:newPatient = funcNewPatient(req.body);
    const newP = patientsServices.addPatient(newPatient);

    res.json(newP).status(200);
}
catch(error:unknown){
res.status(400).send("Error: something went wrong" + error);
}
});

export default patientsRouter;


