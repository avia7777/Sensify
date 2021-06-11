import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: 'black',
      color: '#12ee12',
    },
    postHeader: {
      flexDirection: 'row-reverse',
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
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: 'black',
    },
    questionButton: {
      alignItems: "center",
      backgroundColor: '#5C9181',
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 5,
      padding: 10,
    },
    postBottom: {
      flexDirection: 'row',
      marginTop: 15,
      paddingTop: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#e4e6eb',
    },
    imageTextButton: {
      flexDirection:"row",
      alignItems: 'center',
      justifyContent:'center'
    },
  });

export default styles;