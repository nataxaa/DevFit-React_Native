import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';
import { Text } from 'react-native';

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
const NameInput = styled.TextInput`
    border:1px solid  #CCC;
    width: 90% ;
    height: 50px ;
    border-radius: 10px ;
    font-size: 16px ;
    padding: 10px ;
`
const HeaderArea = styled.View`
    margin-top:20px ;
    align-items:center ;
`
const BoldText = styled.Text`
    font-weight:bold ;
`
const DaysArea = styled.View`
    flex-direction:row ;
    flex-wrap:wrap ;
    justify-content:space-between;
    gap:5px;
    margin-top:20px ;
`


const NextButton = styled.Button`
    

`

const Page = (props) => {
    
    const toogleDay = (d) => {
        let newWorkoutDays = [...props.workoutDays]
        if(!props.workoutDays.includes(d)){
           newWorkoutDays.push(d)
        }else{
            newWorkoutDays = newWorkoutDays.filter(propsa=>propsa!=d)
        }
        props.setWorkoutDays(newWorkoutDays)
        props.navigation.setParams({workoutDays: newWorkoutDays})
    }
    
    
    let firsName = props.name.split(' ')[0]

    console.log(props.workoutDays)


    return (
        <Container>
            <HeaderArea>
                <HeaderText>Opa <BoldText>{firsName}</BoldText>, tudo bem ? </HeaderText>
                <HeaderText>Quais <BoldText>dias da semana</BoldText> você pretende treinar ?</HeaderText>
            </HeaderArea>

            <DaysArea>
                <DefaultButton bgColor={props.workoutDays.includes(1)?'#A5E8BC':false} onPress={()=>toogleDay(1)} width={100} underlayColor={'#333'}>
                    <Text>Segunda</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.workoutDays.includes(2)?'#A5E8BC':false} onPress={()=>toogleDay(2)} width={100} underlayColor={'#333'}>
                    <Text>Terça</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.workoutDays.includes(3)?'#A5E8BC':false} onPress={()=>toogleDay(3)} width={100} underlayColor={'#333'}>
                    <Text>Quarta</Text>
                </DefaultButton >
                <DefaultButton bgColor={props.workoutDays.includes(4)?'#A5E8BC':false} onPress={()=>toogleDay(4)} width={100} underlayColor={'#333'}>
                    <Text>Quinta</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.workoutDays.includes(5)?'#A5E8BC':false} onPress={()=>toogleDay(5)} width={100} underlayColor={'#333'}>
                    <Text>Sexta</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.workoutDays.includes(6)?'#A5E8BC':false} onPress={()=>toogleDay(6)} width={100} underlayColor={'#333'}>
                    <Text>Sábado</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.workoutDays.includes(0)?'#A5E8BC':false} onPress={()=>toogleDay(0)} width={100} underlayColor={'#333'}>
                    <Text>Domingo</Text>
                </DefaultButton>
            </DaysArea>
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    const nextAction = () => {
        if(navigation.state.params?.workoutDays.length == 0 || navigation.state.params?.workoutDays == undefined){
            alert("Você precisa treinar pelo menos 1 dia!")
            return
        }
            navigation.navigate('StarterNivel')
    }
    return{
        title: '',
        headerRight: <NextButton title='Proximo' onPress={nextAction}/>,
        headerRightContainerStyle:{
            marginRight: 20,
        },
    }
}
const mapStateToProps = (state) => {
    return{
        name: state.userReducer.name,
        workoutDays: state.userReducer.workoutDays
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        setName: (name)=>dispatch({type:"SET_NAME", payload:{name}}),
        setWorkoutDays:(workoutDays)=>dispatch({type: "SET_WORKOUTDAYS", payload:{workoutDays}})
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)