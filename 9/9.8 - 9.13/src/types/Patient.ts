export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string |  Gender,
    occupation: string
}


export type NonSSNPatient = Omit<Patient , 'ssn'>;
export type newPatient = Patient;


export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}