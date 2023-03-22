import React from 'react';
import { Text } from 'react-native';
import { HeaderBackground } from 'react-navigation-stack';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center ;
    background-color:#FFF ;
`
const HeaderText = styled.Text`
    font-size:20px ;
    color: #333;
    margin-top:50px ;
    margin-bottom:20px ;
`
const NameInput = styled.TextInput`
    border:1px solid  #CCC;
    width: 90% ;
    height: 50px ;
    border-radius: 10px ;
    font-size: 16px ;
    padding: 10px ;
`
const NextButton = styled.Button`
margin-right:50px ;

`

const Page = (props) => {
    const NextAction = () => {
        if(!props.name){
            alert("Você precisa de um nome!")
            return
        }else{
            props.navigation.navigate('StarterDias')
        }
    }

    const handleChangeName = (t) => {
        props.setName(t)
        props.navigation.setParams({name:t})
    }
    return (
        <Container>
           <HeaderText>Qual é o seu nome ?</HeaderText>
           <NameInput
            value={props.name}
            onChangeText={handleChangeName}
            autoFocus={true}
            autoCapitalize='words'
            onSubmitEditing={NextAction}
           />
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.name){
            alert("Você precisa de um nome!")
        }else{
            navigation.navigate('StarterDias')
        }
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
        name: state.userReducer.name 
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        setName: (name)=>dispatch({type:"SET_NAME", payload:{name}})
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)