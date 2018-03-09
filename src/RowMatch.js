import React from 'react';
import { StyleSheet, Image, View, Text,TouchableWithoutFeedback} from 'react-native';
import {StackNavigator} from 'react-navigation';

const RowMatch = (props) => (

<TouchableWithoutFeedback onPress={() => {props.navigation.navigate('Indicators',{
  matchId:props.matchNumber,
});
}}>
  <View style={styles.cardView}>
  <Text style={styles.cardTitle}>Match {props.matchNumber}
  <Text style={{fontSize:15,fontWeight:'normal',}}>        Group {props.grpName}</Text>
  </Text>
  <View style={{flex: 1,flexDirection: 'column',padding:15}}>
    <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
  <Image source={props.team1Icon} style={styles.imageMatchCard}/>
  <View style={{flex:1, flexDirection:'column'}}>
  <Text style={styles.cardText}>{props.team1}</Text>
  <Text style={styles.cardTextInfo}>Vs</Text>
  <Text style={styles.cardText}>{props.team2}</Text>
  </View>
  <Image source={props.team2Icon} style={styles.imageMatchCard}/>
  </View>
  <Text style={styles.cardTextInfo}>{props.date}</Text>
  <Text style={styles.cardTextInfo}>{props.venue}</Text>
  </View>
  </View>
  </TouchableWithoutFeedback>


);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cardView: {
    margin: 10,
    backgroundColor:'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
      textAlign: 'center',
    fontSize : 25,
    backgroundColor:'steelblue',
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  cardText: {
    fontSize : 23,
    padding: 5,
    fontWeight:'600',
    textAlign: 'center',

  },
  cardTextInfo: {
    padding:2,
    color:'steelblue',
    fontSize:13,
    alignSelf: 'center',
  },
  imageMatchCard: {
    width:40,
    height:30,
    marginLeft:20,
    marginRight:20
  },
});

export default RowMatch;
