import React, { Component } from 'react';
import {
  Platform,StyleSheet,Text,FlatList,ScrollView,Image,ListView,Button,TouchableWithoutFeedback,
  TouchableNativeFeedback,View,ActivityIndicator,DrawerLayoutAndroid,ImageBackground,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RowTeam from './src/RowTeam';
import RowMatch from './src/RowMatch';
import Toast from 'react-native-toast-native';

const imgIND = require('./img/india.png')
const imgSA = require('./img/southafrica.png')
const imgENG = require('./img/england.png')
const imgBAN = require('./img/bangladesh.png')
const imgAUS = require('./img/australia.png')
const imgNZ = require('./img/zealand.png')
const imgSL = require('./img/sri-lanka.png')
const imgPAK = require('./img/pakistan.png')
const imgAFG = require('./img/afghanistan.png')
const imgKEN = require('./img/kenya.png')
const imgNED = require('./img/netherlands.png')
const imgHNK = require('./img/hongkong.png')
const imgUAE = require('./img/united-arab-emirates.png')
const imgUSA = require('./img/usa.png')
const imgJPN = require('./img/japan.png')
const imgCHA = require('./img/china.png')

var data1 = [{title:"India",image:imgIND},{title:"South Africa",image:imgSA},
{title:"England",image:imgENG},{title:"Bangladesh",image:imgBAN}]

var data2 = [{title:"Australia",image:imgAUS},{title:"NewZeland",image:imgNZ},
{title:"Sri-Lanka",image:imgSL},{title:"Pakistan",image:imgPAK}]

var data3 = [{title:"Afghanistan",image:imgAFG},{title:"Kenya",image:imgKEN},
{title:"Netherlands",image:imgNED},{title:"Hongkong",image:imgHNK}]

var data4 = [{title:"UAE",image:imgUAE},{title:"USA",image:imgUSA},
{title:"Japan",image:imgJPN},{title:"China",image:imgCHA}]

var grpA = [
  {
    grpName: "A",
    matchNumber: 1,
    team1 : data1[0].title,
    team2 : data1[1].title,
    date : '12 May 2018  1.30 PM',
    venue : 'Wankhede Stadium, Mumbai',
    team1Icon : data1[0].image,
    team2Icon : data1[1].image,
  },
  {
    grpName: "A",
    matchNumber: 2,
    team1 : data1[2].title,
    team2 : data1[3].title,
    date : '13 May 2018 1.30 PM',
    venue : 'Feroz Shah Kotla Stadium, Delhi',
    team1Icon : data1[2].image,
    team2Icon : data1[3].image,
  },
  {
    grpName: "A",
    matchNumber: 9,
    team1 : data1[0].title,
    team2 : data1[2].title,
    date : '20 May 2018 4.30 PM',
    venue : 'Wankhede Stadium, Mumbai',
    team1Icon : data1[0].image,
    team2Icon : data1[2].image,
  },
  {
    grpName: "A",
    matchNumber: 10,
    team1 : data1[1].title,
    team2 : data1[3].title,
    date : '21 May 2018 4.30 PM',
    venue : 'Feroz Shah Kotla Stadium, Delhi',
    team1Icon : data1[1].image,
    team2Icon : data1[3].image,
  },
]

var grpB = [
{
  grpName: "B",
  matchNumber: 3,
  team1 : data2[0].title,
  team2 : data2[1].title,
  date : '14 May 2018 4.30 PM',
  venue : 'Eden Gardens, Kolkata',
  team1Icon : data2[0].image,
  team2Icon : data2[1].image,
},
{
  grpName: "B",
  matchNumber: 4,
  team1 : data2[2].title,
  team2 : data2[3].title,
  date : '15 May 2018 1.30 PM',
  venue : 'Jawaharlal Nehru Stadium, Chennai',
  team1Icon : data2[2].image,
  team2Icon : data2[3].image,
},
{
  grpName: "B",
  matchNumber: 11,
  team1 : data2[0].title,
  team2 : data2[3].title,
  date : '22 May 2018 4.30 PM',
  venue : 'M.Chinnaswamy Stadium, Bangalore',
  team1Icon : data2[0].image,
  team2Icon : data2[3].image,
},
{
  grpName: "B",
  matchNumber: 12,
  team1 : data2[1].title,
  team2 : data2[3].title,
  date : '23 May 2018 1.30 PM',
  venue : 'Jawaharlal Nehru Stadium, Chennai',
  team1Icon : data2[1].image,
  team2Icon : data2[3].image,
},
]

var grpC = [
{
  grpName: "C",
  matchNumber: 5,
  team1 : data3[0].title,
  team2 : data3[1].title,
  date : '16 May 2018 4.30 PM',
  venue : 'Subrata Roy Sahara Stadium, Pune',
  team1Icon : data3[0].image,
  team2Icon : data3[1].image,
},
{
  grpName: "C",
  matchNumber: 6,
  team1 : data3[2].title,
  team2 : data3[3].title,
  date : '17 May 2018 1.30 PM',
  venue : 'Rajiv Gandhi International Cricket Stadium, Hyderabad',
  team1Icon : data3[2].image,
  team2Icon : data3[3].image,
},
{
  grpName: "C",
  matchNumber: 13,
  team1 : data3[0].title,
  team2 : data3[2].title,
  date : '24 May 2018 4.30 PM',
  venue : 'Subrata Roy Sahara Stadium, Pune',
  team1Icon : data3[0].image,
  team2Icon : data3[2].image,
},
{
  grpName: "C",
  matchNumber: 14,
  team1 : data3[1].title,
  team2 : data3[3].title,
  date : '25 May 2018 1.30 PM',
  venue : 'Rajiv Gandhi International Cricket Stadium, Hyderabad',
  team1Icon : data3[1].image,
  team2Icon : data3[3].image,
},
]

var grpD = [
{
  grpName: "D",
  matchNumber: 7,
  team1 : data4[0].title,
  team2 : data4[1].title,
  date : '18 May 2018 1.30 PM',
  venue : 'Holkar Stadium, Indore',
  team1Icon : data4[0].image,
  team2Icon : data4[1].image,
},
{
  grpName: "D",
  matchNumber: 8,
  team1 : data4[2].title,
  team2 : data4[3].title,
  date : '19 May 2018 1.30 PM',
  venue : 'Moti Bagh Stadium, Vadodara',
  team1Icon : data4[2].image,
  team2Icon : data4[3].image,
},
{
  grpName: "D",
  matchNumber: 15,
  team1 : data4[0].title,
  team2 : data4[2].title,
  date : '26 May 2018 1.30 PM',
  venue : 'Holkar Stadium, Indore',
  team1Icon : data4[0].image,
  team2Icon : data4[2].image,
},
{
  grpName: "D",
  matchNumber: 16,
  team1 : data4[1].title,
  team2 : data4[3].title,
  date : '27 May 2018 4.30 PM',
  venue : 'Moti Bagh Stadium, Vadodara',
  team1Icon : data4[1].image,
  team2Icon : data4[3].image,
},
]

var allMatches = grpA.concat(grpB,grpC,grpD);
allMatches.sort(function(a,b){
  return a.matchNumber - b.matchNumber;
});

const defaultHitSlop = { top: 15, bottom: 15, right: 15, left: 15 };

class LogoTitle extends React.Component {
  render(){
    return(

      <View style={styles.titleBar}>
      <Image source={require('./img/cricket.png')}style={{width: 40, height: 40}}/>
      <Text style={styles.title}>ICC World Cup 2019 Teams</Text>
      <Image source={require('./img/icc_logo.png')}style={{width: 40, height: 40}}/>
      </View>

    );
  }
}

class HomeScreen extends React.Component{
  static navigationOptions = {
//    title: 'Home',
headerTitle: <LogoTitle />,
  };
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.state = {
         dataSource1: ds.cloneWithRows(data1),
         dataSource2: ds.cloneWithRows(data2),
         dataSource3: ds.cloneWithRows(data3),
         dataSource4: ds.cloneWithRows(data4),
       };
  }
  render(){

return(
  <View style={styles.rootContainer}>
  <ScrollView>
        <View style={styles.container}>
        <View style={styles.groupContainer}>
      <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
        groupId:1,
        groupName:'A',
        matches: grpA,
      });
    }}>
        <View style={styles.groups} >
        <Text style={styles.header}>Group 'A'</Text>
        <ListView
        style={{flex:1}}
        dataSource={this.state.dataSource1}
        renderRow={(data) => <Row {...data} />}
                      />
  </View>
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
  groupId:2,
  groupName:'B',
  matches: grpB,

});
}}>
  <View style={styles.groups}>
  <Text style={styles.header}>Group 'B'</Text>
  <ListView style={{flex:1}}
  dataSource={this.state.dataSource2}
  renderRow={(data) => <Row {...data} />}
                />
    </View>
    </TouchableWithoutFeedback>
    </View>

    <View style={styles.groupContainer}>
    <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
      groupId:3,
      groupName:'C',
      matches: grpC,

    });
    }}>
    <View style={styles.groups}>
    <Text style={styles.header}>Group 'C'</Text>
    <ListView
    style={{flex:1}}
    dataSource={this.state.dataSource3}
    renderRow={(data) => <Row {...data} />}
                  />
  </View>
  </TouchableWithoutFeedback>

  <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
    groupId:4,
    groupName:'D',
    matches: grpD,

  });
  }}>
  <View style={styles.groups}>
  <Text style={styles.header}>Group 'D'</Text>
  <ListView
  style={{flex:1}}
  dataSource={this.state.dataSource4}
  renderRow={(data) => <Row {...data} />}
                />
  </View>
  </TouchableWithoutFeedback>

  </View>

<View style={styles.buttonContainer}>
<TouchableNativeFeedback
  onPress={() => {this.props.navigation.navigate('Matches',{
    groupId:0,
    groupName:'All',
    matches: allMatches,

  });
}}
  background = {TouchableNativeFeedback.Ripple('white',false)}
  hitSlop = {defaultHitSlop}
  >
  <View style={styles.button}>
<Text style={styles.text}> Go to Matches</Text>
  </View>
  </TouchableNativeFeedback>
</View>


</View>
</ScrollView>
</View>

);

  }
}

const toastStyle = {
  borderRadius:15,
  yOffset: 40,
  height: Platform.OS === ("ios") ? 50 : 100,
  fontSize: 14,
  lineHeight: 2,
  lines: 4,
}

var message = 'Welcome to Toast Native ...!'
var grpId,grpName

class GroupMatches extends React.Component {
  static navigationOptions = {
    title: 'Matches',
    headerRight :(
      <Button
      onPress ={() => Toast.show(message,Toast.SHORT,Toast.BOTTOM,toastStyle)}
      title = "Info"
      color = "steelblue"
      />
    ),

  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var row = [
      {
        grpName: "groupName",
        team1 : "",
        team2 : "",
        date : '',
        venue : '',
        team1Icon : data1[0].image,
        team2Icon : data1[1].image,
      }]

    const { params } = this.props.navigation.state;
    const groupId = params ? params.groupId : null;
    const groupName = params ? params.groupName : null;
    const matches = params ? params.matches : row;
    this.state = {
      dataSource : ds.cloneWithRows(matches),
    };

    grpId = groupId;
    grpName = groupName;

  }
render()
{

return(

  <ScrollView>
  <View style={styles.container}>
  <ListView
  style={{flex:1}}
  dataSource={this.state.dataSource}
  renderRow={(data) => <RowMatch {...data} navigation={this.props.navigation}/>}
                />

  <Text style={{textAlign:'center'}}> group ID : {grpId}</Text>
  <Text style={{textAlign:'center'}}> Showing matches for group : {grpName}</Text>

  </View>
  </ScrollView>
);
}
}

class App extends React.Component{
  render() {
 return <RootStack />;
  }
}

var matchId = 0;

class Indicators extends React.Component{
  static navigationOptions = {
    title: 'Indicators',
  };
  constructor(props){
    super(props);

/*  const { params } = this.props.navigation.state;
  const maId = params ? params.matchId : null;

  matchId =  maId;
*/

  }

  render(){
  var navigationView = (
    <View style={{flex: 1, backgroundColor: '#ebeef0'}}>
      <Text style={{margin: 10, fontSize: 25, textAlign: 'left'}}>I am in the Drawer!</Text>
    </View>
  );

    const tableHead = ['Player','Against','Season','Innings','Runs','SR','100s'];
    const tableData = [
      ['Virat Kohli','SA','2017/18','6','588','99.46','3'],
      ['Rohit Sharma','AUS','2013/14','6','491','108.62','2'],
      ['George Bailey','IND','2013/14','6','478','116.06','1'],
    ];


    return(
      <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <ScrollView>
      <View style={{flex:1,flexDirection:'column',padding:0}}>
      <View style={styles.cardView}>
      <View style={{padding:10}}>
      <View style={{justifyContent: 'center',alignItems: 'center',}}>
      <ImageBackground source={require('./img/indvssaback.png')} style={{width:400,height:230}}>
      <Text style={{fontSize:30,padding:10, fontWeight:'600', textAlign:'center',}}>India</Text>
      <Text style={{textAlign:'center'}}>Vs</Text>
      <Text style={{fontSize:30,padding:10, fontWeight:'600',textAlign:'center',}}>South Africa</Text>
      </ImageBackground>
      </View>

      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             After a Test series for the ages, the ODI series which promised to be a humdinger turned out to be a damp squib as it was a one-way traffic bar a minor diversion in the Johannesburg ODI.India were deservedly the winners and on the back of the 5-1 win result
      they wrested the number one position from the hosts South Africa in ICC rankings. It was "India's" ninth successive bilateral series win and only the mighty Windies of the 1980's' are ahead of them with 14 consecutive wins.
      Virat "Kohli's" purple patch saw an extended run while it was the coming of age series for "India's" new boy wonders Kuldeep Yadav and Yuzvendra Chahal.
      Here are five talking points from the series</Text>

      <Text style={{paddingLeft:15,fontWeight:'bold',textAlign:'left',}}>Top three domination</Text>

      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             The series began with two of the best top three in the world pitted against each other - Rohit Sharma, Shikhar Dhawan and Virat Kohli against Hashim Amla, Quinton de Kock and Faf du Plessis. After two weeks and six ODIs, only one of them could stand up to the challenges while the other just capitulated. It did no good to the hosts when de Kock and du Plessis were ruled out after the first two ODIs with injuries. "Amla's" wretched run against India continued as he averaged only 25.66 in the series with a solitary fifty. His tally of 154 runs in the series was the highest for South Africa and that captured their "team's" woeful performance with the bat.
      </Text>

      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             In comparison, there were hundreds from one of "India's" top three in five of the six innings missing out only in the second ODI where the target was only 119. The trio scored 76.33% of "India's" runs off the bat in the whole series making it the fourth highest contribution from the top three in a bilateral series of five or more ODIs. Out of the 17 times an Indian batsman went past 20, nine times they crossed 50, converting five of them to hundreds. On the other hand, the South African players could score fifty-plus only four out of the 27 times they went past 20. Aiden Markram was the prime example of failure to convert starts, reaching 20 four times in six innings but failed to go past 32.
      </Text>

      <Text style={{paddingLeft:15,fontWeight:'bold',textAlign:'left',}}>Kohli in a league of his own</Text>

      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             Kohli started the series with a score to settle in South Africa as it was the only nation where he "hadn't" registered an ODI century. After the end of the series, he has the joint most hundreds by any player against the home team in South Africa, sitting alongside Kevin Pietersen with three each. He ended the series at a scarcely believable tally of 558 runs from six innings - the most ever by a player in a bilateral series of any length. Such was his dominance in the series that no bowler could dismiss him for a score less than 75.

The gap between him and the rest was so much that only Dhawan (323 runs) managed to score more than one-third of "Kohli's" aggregate in the series. The top four leading run-getters for South Africa in the series managed only 511 runs between them, 47 less than "Kohli's" tally which underlines his rich vein of form. He also became the first Indian batsman to score three centuries in a bilateral series.
      </Text>

      <Text style={{paddingLeft:15,fontWeight:'bold',textAlign:'left',}}>Most runs in a bilateral series</Text>

      <View style={{justifyContent: 'center',alignItems: 'center',}}>
  <Image source={{uri : 'https://i.ndtvimg.com/i/2017-09/virat-kohli-afp_806x605_61504455574.jpg'}}
  style={{width:350,height:300,margin:25}} alt="Virat Kohli"
  />
  </View>

  </View>
  </View>
      </View>
      </ScrollView>
    </DrawerLayoutAndroid>
    );
  }
}


const RootStack = StackNavigator(
{
  Home: {
    screen : HomeScreen,
  },
  Matches:{
    screen : GroupMatches,
  },
  Indicators : {
    screen : Indicators,
  },
},
{
initialRouteName : 'Home',
navigationOptions : {
  headerStyle: {
   backgroundColor: 'steelblue',
 },
 headerTintColor: 'white',
 headerTitleStyle: {
   fontWeight: 'bold',
 },
},
}

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  horizontal: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   padding: 10
 },
  groupContainer: {
    flex: 1,
    margin: 5,
    flexDirection:'row',
  },
  groups: {
    flex: 1,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 4,
  },
  item: {
    fontSize: 19,
    textAlign: 'center',
    padding: 8,
    color:"black",
    backgroundColor: 'powderblue',
  },
  header: {
    textAlign: 'center',
    color: 'steelblue',
    padding: 10,
    fontWeight:'bold',
    fontSize: 24,
    backgroundColor:"skyblue",
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
  },
  titleBar: {
      backgroundColor: 'steelblue',
      flex:1,
      flexDirection: 'row',
      maxHeight: 60,
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
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
  buttonContainer: {
  margin: 24,
},
text: {
  fontSize: 20,
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
},
button: {
  padding: 20,
  borderRadius: 5,
  backgroundColor: 'steelblue',
  marginBottom: 20,
},
});

export default Indicators;
