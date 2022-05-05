import axios from "axios";
import  React, {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { currentPatientCreator,  useStateValue } from "../state";
import {   Diagnosis } from "../types";
import {  Container, Divider,  Icon } from "semantic-ui-react";
import PatientEntryView from "../components/PatientEntryView";



const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, currentPatient, diagnoses }, dispatch] = useStateValue();
  const [currentDiagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!currentPatient || (currentPatient && currentPatient.id !== id)) {
     
      const patient = Object.values(patients).find((p) => p.id === id);

      if (patient) {
        dispatch(currentPatientCreator(patient));
      }
    }
    setDiagnoses(diagnoses);
  }, []);
 

  return (
    <div>
      {currentPatient && (
        <Container>
          <h2>
            {currentPatient.name}
            {currentPatient.gender === "female" ? (
              <Icon name={"venus"} />
            ) : (
              <Icon name={"mars"} />
            )}
          </h2>
          <Divider />
          <p>{currentPatient.ssn && `ssn: ${currentPatient.ssn}`}</p>
          <p>{`occupation: ${currentPatient.occupation}`}</p>
          <Divider />
          <h3>entries</h3>
          {currentPatient.entries.map((entry:any) => {
            return <PatientEntryView key={entry.id} entry={entry} />;
          })}
          {currentPatient.entries.map((entry:any) => {
            return (
              <div key={entry.id}>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <ul>
                    {entry.diagnosisCodes.map((code:any) => {
                      return (
                        <li key={code + entry.id}>
                          {code}{" "}
                          {currentDiagnoses &&
                            currentDiagnoses.length > 0 &&
                            currentDiagnoses.find((d) => d.code === code)?.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
          {/* <PatientEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            error={error}
            onSubmit={submitNewPatientEntry}
            type={entryType}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          <Dropdown
            placeholder="Select Entry Type"
            name="entry-type"
            selection
            onChange={handleEntryOptionChange}
            options={entryOptions}
            value={entryType}
          /> */}
        </Container>
      )}
    </div>
  );
};

export default SinglePatient;