import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Workout from '../components/Workout'

const Container = styled.SafeAreaView`
    flex:1;
`
const WorkoutList = styled.FlatList`
    flex:1 ;
    padding:20px ;
`

const Page = (props) => {

    const editWorkout = (workout) =>{
        props.navigation.navigate('EditWorkout',{workout})
    }
    
    return (
        <Container>
            <WorkoutList 
                data={props.myWorkouts}
                renderItem={({item})=>
                    <Workout
                        data={item}
                        editAction={()=>editWorkout(item)}
                        delAction={()=>props.delWorkout(item)}
                    />
                }
            />
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    
    const ButtonArea = styled.TouchableHighlight`
        width:30px ;
        height:30px ;
        justify-content:center ;
        align-items:center ;
    `
    const ButtonImage = styled.Image`
        width:25px ;
        height:25px ;
    `

    const AddWorkoutButtom = ({onPress}) => {
        return(
            <ButtonArea onPress={onPress} underlayColor='transparent'>
                <ButtonImage source={require('../assets/add.png')}/>
            </ButtonArea>
        )
    }

    const btnAction = () => {
        navigation.navigate('EditWorkout')
    }

    return{
        title: 'Meus Treinos',
        headerRight:<AddWorkoutButtom onPress={btnAction} underlayColor='transparent'/>,
        headerRightContainerStyle:{
            marginRight:10
        }
    }
}
const mapStateToProps = (state) => {
    return{
        name:state.userReducer.name,
        myWorkouts:state.userReducer.myWorkouts
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        delWorkout:(workout)=>dispatch({type:'DEL_WORKOUT', payload:{workout}})
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)