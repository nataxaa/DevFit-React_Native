import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';


const DaysScroll = styled.ScrollView`
    width:100%;
    height:50px;
`;


const DayButton = styled.TouchableHighlight`
    width:${props=>props.width} ;
    justify-content:center ;
    align-items:center ;
`
const DayItem = styled.View`
    width:30px ;
    height:30px ;
    border-radius:15px ;
    background-color: ${props=>props.bgColor};
    justify-content:center ;
    align-items:center ;
    opacity:${props=>props.opacity} ;
`

const DayText = styled.Text``


const screenWidth = Math.round(Dimensions.get('window').width);
let dayW = Math.round(screenWidth / 9);
let offsetW = Math.round((screenWidth - dayW)/2)

const Day = (props) => {
    let bgColor = '#d3d3d3';
    let opacity = 1;

    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    let thisDate = new Date(today.getFullYear(), props.month, props.day)
    
    if(props.workoutDays.includes(thisDate.getDay())){

        if(thisDate.getTime()<today.getTime()){
            let thisYear = thisDate.getFullYear()
            let thisMonth = thisDate.getMonth()+1;
            let thisDay = thisDate.getDate()
            thisMonth = (thisMonth<10)?'0'+thisMonth:thisMonth
            thisDay = (thisDay<10)?'0'+thisDay:thisDay
            let dFormated = `${thisYear}-${thisMonth}-${thisDay}`
            if(props.dailyProgress.includes(dFormated)){
                bgColor = '#B5FFB8' // treinou
            }else{
                bgColor = '#FFB5B5' // não treinou
            }
        }

    }else{
        opacity=0.2;
    }

    if(thisDate.getTime()==today.getTime()){
        bgColor = '#B5EEFF';
        opacity = 1 ;
    }

    return(
        <DayButton onPress={props.onPress} width={dayW} underlayColor='transparent'>
            <DayItem opacity={opacity} bgColor={bgColor}>
                <DayText>{props.day}</DayText>
            </DayItem>
        </DayButton>
    )
}

export default (props) => {
    const DayRef = useRef();

    const [selectedDay, setSelectedDay] = useState(props.selectedDay);

    const scrollToDay = (d) => {
        let posX = (d - 1) * dayW;
        DayRef.current.scrollTo({x:posX, y: 0, animated: true});
        let targetDay = Math.round(posX / dayW) + 1;
        setSelectedDay(targetDay);
    }

    const daysScrollEndAction = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetDay = Math.round(posX / dayW) + 1;
        setSelectedDay(targetDay);
        
    };

    let days = [];
    let daysInMonth = new Date(new Date().getFullYear(), (props.selectedMonth+1), 0).getDate();
    for(let i=1;i<=daysInMonth;i++) {
        days.push(i);
    }

    useEffect(()=>{
        props.setSelectedDay(selectedDay);
    }, [selectedDay]);

    useEffect(()=>{
        setTimeout(()=>{
            if(props.selectedMonth == new Date().getMonth()) {
                scrollToDay(new Date().getDate());
            } else {
                scrollToDay(1);
            }
        }, 10);
    }, [props.selectedMonth]);
    return (
        <DaysScroll
            ref={DayRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={dayW}
            contentContainerStyle={{paddingLeft:offsetW, paddingRight:offsetW}}
            onMomentumScrollEnd={daysScrollEndAction}
            
        >
            {days.map((d,k)=>(
                <Day
                    key={k}
                    day={d}
                    month={props.selectedMonth}
                    dailyProgress={props.dailyProgress}
                    workoutDays={props.workoutDays}
                    onPress={()=>scrollToDay(d)}
                    underlayColor='transparent'
                />
            ))}
        </DaysScroll>
    );
};