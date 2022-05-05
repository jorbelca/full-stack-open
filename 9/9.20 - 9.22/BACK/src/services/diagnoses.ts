import { Diagnose } from "../types/Diagnose";
import diagnose from '../../data/diagnoses.json';




const getAllDiagnoses = () :Diagnose[] => { 
return diagnose ;
};


export default getAllDiagnoses;