import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Post from './components/Post';
import styles from './style';
import { v4 as uuidv4 } from 'uuid';
import { pagesStore } from './feed/FeedStore';
import { observer } from 'mobx-react';


const App = observer(() => {

  const [items, setItems] = useState([]);

  const addItems = () => {
    console.log(`There are ${items.length} posts on feed!!!`);
    const nextPage = pagesStore.nextPage;
    if (nextPage) {
      setItems((i) =>{
        // return i.slice(-50).concat(feed);
        return i.concat(nextPage); // no slicing
      });
    }
  }

  const renderItem = ({ item }) => {
    // console.log("Key ==> ", item.key);
      return <Post {...item} />
  }

  useEffect(() => {
    (async ()=>{
      await pagesStore.fetchPages();
      addItems();
    })();
  }, [])

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