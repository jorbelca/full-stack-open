import { Diagnosis } from "../../FRONT/src/types";

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender;
    occupation: string;
    entries?: Entry[]
}


export type NonSSNPatient = Omit<Patient , 'ssn' | 'entries'>;
export type newPatient =  Omit<Patient ,  'entries'>;


export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}


export type Entry = HospitalEntry |  OccupationalHealthcareEntry
| HealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  interface OccupationalHealthcareEntry extends BaseEntry {
    type:"OccupationalHealthcare"
    employerName: string;
    sickLeave?: SickLeave
  }
  interface HealthCheckEntry extends BaseEntry{
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface HospitalEntry extends BaseEntry {
      type: "Hospital"
    discharge: Discharge
  }

  enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  interface SickLeave {
      startDate: string;
      endDate: string
  }

  interface Discharge {
      date: string;
      criteria: string
  }