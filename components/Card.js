import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style';

const Card = ({ title, itemType }) => {
  switch (itemType){
    case "info":
      itemStyle = styles.info;
    case "funny-post":
      itemStyle = styles.funny;
  }

  return (
    <View style={itemStyle}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )};

export default Card;