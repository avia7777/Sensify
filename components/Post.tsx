import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../style';
import InfoPost from './InfoPost';
import ImagePost from './ImagePost';
import VideoPost from './VideoPost';
import YNQuestionPost from './YNQuestionPost';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PostBottom from './PostBottom';


const components = {
  Info: InfoPost,
  Image: ImagePost,
  Video: VideoPost,
  YN_Question: YNQuestionPost,
};

const Post = (props) => {

  const PostComponent = components[props.classType];

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={{flexDirection: 'row-reverse'}} >
          <Image
            style={[styles.tinyLogo, {marginRight: 5}]}
            source={{
              uri: props.topicImage,
            }}
          />
          <View>
            <Text style={[styles.text, {fontWeight: 'bold'}]} >{props.topic}</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]} >{props.groupTitle}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/bookmark.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text} >{props.postTitle}</Text>
      <PostComponent content={props.content}/>
      <PostBottom />
    </View>
  )};

export default Post;
