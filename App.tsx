import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import Post from './components/Post';
import styles from './style';
import { v4 as uuidv4 } from 'uuid';
import { pagesStore } from './feed/FeedStore';

const App = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    (async ()=>{
        await pagesStore.fetchPages();
        addItems();
    })(), signal;
    return () => controller.abort();
  }, []);

  const renderItem = ({ item }) => {
    // console.log("Key ==> ", item.key);
    return <Post {...item} />
  }

  const addItems = () => {
    console.log(`[sensify] There are ${items.length} posts on feed!!!`);
    const nextPage = pagesStore.nextPage;
    // console.log(`[sensify] next page: ==> ${JSON.stringify(nextPage)}`);
    if (nextPage) {
      console.log("[sensify] next pages launced");
      let feed = nextPage.map(item => {
            const key = uuidv4();
            return {...item, key: key};
          })
      setItems((currentItems) =>{
        // console.log(`[sensify] set adding feed: ${JSON.stringify(feed)}`);
        return currentItems.concat(feed);
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
          data={items}
          renderItem={renderItem}
          onEndReached={addItems}
          removeClippedSubviews={true}
        /> */}
      <FlatList
        data={items}
        renderItem={renderItem}
        onEndReached={addItems}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={21}
        onEndReachedThreshold={.7}
        maxToRenderPerBatch={10}
        disableVirtualization={true}
        updateCellsBatchingPeriod={100}
        keyExtractor={(item => item.key)}
      />
    </SafeAreaView>
  );
}

export default App;
