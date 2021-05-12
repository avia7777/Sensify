import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Card from './components/Card';
import styles from './style';
import feedGenerator from './feed/FeedGenerator';


const App = () => {

  const [items, setItems] = useState([]);
  const [key, setKey] = useState(-1);

  const changeFeed = (list) => {
    let k = key;
    feed = list.map(item => {
      k += 1;
      // console.log("K??? ", k);
      console.log("Group ==> ", item.group);
      console.log("content ==> ", item.content);
      return {key: k, content: item.content, type: item.classType};
    })
    let length = list.length;
    setKey(n => n+length);
    // console.log("KEY??? ", key);
    setItems((i) =>{
      return i.concat(feed);
    });
  }

  useEffect(() => {
    // feedGenerator();
    let initFeed = feedGenerator.feedPage();
    changeFeed(initFeed);
    // setItems(DATA);
  }, [])

  const renderItem = ({ item }) => (
    <Card title={item.content} itemType={item.type}/>
  );

  const addItems = () => {
    let newFeed = feedGenerator.feedPage();
    changeFeed(newFeed);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Avia</Text> */}
      <FlatList
        data={items}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
        onEndReached={addItems}
      />
    </SafeAreaView>
  );
}

export default App;