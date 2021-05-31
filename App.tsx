import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Post from './components/Post';
import styles from './style';
import feedGenerator from './feed/FeedGenerator';


const App = () => {

  const [pages, setPages] = useState([]);
  const [items, setItems] = useState([]);
  const [key, setKey] = useState(-1);

  const changeFeed = (list) => {
    let k = key;
    let feed = list.map(item => {
      k += 1;
      console.log("K ==> ", k);
      // console.log("Group ==> ", item.group);
      // console.log("content ==> ", item.content);
      return {...item, key: k};
    })
    let length = list.length;
    setKey(n => n+length);
    // console.log("KEY??? ", key);
    setItems((i) =>{
      return i.concat(feed);
    });
  }

  useEffect(() => {
    let initFeedPages = feedGenerator.generatePages();
    changeFeed(initFeedPages.shift());
    setPages(initFeedPages);
  }, [])

  const renderItem = ({ item }) => (
    <Post {...item} />
    // <Post content={item.content} classType={item.classType} topic={item.topic} 
    // topicImage={item.topicImage} groupTitle={item.groupTitle} 
    // postTitle={item.postTitle} />
  );

  const addItems = () => {
    if (pages.length > 0) {
      let newFeedPage = pages[0];
      changeFeed(newFeedPage);
      setPages(oldPages => oldPages.slice(1));
    } else {
      // console.log("########################################");
      // console.log("Fetched new posts!!");
      // console.log("########################################");
      let newFeedPages = feedGenerator.generatePages();
      changeFeed(newFeedPages.shift());
      setPages(newFeedPages);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={items}
          renderItem={renderItem}
          onEndReached={addItems}
        />
    </SafeAreaView>
  );
}

export default App;

// Delete before last page when add Items called