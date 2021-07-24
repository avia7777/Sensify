import React from 'react';
import { Image, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../style';

function PostBottom() {
    return (
        <View style={styles.postBottom}>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.imageTextButton}>
                    {/* <Image
                        style={styles.tinyLogo}
                        source={require('../assets/like.png')}
                    /> */}
                    <Text style={[styles.text, {fontWeight: 'bold'}]}>Like</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.imageTextButton}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/comment.png')}
                    />
                    <Text style={[styles.text, {fontWeight: 'bold'}]}>Comment</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.imageTextButton}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/share.png')}
                    />
                    <Text style={[styles.text, {fontWeight: 'bold'}]}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PostBottom;

