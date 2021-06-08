import React, {useState} from 'react';
import { View, Text, Image } from 'react-native';

const ImagePost = ({ content })=> {
    
    const [ratio, setRatio] = useState(1);

    Image.getSize(content, (width, height)=> {
        setRatio(width/height);
    });

    return (
        <View>
            <Image
                style={{width: '100%', aspectRatio: ratio}}
                source={{uri: content}}
            />
        </View>
    )
}

export default ImagePost;
