import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { color } from '../utils/colors';

const minutestoMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ 
  minutes = 0.1, 
  isPaused,
  onProgress,
  onEnd
  }) => {
const interval = React.useRef(null);
const [millis, setMillis] = useState(minutestoMillis(null));

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current)
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      
      return timeLeft;
    })
  }
  useEffect(()=>{
    setMillis(minutestoMillis(minutes))
  },[minutes])

  useEffect(()=>{
    onProgress(millis/minutestoMillis(minute))
    if(millis===0){
  
    }
  },[millis])

  

  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return ()=> clearInterval(interval.current);
    },[isPaused]);

  
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: fontSizes.xxxl,
    padding: spacing.md,
    backgroundColor: 'rgba(94,132,224,0.3)',
  },
});
