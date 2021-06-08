import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../style';


const YNQuestionPost = ({ content })=> {
    return (
        <View>
            <Text style={styles.text}>{content}</Text>
            <TouchableOpacity style={styles.questionButton}>
                <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.questionButton}>
                <Text>No</Text>
            </TouchableOpacity>
        </View>
    )
}

export default YNQuestionPost;
