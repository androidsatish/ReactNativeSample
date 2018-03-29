import React from 'react';
import { StyleSheet, Image, View, Text,TouchableWithoutFeedback} from 'react-native';
import {StackNavigator} from 'react-navigation';


var date= 'No Date Fixed'
var isResult
class RowMatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCompleted : this.props.isComplete,
    };
    console.log("Row Match constructor called");
    if (this.props.isComplete) {
      date = this.props.result;
    }else {
      date = new Date(this.props.matchDate).toString().substring(0,24);
    }
  }

  componentDidMount(){
  //  this.getDate();
  }

  render(){

      return(
        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Indicators',{
          matchId:this.props.matchId,
        });
        }}>
          <View style={styles.cardView}>
          <Text style={styles.cardTitle}>Match {this.props.matchId}
          <Text style={{fontSize:15,fontWeight:'normal',}}>        Group {this.props.groupName}</Text>
          </Text>
          <View style={{flex: 1,flexDirection: 'column',padding:15}}>
            <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
          <Image source={{uri : this.props.img1}} style={styles.imageMatchCard}/>
          <View style={{flex:1, flexDirection:'column'}}>
          <Text style={styles.cardText}>{this.props.op1Name}</Text>
          <Text style={styles.cardTextInfo}>Vs</Text>
          <Text style={styles.cardText}>{this.props.op2Name}</Text>
          </View>
          <Image source={{uri : this.props.img2}} style={styles.imageMatchCard}/>
          </View>
          <Text style={[styles.cardTextInfo,this.state.isCompleted && styles.cardResultText]}>{date}</Text>
          <Text style={styles.cardTextInfo}>{this.props.venue}</Text>
          </View>
          </View>
          </TouchableWithoutFeedback>

      );
  }
}

//const RowMatch = (props) => ();

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
  cardResultText :{
    fontWeight:'600',
    padding:2,
    color:'orange',
    fontSize:17,
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
