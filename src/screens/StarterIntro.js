import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center ;
    align-items:center ;
    background-color:#FFF ;
`
const WelcomeText = styled.Text`
    font-size:22px ;
    color: #333;
    margin-top:20px ;
    font-weight:bold ;
`
const WelcomeImage = styled.View`
    flex:1 ;
    justify-content:center;
`
const WelcomeLogo = styled.Image`
width:200px ;
height:200px ;

`
const BeginConfigArea = styled.View`
    margin-bottom:20px ;
`
const ButtonText = styled.Text`
color: #FFF;
`

const Page = (props) => {
    const start = () => {
        props.navigation.navigate('StarterName')
    }
    return (
        <Container>
            <WelcomeText>Bem vindo(a) ao DevFit</WelcomeText>
            <WelcomeImage>
                <WelcomeLogo source={require('../assets/boneco.png')}/>
            </WelcomeImage>
            <BeginConfigArea>
                <DefaultButton width={'200px'} bgColor={'#0072C0'} underlayColor='0B7AC6' onPress={start}>
                    <ButtonText>Iniciar Cadastro</ButtonText>
                </DefaultButton>
            </BeginConfigArea>
        </Container>
    );
}
Page.navigationOptions = {
    header:null,
}

export default Page;