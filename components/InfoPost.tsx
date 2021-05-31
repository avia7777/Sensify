import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style';


const InfoPost = ({ content })=> {
    return (
        <View>
            <Text style={styles.text} >{content}</Text>
        </View>
    )
}

export default InfoPost;
