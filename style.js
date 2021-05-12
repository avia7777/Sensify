import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    card: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    text: {
      fontSize: 32,
    },
  });

export default styles;