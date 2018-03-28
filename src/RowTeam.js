  import React from 'react';
import { StyleSheet, Image, View, Text} from 'react-native';
const RowTeam = (props) => (

<View style={styles.container}>
<Image source={{uri : props.img}} onError ={()=> console.log("Image loading failed")}
 style={{width: 25, height: 15}}/>
<Text style={styles.item}>{props.teamName}</Text>
</View>

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
    fontSize: 16,
    textAlign: 'center',
    padding: 6,
    color:"black",
    fontFamily :'Roboto',
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
