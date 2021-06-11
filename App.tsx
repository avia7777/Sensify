import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Post from './components/Post';
import styles from './style';
import feedService from './feed/FeedService';
import { v4 as uuidv4 } from 'uuid';



const App = () => {

  const [pages, setPages] = useState([]);
  const [items, setItems] = useState([]);

  const changeFeed = (list) => {
    let feed = list.map(item => {
      const key = uuidv4();
      return {...item, key: key};
    })
    setItems((i) =>{
      return i.slice(-50).concat(feed);
    });
  }

  useEffect(() => {
    let initFeedPages = feedService.getPages();
    changeFeed(initFeedPages.shift());
    setPages(initFeedPages);
  }, [])

  const renderItem = useCallback(
    ({ item }) => {
      // console.log("Key ==> ", item.key);
      return <Post {...item} />
    },
    []
  );

  const addItems = () => {
    console.log(`There are ${items.length} posts on feed!!!`);
    if (pages.length > 0) {
      let newFeedPage = pages[0];
      changeFeed(newFeedPage);
      setPages(oldPages => oldPages.slice(1));
    } else {
      console.log("########################################");
      console.log("Fetched new posts!!");
      console.log("########################################");
      let newFeedPages = feedService.getPages();
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
          removeClippedSubviews={true}
        />
    </SafeAreaView>
  );
}

export default App;

// Delete before last page when add Items called