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
const LevelArea = styled.View`
    flex-direction:column ;
    gap:5px;
    margin-top:20px ;
    width:100% ;
`


const NextButton = styled.Button`
    

`

const Page = (props) => {
    

   const setMyLevel = (t) =>{
    props.setLevel(t)
    props.navigation.setParams({level:t})
   } 
    
    let funnyPhrase = ''
    
    switch(props.workoutDays.length){
        case 1:
            funnyPhrase = 'So 1 dia não vai da certo...'
            break
        case 2:
            funnyPhrase = 'So 2 dia não ta bom mas tambem nao ta ruim...'
            break
        case 3:
            funnyPhrase = 'So 3 ta indo por um bom caminho...'
            break
        case 4:
            funnyPhrase = '4 dias é uma boa estrategia...'
            break
        case 5:
            funnyPhrase = '5 ta virando montro, boa!!!'
            break
        case 6:
            funnyPhrase = '6 dias ta virando rato de academia!!!'
            break
        case 7:
            funnyPhrase = 'Virou o Arnold!!!'
            break
    }
    console.log(funnyPhrase)

    return (
        <Container>
            <HeaderArea>
                <HeaderText>{funnyPhrase}</HeaderText>
                <HeaderText>Qual seu nível hoje ?</HeaderText>
            </HeaderArea>

            <LevelArea>
                <DefaultButton bgColor={props.level=='begginer'?'#A5E8BC':false} onPress={()=>setMyLevel('begginer')}  underlayColor={'#333'}>
                    <Text>iniciante / Frango</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.level=='intermediate'?'#A5E8BC':false} onPress={()=>setMyLevel('intermediate')}  underlayColor={'#333'}>
                    <Text>Intermediário / Me viro bem</Text>
                </DefaultButton>
                <DefaultButton bgColor={props.level=='advanced'?'#A5E8BC':false} onPress={()=>setMyLevel('advanced')}  underlayColor={'#333'}>
                    <Text>Avançado / Primo do The Rock</Text>
                </DefaultButton >
            </LevelArea>
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.workoutDays.lenght){
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
        level: state.userReducer.level,
        workoutDays: state.userReducer.workoutDays
    }
}

const mapDispatchProps = (dispatch) => {
    return{
       setLevel:(level)=>dispatch({type: "SET_LEVEL", payload:{level}})
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)