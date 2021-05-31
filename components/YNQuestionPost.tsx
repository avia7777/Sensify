import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../style';


const YNQuestionPost = ({ content })=> {
    return (
        <View>
            <Text style={styles.text}>{content}</Text>
            <TouchableOpacity style={styles.button}>
                <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>No</Text>
            </TouchableOpacity>
        </View>
    )
}

export default YNQuestionPost;
