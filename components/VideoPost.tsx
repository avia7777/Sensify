import React from 'react';
import { View, Text } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

const videoPost = ({ content })=> {
    return (
        <View>
            <YoutubePlayer
                height={200}
                play={false}
                videoId={content}
            />
        </View>
    )
}

export default videoPost;
