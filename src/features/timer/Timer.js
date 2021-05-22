import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { color } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import {ProgressBar} from 'react-native-paper';
import {Timing} from './Timing';
import {useKeepAwake} from 'expo-keep-awake';
const DEFAULT_TIME = 0.1;

export default function App(){
  useKeepAwake();
}

export const Timer = ({ focusSubject,onTimerEnd,clearSubject }) => {
  const [minutes,setMinutes]=useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress,setProgress]=useState(100);
  
  const onProgress=(progress)=>
  {
    setProgress(progress)
  }
  
  const onEnd=()=>{
    vibrate();
    setMinutes(DEFAULT_TIME)
    setProgress(1)
    setIsStarted(false)
    onTimerEnd();
  }

  const changeTime=(min)=>{
    setMinutes(min)
    setProgress(1)
    setIsStarted(false)
  
  }

  const vibrate=()=>{
    if(Platform.OS==='ios')
    {
      const interval=setInterval(()=>Vibration.vibrate,(1000));
      setTimeout(()=>clearInterval(interval,10000));
    }
    else{
      Vibration.vibrate(500);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown 
        onEnd={onEnd}
        minutes={minutes} 
        isPaused={!isStarted} 
        onProgress={onProgress}/>
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing On : </Text>
        <Text style={styles.task}> {focusSubject}</Text>
      </View>

      <ProgressBar 
        color='#5e84e2'
        progress={progress}
        style={{height:10,marginTop:spacing.sm}}
      />
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime}/>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: color.white,
    textAlign: 'center',
  },
  task: {
    color: color.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper:{
    flex:0.3,
    flexDirection:"row",
    padding:15,
    alignItems:'center',
    justifyContent:'center'
  },
  clearSubject:{
    paddingLeft:25,
    paddingBottom:25
  }
});
