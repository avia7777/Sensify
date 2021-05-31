import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: 'black',
      color: '#12ee12',
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      paddingHorizontal: 15,
    },
    post: {
      backgroundColor: '#242526', 
      paddingVertical: 15,
      marginVertical: 8,
      borderWidth: 0,
    },
    text: {
      fontSize: 14,
      color: '#e4e6eb',
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    tinyLogo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#bebebe",
    },
    button: {
      alignItems: "center",
      backgroundColor: '#5C9181',
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 5,
      padding: 10,
    },
  });

export default styles;