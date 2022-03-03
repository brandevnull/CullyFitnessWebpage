import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Client from '../../Models/Client';
import {
  useHistory,
  withRouter
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Select from 'react-select'
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBoQT4L3shuLfXGgQeQKR6jv2V0zA-Xnk0',
  authDomain: 'cullyfitness.firebaseapp.com',
  projectId: 'cullyfitness'
});

const db = getFirestore();

function NameSelect() {

  const [clientCollection, setClientCollection] = useState([]);
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
  }, [clientCollection])

  const handleSelect = (_selectedClient) => {
    setSelectedClient(_selectedClient.value);
    console.log(_selectedClient.value)
  }

  const handleSubmit = () => {

    localStorage.setItem("selectedClient", JSON.stringify(selectedClient))

    return (
      history.push({
          pathname: '/workout',
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

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export default withRouter(NameSelect);
