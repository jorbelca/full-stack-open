import { Diagnose } from "../types/Diagnose";
import diagnoses from '../../data/diagnoses.json';


const diagnose: Array<Diagnose> = diagnoses as Array<Diagnose>;

const getAllDiagnoses = () :Diagnose[] => { 
return diagnose ;
};


export default getAllDiagnoses;