import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Exercise from '../../Models/Exercise';
import ExerciseInfo from '../../Models/ExerciseInfo';
import ExerciseCard  from '../ExerciseCard/ExerciseCard';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './Workout.css';

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBoQT4L3shuLfXGgQeQKR6jv2V0zA-Xnk0',
    authDomain: 'cullyfitness.firebaseapp.com',
    projectId: 'cullyfitness'
  });

const db = getFirestore();
export default function Workout(props) {

    const [client, setClient] = useState(JSON.parse(localStorage.getItem("selectedClient")));
    const [multipliers, setMultipliers] = useState([]);
    const [iterations, setIterations] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [dayId, setDayId] = useState(100);

    useEffect(() => {

        var isComponentMounted = true;

        if (!client) {
            return;
        }

        getDocs(collection(db, "Exercises")).then((exercises) => {
            const tempExercises = [];
            exercises.forEach((doc) => {
              let newExercise = new Exercise(doc.data().DayId, doc.data().Multipliers, doc.data().Name);
              tempExercises.push(newExercise);
            });

            if (isComponentMounted) {
                setMultipliers(tempExercises);
            }
          });
    
          getDocs(collection(db, "CurrentIterations")).then((iterations) => {
            iterations.forEach((iteration) => {

                if (isComponentMounted) {
                    setIterations(iteration.data());
                }
            })
          })

          return function cleanup() {
            isComponentMounted = false;
          }

    }, [client]);

    useEffect(() => {

        var isComponentMounted = true;

        let block = iterations.Block;
        let week = iterations.Week;
        let date = new Date();
        let day = date.getDay();
        let exerciseList = [];
        let dailyMultiplierList = [];

        if (!block || !client) {
            return;
        }

        multipliers.forEach((multiplier) => {
            let convertedDay = 0;
            if (dayId === 100) {
                convertedDay = convertDay(day);
            }
            else convertedDay = dayId;
            if (multiplier.DayId === convertedDay) {
                dailyMultiplierList.push(multiplier);
            }            
        })

        dailyMultiplierList.forEach((multiplier) => {
            let name = multiplier.Name;
            let sets = multiplier.Multipliers[block-1].Weeks[week-1].Sets;
            let reps = multiplier.Multipliers[block-1].Weeks[week-1].Reps;
            let weightMultiplier = multiplier.Multipliers[block-1].Weeks[week-1].Multiplier;

            let max = client.maxes.find((max) => max.name === name).weight;
            let weight = Math.round(weightMultiplier * max);

            let newExercise = new ExerciseInfo(name, sets, reps, weight, max, weightMultiplier);

            exerciseList.push(newExercise);
        })

        if (isComponentMounted) {
            setExercises(exerciseList);
        }

        return function cleanup() {
            isComponentMounted = false;
        }

    }, [client, multipliers, iterations, dayId]);

    const exerciseCards = exercises.map((exercise) =>
        <ExerciseCard name={exercise.name} sets={exercise.sets} reps={exercise.reps} weight={exercise.weight} max={exercise.max} multiplier={exercise.multiplier}/>
    );

    if (client == null) {
        return <Redirect to=".." />
    }

    return (
        <Box className="WorkoutPageContainer" mt={5}>
            <Box>
                Welcome, {client.fullName}
                <Button onClick={() => setClient(null)}>change user</Button>
            </Box>
            <Box ml={1}>
                <Typography variant="h5">
                    Block: {iterations.Block}, Week: {iterations.Week}
                </Typography>
            </Box>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" flex="1" className="DayButtonStack">
                <Button 
                    variant='contained'
                    onClick={setButton1}
                    className="DayButton"
                >
                    Day 1
                </Button>
                <Button 
                    variant='contained'
                    onClick={setButton2}
                    className="DayButton"
                >
                    Day 2
                </Button>
            </Stack>
            {exerciseCards}
        </Box>
    );

    function setButton1() {
        setDayId(1);
    }

    function setButton2() {
        setDayId(2);
    }

    function convertDay(dayNum) {
        switch(dayNum) {
            case 0:
                return 1;
            case 1:
                return 1;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 2;
            case 5:
                return 2;
            case 6:
                return 2;
            default:
                break;
        }
    }
}