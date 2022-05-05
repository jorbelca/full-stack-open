import { Diagnose } from "./Diagnose";


export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender;
    occupation: string;
    entries: Entry[]
}


export type NonSSNPatient = Omit<Patient , 'ssn' | 'entries'>;
export type newPatient =  Omit<Patient ,  'id'>;


export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}


export type Entry = HospitalEntry |  OccupationalHealthcareEntry
| HealthCheckEntry;


type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryWithoutId = UnionOmit<Entry, "id">;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
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