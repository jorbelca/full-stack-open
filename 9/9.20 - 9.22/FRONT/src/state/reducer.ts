import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT" ;
      payload: Patient;
    }
    | {
      type: "ADD_CURRENT_PATIENT" ;
      payload: Patient;
    }
    | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  ;

  export const currentPatientCreator = (
    data: Patient
  ): { type: "ADD_CURRENT_PATIENT"; payload: Patient } => {
    return {
      type: "ADD_CURRENT_PATIENT",
      payload: { ...data },
    };
  };
  
  export const diagnosesCreator = (
    data: Diagnosis[]
  ): { type: "SET_DIAGNOSIS_LIST"; payload: Diagnosis[] } => {
    return {
      type: "SET_DIAGNOSIS_LIST",
      payload: data,
    };
  };

    export const reducer = (state: State, action: Action): State => {
      switch (action.type) {
        case "SET_PATIENT_LIST":
          return {
            ...state,
            patients: {
              ...action.payload.reduce(
                (memo, patient) => ({ ...memo, [patient.id]: patient }),
                {}
              ),
              ...state.patients
            }
          };
        case "ADD_PATIENT":
          return {
            ...state,
            patients: {
              ...state.patients,
              [action.payload.id]: action.payload
            }
          };
     case "ADD_CURRENT_PATIENT":
      return {
        ...state,
        currentPatient: action.payload,}
          ;
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
        default:
          return state;
      }
    };

// ACTION CREATORS
export const setPatientList = (patients:Patient[]) :Action=> ({
  type: "SET_PATIENT_LIST",
  payload: patients,
});

export const addPatient = (patient:Patient)  :Action=> ({
  type: "ADD_PATIENT",
  payload: patient,
});

