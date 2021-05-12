import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style';

const Card = ({ content, classType }) => {

  const getStyle = () => {
   if (classType === 'info') {
    return {backgroundColor: '#f9c2ff'};
   } else if (classType === 'question') {
    return {backgroundColor: '#33c2a7'};
   } else {
    return {backgroundColor: '#9678bd'};
   }
  }

  itemStyleType = getStyle();

  // console.log();

  return (
    <View style={[itemStyleType, styles.card]}>
      <Text style={styles.text}>{content}</Text>
    </View>
  )};

export default Card;
