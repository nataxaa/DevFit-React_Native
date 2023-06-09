import React, {useState} from "react";
import styled from "styled-components/native";
import useMuscleImage from "./useMuscleImage";

const Workout = styled.View`
    background-color: #f1f1f1 ;
    flex-direction:row ;
    border-radius:10px ;
    margin-bottom:20px ;
    border:2px solid #DDD ;
`
const WorkoutInfo = styled.View`
    flex:1 ;
`
const WorkoutTitle = styled.Text`
    font-size:17px ;
    margin:10px ;
`
const MuscleScroll = styled.ScrollView`
    margin:10px ;
`
const MuscleGroup = styled.View`
    width:40px ;
    height:40px ;
    background-color:#FFCC98 ;
    border-radius:5px ;
    margin-right:5px ;
    justify-content:center ;
    align-items:center ;
    z-index:0 ;
`
const MuscleImage = styled.Image`
    width:30px ;
    height:30px ;
    z-index:1 ;
`
const WorkoutActions = styled.View`
    justify-content:center ;
`
const WorkoutButton = styled.TouchableHighlight`
    width:20px ;
    height: 25px;
    margin:20px ;
    justify-content:center ;
    align-items:center ;
`
const WorkoutButtonImage = styled.Image`
    width:25px ;
    height:25px ;
`



export default (props) => {

    const [included, setIncluded] = useState(false)

    let muscleGroups = []
    for(let i in props.data.exercises){
        if(!muscleGroups.includes(props.data.exercises[i].muscle)){
            muscleGroups.push(props.data.exercises[i].muscle)
        }
    }

    const addWorkout = () =>{
        setIncluded(!included)
        props.addAction()
    }

    const editWorkout = () => {
        props.editAction()
    }

    const delWorkout = () => {
        props.delAction()
    }

    const goToWorkout = () => {
        props.goAction()
    }

    return(
        <Workout>
            <WorkoutInfo>
                <WorkoutTitle>{props.data.name}</WorkoutTitle>
                <MuscleScroll horizontal={true}>
                    {muscleGroups.map((m, index)=>(
                        <MuscleGroup key={index}>
                            <MuscleImage source={useMuscleImage(m)}/>
                        </MuscleGroup>
                    ))}
                </MuscleScroll> 
            </WorkoutInfo>

            <WorkoutActions>
                {props.addAction && 
                <WorkoutButton onPress={()=>addWorkout()} underlayColor='tranparent'>
                    <WorkoutButtonImage source={included?require('../assets/check-black.png'):require('../assets/add.png')}/>
                </WorkoutButton>
                }
                {props.editAction && 
                <WorkoutButton onPress={()=>editWorkout()} underlayColor='tranparent'>
                    <WorkoutButtonImage source={require('../assets/edit-black.png')}/>
                </WorkoutButton>
                }
                {props.delAction &&
                <WorkoutButton onPress={()=>delWorkout()} underlayColor='tranparent'>
                    <WorkoutButtonImage source={require('../assets/trash-black.png')}/>
                </WorkoutButton>
                }
                {props.goAction &&
                <WorkoutButton onPress={()=>goToWorkout()} underlayColor='tranparent'>
                    <WorkoutButtonImage source={require('../assets/play-black.png')}/>
                </WorkoutButton>
                }

            </WorkoutActions>
        </Workout>
    )
}