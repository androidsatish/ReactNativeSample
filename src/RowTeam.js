  import React from 'react';
import { StyleSheet, Image, View, Text} from 'react-native';
const RowTeam = (props) => (

  //  <Text style={styles.item}>{props.title}</Text>

<View style={styles.container}>
<Image source={props.image} style={{width: 30, height: 20}}/>
<Text style={styles.item}>{props.title}</Text>
</View>

//  <Image source={props.image} style={{width: 30, height: 20}}/>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
    backgroundColor: 'powderblue',
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  item: {
    fontSize: 19,
    textAlign: 'center',
    padding: 8,
    color:"black",
    backgroundColor: 'powderblue',
  },
});



export default RowTeam;


/*

<View style={{flex:1, flexDirection: 'row'}}> //Don't forget this
    <Image source={props.image} style={{width: 20, height: 20}}/>
      <Text>{props.title}</Text>
  </View>


*/
