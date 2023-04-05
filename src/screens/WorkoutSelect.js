import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Workout from '../components/Workout'
import { HeaderBackButton } from 'react-navigation-stack';
import { StackActions,NavigationActions } from 'react-navigation';

const Container = styled.SafeAreaView`
    flex:1;
    margin:20px ;
`
const WorkoutList = styled.FlatList`
    flex:1 ;
    
`
const Title = styled.Text`
    margin-bottom:20px ;
    font-size:20px ;
    font-weight:bold ;
`

const Page = (props) => {
    let lastWorkout = false
    if(props.lastWorkout){
        lastWorkout = props.myWorkouts.find(i=>i.id == props.lastWorkout)
    }

    const goWorkout = (workout) => {
        props.navigation.navigate('WorkoutChecklist', {workout})
    }
    
    return (
        <Container>
            {lastWorkout && 
                <>
                    <Title>Seu ultimo treino foi: </Title>
                    <Workout data={lastWorkout}/>
                </>
            }

            <Title>Escolha seu treino de hoje:</Title>

            <WorkoutList 
                data={props.myWorkouts}
                renderItem={({item})=>
                    <Workout
                        data={item}
                        goAction={()=>goWorkout(item)}
                    />
                }
            />
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    
    const handleBackAction = () => {
        navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'AppTab'})
            ]
        }))
    }

    return{
        title: 'Escolha seu Treino',
        headerLeft:<HeaderBackButton onPress={handleBackAction}/>
    }
}
const mapStateToProps = (state) => {
    return{
        myWorkouts:state.userReducer.myWorkouts
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        delWorkout:(workout)=>dispatch({type:'DEL_WORKOUT', payload:{workout}})
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)