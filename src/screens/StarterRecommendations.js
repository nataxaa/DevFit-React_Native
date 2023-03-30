import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';
import workoutJson from '../presetWorkouts.json'
import Workout from '../components/Workout';
import {StackActions, NavigationActions} from 'react-navigation'


const Container = styled.SafeAreaView`
    flex:1;
    align-items:center ;
    background-color:#FFF ;
    padding: 0 30px ;
    
    
`
const HeaderText = styled.Text`
    font-size:20px ;
    color: #333;
    margin-bottom:10px ;
    text-align:center ;
    
`
const HeaderArea = styled.View`
    margin-top:20px ;
    align-items:center ;
`
const WorkoutList = styled.FlatList`
    width:100% ;
`
const Text = styled.Text`

`
const NextButton = styled.Button`
    
`

const Page = (props) => {
    
    useEffect(()=>{
        props.navigation.setParams({myWorkouts:props.myWorkouts})
    }, [props.myWorkouts])
   
    const addWorkout = (item) =>{
        if(props.myWorkouts.findIndex(i=>i.id==item.id)<0){
            props.addWorkout(item)
        }else{
            props.delWorkout(item)
        }   
    }

    
    return (
        <Container>
            <HeaderArea>
                <HeaderText>Opções de treinos pré-criados com base no seu nível</HeaderText>
                <HeaderText>Você selecionou {props.myWorkouts.length} treinos</HeaderText>
            </HeaderArea>
            <WorkoutList
                data={workoutJson}
                renderItem={({item})=><Workout 
                    data={item}
                    addAction={()=>addWorkout(item)}
                />}
                keyExtractor={item=>item.id}
            />
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    let btnNext = 'Ignorar'
    if(navigation.state.params && navigation.state.params?.myWorkouts.length > 0){
        btnNext = 'Concluir'
    }
    const nextAction = () => {
        navigation.dispatch(StackActions.reset({
            index: 0,
            actions:[NavigationActions.navigate({routeName:'AppTab'})]
        }))
    }
    return{
        title: '',
        headerRight: <NextButton title={btnNext} onPress={nextAction}/>,
        headerRightContainerStyle:{
            marginRight: 20,
        },
    }
}
const mapStateToProps = (state) => {
    return{
        myWorkouts: state.userReducer.myWorkouts
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        addWorkout:(workout)=>dispatch({type: "ADD_WORKOUT", payload:{workout}}),
        delWorkout:(workout)=>dispatch({type: "DEL_WORKOUT", payload:{workout}}),
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)