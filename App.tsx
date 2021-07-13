import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Post from './components/Post';
import styles from './style';
// import feedService from './feed/FeedService';
import { v4 as uuidv4 } from 'uuid';
import { pagesStore } from './feed/Store';
import { observer } from 'mobx-react';


const App = observer(() => {

  const [pages, setPages] = useState([]);
  const [items, setItems] = useState([]);

  const changeFeed = (list) => {
    setItems((i) =>{
      // return i.slice(-50).concat(feed);
      return i.concat(list); // no slicing
    });
  }

  useEffect(() => {
    (async () => {
      if (pagesStore.pagesAmount === 0) {
        await pagesStore.fetchPages();
      }
      const initFeedPages = pagesStore.pages;
      changeFeed(initFeedPages.shift());
      setPages(initFeedPages);
    })()
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
    console.log(`There are ${pages.length} pages of posts.`);
    if (pages.length > 0) {
      let newFeedPage = pages[0];
      changeFeed(newFeedPage);
      setPages(oldPages => oldPages.slice(1));
    } else {
      console.log("########################################");
      console.log("Starting over from the top");
      console.log("########################################");
      // let newFeedPages = feedService.getPages();
      let newFeedPages = pagesStore.pages;
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
          keyExtractor={() => uuidv4()}
        />
    </SafeAreaView>
  );
}
)

export default App;

// Delete before last page when add Items called