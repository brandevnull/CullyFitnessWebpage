import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Client from '../../Models/Client';
import {
  useHistory,
  withRouter
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Exercise from '../../Models/Exercise';
import Select from 'react-select'
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

initializeApp({
  apiKey: 'AIzaSyBoQT4L3shuLfXGgQeQKR6jv2V0zA-Xnk0',
  authDomain: 'cullyfitness.firebaseapp.com',
  projectId: 'cullyfitness'
});

const db = getFirestore();

function NameSelect() {

  const [clientCollection, setClientCollection] = useState([]);
  const [exerciseCollection, setExerciseCollection] = useState([]);
  const [currentIterations, setCurrentIterations] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const clientSelectOptions = clientCollection.map((client) => {
    return {
      label: `${client.firstName} ${client.lastName}`,
      value: client
    }
  });
  const history = useHistory();

  useEffect(() => {
    getCollections();
  }, [])

  useEffect(() => {
    console.log(clientCollection.length)
    console.log(exerciseCollection.length)
  }, [clientCollection, exerciseCollection, currentIterations])

  const handleSelect = (_selectedClient) => {
    setSelectedClient(_selectedClient.value);
    console.log(_selectedClient.value)
  }

  const handleSubmit = () => {
    return (
      history.push({
          pathname: '/workout',
          state: {
              client: selectedClient,
              multipliers: exerciseCollection,
              iterations: currentIterations
            }
      })
    );
  }

  return (
    <div>
    <nav>
      <Box m={5}>
        <Select options={clientSelectOptions} onChange={handleSelect} placeholder='select name'/>
        <Box m={5}>
          <Stack justifyContent="center" alignItems="center">
            <Button 
                variant='contained'
                onClick={handleSubmit}
            >
                Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </nav>
    </div>
  );

  function getCollections() {
    try {
      getDocs(collection(db, "Clients")).then((clients) => {
        const tempClients = []
        clients.forEach((doc) => {
          let newClient = new Client(doc.data().firstName, doc.data().lastName, doc.data().maxes);
          tempClients.push(newClient);
        });

        setClientCollection(tempClients);
      });

      getDocs(collection(db, "Exercises")).then((exercises) => {
        const tempExercises = [];
        exercises.forEach((doc) => {
          let newExercise = new Exercise(doc.data().DayId, doc.data().Multipliers, doc.data().Name);
          tempExercises.push(newExercise);
        });
        setExerciseCollection(tempExercises);
      });

      getDocs(collection(db, "CurrentIterations")).then((iterations) => {
        iterations.forEach((iteration) => {
          setCurrentIterations(iteration.data());
        })
      })

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export default withRouter(NameSelect);
