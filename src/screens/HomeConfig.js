import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { StackActions, NavigationActions } from 'react-navigation';


const Container = styled.SafeAreaView`
    flex:1;
    background-color:#FFF ;
    padding: 0 30px ;
`
const Label = styled.Text`
    font-size:15px ;
    font-weight:bold ;
    margin-bottom:10px ;
    margin-top:20px ;
`
const Input = styled.TextInput`
    border:1px solid #CCC ;
    width:100% ;
    height:50px ;
    border-radius:10px ;
    padding:6px ;
`
const ListArea = styled.View`
    flex-direction: row;
    justify-content:space-between ;
    
`
const DayItem = styled.TouchableHighlight`
    width:30px ;
    height: 30px;
    border-radius:5px ;
    background-color:#EEE ;
    justify-content:center ;
    align-items:center ;
`
const DayItemText = styled.Text`

`
const LevelItem = styled.TouchableHighlight`
    background-color:#EEE ;
    height:30px ;
    border-radius:5px ;
    justify-content:center ;
    align-items:center ;
    padding:10px ;
`
const LevelItemText = styled.Text``

const ResetButton = styled.Button``

const Page = (props) => {

    const toogleWorkoutDay = (d) => {
        let newWorkoutDays = [...props.workoutDays]
        if(newWorkoutDays.includes(d)){
            if(newWorkoutDays.length == 1){
                alert("Calma ai, você precisa treinar pelo menos 1 dia.")
                return
            }
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d)
        }else{
            newWorkoutDays.push(d)
        }
        props.setWorkoutDays(newWorkoutDays)
    }

    const resetAction = () => {
        props.reset()
        const resetAction = StackActions.reset({
            index: 0,
            actions:[
                NavigationActions.navigate({routeName:'StarterStack'})
            ]
        })
        props.navigation.dispatch(resetAction)
    }
    
    return (
        <Container>
            <Label>Seu Nome Completo:</Label>
            <Input value={props.name} onChangeText={e=>props.setName(e)}/>
            <Label>Dias em que você treina:</Label>
            <ListArea>
                <DayItem onPress={()=>toogleWorkoutDay(1)} style={props.workoutDays.includes(1)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toogleWorkoutDay(2)} style={props.workoutDays.includes(2)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toogleWorkoutDay(3)} style={props.workoutDays.includes(3)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toogleWorkoutDay(4)} style={props.workoutDays.includes(4)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toogleWorkoutDay(5)} style={props.workoutDays.includes(5)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toogleWorkoutDay(6)} style={props.workoutDays.includes(6)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem onPress={()=>toogleWorkoutDay(0)} style={props.workoutDays.includes(0)?{backgroundColor:'#A5E8BC'}:{}}>
                    <DayItemText>D</DayItemText>
                </DayItem>
            </ListArea>

            <Label>Seu Nível:</Label>
            <ListArea>
                <LevelItem onPress={()=>props.setLevel('begginer')} style={props.level=='begginer'?{backgroundColor:'#A5E8BC'}:{}} underlayColor='transparent'>
                    <LevelItemText>Iniciante</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('intermediate')} style={props.level=='intermediate'?{backgroundColor:'#A5E8BC'}:{}} underlayColor='transparent'>
                    <LevelItemText>Intermediário</LevelItemText>
                </LevelItem>
                <LevelItem onPress={()=>props.setLevel('advanced')} style={props.level=='advanced'?{backgroundColor:'#A5E8BC'}:{}} underlayColor='transparent'>
                    <LevelItemText>Avançado</LevelItemText>
                </LevelItem>
            </ListArea>
            <Label>Resetar tudo ?</Label>
            <ResetButton title='Resetar Tudo' onPress={resetAction}/>
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    const nextAction = () => {
        
    }
    return{
        title: 'Configuraçôes',
        
    }
}
const mapStateToProps = (state) => {
    return{
        name:state.userReducer.name,
        workoutDays:state.userReducer.workoutDays,
        level:state.userReducer.level
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}}),
        setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}}),
        reset:()=>dispatch({type:'RESET'})
        
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)