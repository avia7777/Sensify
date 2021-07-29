import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Post from './components/Post';
import styles from './style';
import feedService from './feed/FeedService';
import { v4 as uuidv4 } from 'uuid';
import { pagesStore } from './feed/FeedStore';

const App = () => {

  const [pages, setPages] = useState([]);
  const [items, setItems] = useState([]);

  // const changeFeed = (list) => {
  //   let feed = list.map(item => {
  //     const key = uuidv4();
  //     return {...item, key: key};
  //   })
  //   setItems((i) =>{
  //     return i.slice(-50).concat(feed);
  //   });
  // }

  useEffect(() => {
    (async ()=>{
      await pagesStore.fetchPages();
      addItems();
    })();
  }, [])

  // useEffect(() => {
  //   let initFeedPages = feedService.getPages();
  //   changeFeed(initFeedPages.shift());
  //   setPages(initFeedPages);
  // }, [])

  const renderItem = useCallback(
    ({ item }) => {
      // console.log("Key ==> ", item.key);
      return <Post {...item} />
    },
    []
  );

  const addItems = () => {
    console.log(`[sensify] There are ${items.length} posts on feed!!!`);
    const nextPage = pagesStore.nextPage;
    console.log(`[sensify] next page: ==> ${JSON.stringify(nextPage)}`);
    if (nextPage) {
      console.log("[sensify] next pages launced");
      let feed = nextPage.map(item => {
            const key = uuidv4();
            return {...item, key: key};
          })
      setItems((currentItems) =>{
        console.log(`[sensify] set adding feed: ${JSON.stringify(feed)}`);
        // return i.slice(-50).concat(feed);
        return currentItems.concat(feed); // no slicing
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{color: 'white'}}>Avia is the king!</Text>
      </View>
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