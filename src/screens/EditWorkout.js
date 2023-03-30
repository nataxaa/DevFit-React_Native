import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Workout from '../components/Workout'
import DefaultButton from '../components/DefaultButton'
import ExercisesItemEdit from '../components/ExercisesItemEdit';
import CustomModal from '../components/CustomModal';
import { Modal } from 'react-native-web';
import uuid from 'react-native-uuid'

const Container = styled.SafeAreaView`
    flex:1;
    padding-inline:20px;
`
const NameInput = styled.TextInput`
    border:1px solid  #CCC;
    width:100% ;
    height:50px ;
    border-radius:10px ;
    font-size:16px ;
    padding:10px ;
    margin-top:20px ;
`
const ButtonText = styled.Text`
    color:#FFF ;
`

const ExercisesArea = styled.View`
    flex:1 ;
    margin-top:20px ;
    padding-top:20px ;
    border-top-width:1px ;
    border-top-color: #CCC;
`
const ExercisesList = styled.FlatList`
    flex:1 ;
    padding-top:20px ;
`
const ModalLabel = styled.Text`
    font-size:15px ;
    font-weight:bold ;
    margin-top:10px ;
`
const ModalMuscles = styled.ScrollView`

`
const ModalInput = styled.TextInput`
    width:100% ;
    font-size:14px ;
    color:#3d3d3d ;
    height:40px ;
    border-bottom-width:1px ;
    border-bottom-color:#CCC ;
    padding:5px ;
`
const ModalMuscle = styled.TouchableHighlight`
    width:50px ;
    height:50px ;
    background-color:#EEE ;
    border-radius:10px ;
    justify-content:center ;
    align-items:center ;
    margin-right:10px ;
    opacity:${props=>props.opacity} ;
    
`
const ModalMuscleImage = styled.Image`
    width:35px ;
    height:35px ;
`
const ModalExtra = styled.View`
   
   flex-direction:row ;
   justify-content:space-between ;
   width:100% ;
   margin-top:10px ;
   margin-bottom:30px ;
`
const ModalExtraItem = styled.View`
    align-items:center ;
    width:50px ;
`


const Page = (props) => {
    let workout = (props.navigation.state.params && 
                   props.navigation.state.params.workout)?
                   props.navigation.state.params.workout:false;
    const [id, setId] = useState(workout?workout.id:'')
    const [name, setName] = useState(workout?workout.name: '')
    const [exercises, setExercises] = useState(workout?workout.exercises:[])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalId, setModalId] = useState('')
    const [modalName, setModalName] = useState('')
    const [modalMuscle, setModalMuscle] = useState('')
    const [modalSets, setModalSets] = useState('')
    const [modalReps, setModalReps] = useState('')
    const [modalLoad, setModalLoad] = useState('')

    useEffect(()=>{
        props.navigation.setParams({
            workout:{id, name, exercises},
            addWorkout:props.addWorkout,
            editWorkout:props.editWorkout
        })
    }, [name, exercises])

    const editExercise = (exercise) => {
        setModalId(exercise.item.id)
        setModalName(exercise.item.name)
        setModalMuscle(exercise.item.muscle)
        setModalSets(exercise.item.sets)
        setModalReps(exercise.item.reps)
        setModalLoad(exercise.item.load)
        setModalVisible(true)
    }

    const delExercise = (exercise) => {
        let newExercises = [...exercises]
        newExercises = newExercises.filter(i=>i.id!=exercise.item.id)
        setExercises(newExercises)
    }

    const modalSave = () => {
        let newExercises = [...exercises]

        if(modalName== '' || modalMuscle== '' || modalSets == '' || modalReps == '' ){
            alert("Preencha todas as informações")
            return
        }
        if(modalId){
            let index = newExercises.findIndex(i=>i.id == modalId)
            console.log(1)
            if(index > -1){
                console.log('1')
                newExercises[index].name = modalName
                newExercises[index].muscle = modalMuscle
                newExercises[index].sets = modalSets
                newExercises[index].reps = modalReps
                newExercises[index].load = modalLoad
            }
            }else{
                console.log('2')
                let ex = {
                    id:uuid.v4(),
                    name:modalName,
                    muscle:modalMuscle,
                    sets:modalSets,
                    load:modalLoad
                }
                newExercises.push(ex)
            }
        setExercises(newExercises)
        setModalVisible(false)
    }

    const resetModal = () => {
        setModalId('')
        setModalName('')
        setModalMuscle('')
        setModalSets('')
        setModalReps('')
        setModalLoad('')
    }

    const addExercise = () => {
        resetModal()
        setModalVisible(true)
    }

    return (
        <Container>
            <CustomModal visible={modalVisible} closedAction={()=>setModalVisible(false)}>
                <ModalLabel>Musculo fraco</ModalLabel>
                <ModalMuscles horizontal={true} showsHorizontalScrollIndicator={false}>
                    <ModalMuscle 
                        opacity={modalMuscle=='abs'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('abs')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/abs.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='back'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('back')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/back.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='biceps'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('biceps')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/biceps.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='chest'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('chest')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/chest.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='gluteos'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('gluteos')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/gluteos.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='legs'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('legs')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/legs.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='shoulders'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('shoulders')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/shoulders.png')}/>
                    </ModalMuscle>
                    <ModalMuscle 
                        opacity={modalMuscle=='triceps'? 1 : 0.3} 
                        onPress={()=>setModalMuscle('triceps')} 
                        underlayColor='transparent'
                    >
                        <ModalMuscleImage source={require('../assets/muscles/triceps.png')}/>
                    </ModalMuscle>
                </ModalMuscles>

                    
                    <ModalLabel>Nome do Exercício</ModalLabel>
                    <ModalInput value={modalName} onChangeText={e=>setModalName(e)}/>
                    
                <ModalExtra>
                    <ModalExtraItem>
                        <ModalLabel>Séries</ModalLabel>
                        <ModalInput keyboardType='numeric' value={modalSets} onChangeText={e=>setModalSets(e)}/>
                    </ModalExtraItem>
                    
                    <ModalExtraItem>
                        <ModalLabel>Repetições</ModalLabel>
                        <ModalInput keyboardType='numeric' value={modalReps} onChangeText={e=>setModalReps(e)}/>
                    </ModalExtraItem>  

                    <ModalExtraItem>
                        <ModalLabel>Carga</ModalLabel>
                        <ModalInput keyboardType='numeric' value={modalLoad} onChangeText={e=>setModalLoad(e)}/>
                    </ModalExtraItem>
                </ModalExtra>
                <DefaultButton onPress={modalSave} bgColor={'#4AC34E'}>
                    <ButtonText>Salvar</ButtonText>
                </DefaultButton>

            </CustomModal>
            <NameInput 
                value={name}
                onChangeText={e=>setName(e)}
                placeholder={'Digite o nome do treino.'}
            />
            <ExercisesArea>
                <DefaultButton onPress={addExercise} bgColor={'#4AC34E'} underlayColor='transparent'>
                    <ButtonText>Adicionar Exercicio</ButtonText>
                </DefaultButton>

                <ExercisesList
                    data={exercises}
                    renderItem={(item)=>
                        <ExercisesItemEdit 
                            data={item} 
                            editAction={()=>editExercise(item)}
                            delAction={()=>delExercise(item)}
                        />
                    }
                    keyExtractor={item=>item.name}
                />

            </ExercisesArea>
        </Container>
    );
}
Page.navigationOptions = ({navigation}) => {
    let isEdit = (navigation.state.params && navigation.state.params.workout.id)?true:false

    const SaveArea = styled.TouchableHighlight`
        width: 30px ;
        height:30px ;
        justify-content:center ;
        align-items:center ;
    `
    const SaveImage = styled.Image`
        width:25px ;
        height:25px ;
    `

    const SaveWorkoutButtom = () => {

        const handleSave = () => {
            if(navigation.state.params && navigation.state.params.workout){
                let workout = navigation.state.params.workout
                if(workout.id != ''){
                    navigation.state.params.editWorkout(workout)
                }else{
                    workout.id = uuid.v4()
                    navigation.state.params.addWorkout(workout)
                }
                navigation.goBack()
            }else{
                alert("Você precisa ter pelo menos 1 exercício")
            }
        }

        return(
            <SaveArea onPress={handleSave}>
                <SaveImage source={require('../assets/check-black.png')}/>
            </SaveArea>
        )
    }

    return{
        title:isEdit?'Editar Treino':'Adicionar Treino',
        headerRight: <SaveWorkoutButtom />,
        headerRightContainerStyle:{
            marginRight:10
        }
    }
}
const mapStateToProps = (state) => {
    return{
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        addWorkout:(workout)=>dispatch({type:'ADD_WORKOUT', payload:{workout}}),
        editWorkout:(workout)=>dispatch({type:'EDIT_WORKOUT', payload:{workout}})
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Page)