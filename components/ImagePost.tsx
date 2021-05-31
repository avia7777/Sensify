import React, {useState} from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style';

const ImagePost = ({ content })=> {
    
    const [ratio, setRatio] = useState(100);

    Image.getSize(content, (width, height)=> {
        setRatio(width/height);
    });

    return (
        <View>
            <Image
                style={{width: '100%', aspectRatio: ratio}}
                source={{
                    uri: content,
                }}
            />
            {/* <Text>{ratio}</Text> */}
        </View>
    )
}

export default ImagePost;
