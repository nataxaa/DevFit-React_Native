import React from "react";
import styled from "styled-components/native";
import useMuscleImage from "./useMuscleImage";
import { SwipeRow } from "react-native-swipe-list-view";

const ExercisesItemArea = styled.TouchableHighlight`
    height: 50px;
    flex-direction:row ;
    background-color:#FFF ;
    margin-bottom:10px ;
    border-radius:10px ;
`
const ExercisesMuscleArea = styled.View`
    width:50px ;
    height:50px ;
    background-color:#FFCC98 ;
    border-radius:10px ;
    justify-content:center ;
    align-items:center ;
`
const ExercisesMuscleImage = styled.Image`
    width:25px ;
    height:25px ;
`
const ExerciseInfo = styled.View`
    flex-direction:column ;
    justify-content:center ;
    margin-left:5px ;
`
const ExerciseName = styled.Text`
    font-size:15px ;
    color:#000 ;
    font-weight:bold ;
`
const ExerciseDetails = styled.Text`
    font-size:12px ;
    color:#999 ;
`
const ExerciseSwipe = styled.TouchableHighlight`
    height:50px ;
    background-color:#FF0000 ;
    justify-content:center ;
    border-radius:10px ;
`
const ExerciseSwipeIcon = styled.Image`
    width:20px ;
    height:20px ;
    margin-left:15px ;
`

export default (props) => {
    
    return(
        <SwipeRow leftOpenValue={50} disableLeftSwipe={true}>
            <ExerciseSwipe onPress={props.delAction} underlayColor='#FF0000'>
                <ExerciseSwipeIcon source={require('../assets/trash-white.png')}/>
            </ExerciseSwipe>
        <ExercisesItemArea onPress={props.editAction} underlayColor='#FFF'>
            <>
                <ExercisesMuscleArea >
                    <ExercisesMuscleImage source={useMuscleImage(props.data.item.muscle)}/>
                </ExercisesMuscleArea>
                <ExerciseInfo>
                    <ExerciseName>{props.data.item.name}</ExerciseName>
                    <ExerciseDetails>
                        {`${props.data.item.sets} séries - ${props.data.item.reps} rep ${props.data.item.load?`- ${props.data.item.load} kg`:''}`}
                    </ExerciseDetails>
                </ExerciseInfo>

            </>
        </ExercisesItemArea>        
        </SwipeRow>

    )
}