import React, { Component } from 'react';
import {
  Platform,StyleSheet,Text,FlatList,ScrollView,Image,ListView,Button,TouchableWithoutFeedback,
  TouchableNativeFeedback,TouchableHighlight,View,ActivityIndicator,Alert,RefreshControl,AsyncStorage,DatePickerAndroid,
  DrawerLayoutAndroid,ImageBackground,TextInput,ViewPagerAndroid,WebView,StatusBar,CameraRoll,} from 'react-native';
import { StackNavigator } from 'react-navigation';
import RowTeam from './src/RowTeam';
import RowMatch from './src/RowMatch';
import ActionButton from './src/ActionButton';
import Toast from 'react-native-toast-native';
import Camera from 'react-native-camera';

var data1 = []

var data2 = []

var data3 = []

var data4 = []
var matches = []
var matchesUrl;

const toastStyle = {
  borderRadius:15,
  yOffset: 40,
  height: Platform.OS === ("ios") ? 50 : 100,
  fontSize: 14,
  lineHeight: 2,
  lines: 4,
}

const DATA_KEY = 'storage123'
var message = 'Welcome to Toast Native ...!'
var grpId,grpName
var matchId = 0;
var take
var imageUri
var imageArray
var pos
const defaultHitSlop = { top: 15, bottom: 15, right: 15, left: 15 };

class LogoTitle extends React.Component {
  render(){
    return(

      <View style={styles.titleBar}>
      <Image source={require('./img/cricket.png')}style={{width: 30, height: 30}}/>
      <Text style={styles.title}>ICC World Cup 2019</Text>
      <Image source={require('./img/icc_logo.png')}style={{width: 30, height: 30}}/>
      </View>

    );
  }
}

class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };
  constructor(props){
    super(props);
    this.state ={ email: '',password:''};
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  makeRequest(){
    fetch('http://10.0.1.125:8082/login', {
      method: 'POST',
      headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
      body: JSON.stringify({ email: this.state.email, password: this.state.password})
    }).then((response) => response.json())
    .then((responseData) => {
      console.log("responseData : " +responseData.status);
      if (responseData.status) {

        AsyncStorage.setItem(DATA_KEY,JSON.stringify(responseData.data[0]), (err) =>{
          if (err) {
            console.log("Error storing data "+err);
          }else {
            console.log("data stored ");
            }

        });

        Alert.alert("Success !","Login successfull for "+this.state.email,[
          {text :'Go To Home',onPress: () =>this.props.navigation.navigate('Home',{
            userId:responseData.data[0]["userId"],
            firstName:responseData.data[0]["firstName"],
            lastName: responseData.data[0]["lastName"],
          }),
        },
        {text :'Cancel',onPress : () =>console.log("Cancel Clicked"),style :'cancel'},
      ],
      {cancelable: false}
    );

    console.log("responseData : " +responseData.data[0]["userId"]);
    console.log("responseData : " +responseData.data[0]["firstName"]);
    console.log("responseData : " +responseData.data[0]["lastName"]);
  }
  else
   {
     Alert.alert("Failed !",responseData.msg);
     console.log("responseData : " +responseData.msg);
   }
 })
 .catch((error) => {
   console.log("error : " +error);
 });
  }
  focusNextField(id){
    this.inputs[id].focus();
  }
  componentDidMount(){
    AsyncStorage.getItem(DATA_KEY,(err,result) =>{
          if (err) {
            console.log("Error retrieving data "+err);
          }else {
            console.log("Stored Data : "+result);
            var data = JSON.parse(result);
            if (data === null || data.userId === null) {
                  console.log("Stored No Data ");
            }else {

            if (data.userId > 0) {
              this.props.navigation.navigate('Home',{
                userId:data.userId,
                firstName:data.firstName,
                lastName: data.lastName,
              });
            }
          }
        }
    });

  }
  render(){
    return(
      <View style = {styles.rootContainer}>
      <StatusBar
      backgroundColor="#104977"
      barStyle="light-content"
      />
      <ScrollView>
      <View style ={{padding:10,marginTop:20,}}>
      <TextInput style = {{padding:5,height:45,}}
      blurOnSubmit = {false}
      onSubmitEditing = {() =>{this.focusNextField("password");}}
      ref = {input => {this.inputs['email'] = input;}}
      placeholder = "Email" keyboardType = "email-address" returnKeyType= "next"
      onChangeText = {(email) => this.setState({email})}/>
      </View>

      <View style = {{padding:10,marginTop:20,}}>
      <TextInput style = {{padding:5,height:45,}}
      blurOnSubmit = {true}
      onSubmitEditing = {() =>{this.makeRequest();}}
      ref = {input => {this.inputs['password'] = input;}}
      placeholder = "Password" returnKeyType= "done" keyboardType = "visible-password"
      onChangeText = {(password) => this.setState({password})}/>
      </View>


      <View style={styles.buttonContainer}>
      <TouchableNativeFeedback
        background = {TouchableNativeFeedback.Ripple('white',false)}
        hitSlop = {defaultHitSlop}
        onPress = {() => this.makeRequest()}
        >
        <View style={styles.button}>
      <Text style={styles.text}>Sign In</Text>
        </View>
        </TouchableNativeFeedback>
      </View>

      <Text style={{textAlign:'center',padding:0,color:'black',fontSize:18}}>OR</Text>

      <View style={styles.buttonContainer}>
      <TouchableNativeFeedback
        background = {TouchableNativeFeedback.Ripple('white',false)}
        hitSlop = {defaultHitSlop}
        onPress = {() => this.props.navigation.navigate('SignUp')}
        >
        <View style={styles.button}>
      <Text style={styles.text}>Not a User ? Sign Up</Text>
        </View>
        </TouchableNativeFeedback>
      </View>

      </ScrollView>
      </View>
    );
  }
}

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'SignUp',
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName : '',
      lastName : '',
      email : '',
      password : '',
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  focusNextField(id) {
     this.inputs[id].focus();
   }

  makeSignUpRequest(){
    fetch('http://10.0.1.125:8082/signup',{
      method : 'POST',
      headers : {'Accept':'application/json','Content-Type':'application/json'},
      body : JSON.stringify({
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        email : this.state.email,
        password : this.state.password,
      })
    }).then((response) => response.json())
    .then((responseData) => {
      console.log("Response Data Sign Up : "+responseData.status);

      if (responseData.status) {
        Alert.alert("Success !",responseData.msg, [
          {text : "Go Login",onPress : () => this.props.navigation.navigate('Login')},
          {text : 'Cancel',onPress : () => console.log("Cancel"),style:'cancel' },
        ],
        {cancelable : false}
      );
      }else {
        console.log("Response data : "+responseData.msg);
        Alert.alert("Failed !",responseData.msg);
      }

    }).catch((error) =>{
      console.log("SignUp Error : "+error);
    });

  }

  render(){
    return(
      <View style = {styles.rootContainer}>
      <ScrollView>
      <View style = {{padding:10,marginTop:20,}}>
      <TextInput style = {{padding:5,height:45,}}
      blurOnSubmit = {false}
      onSubmitEditing = {() =>{this.focusNextField("lastName");}}
      ref = {input => {this.inputs['firstName'] = input;}}
      placeholder="First Name" returnKeyType = "next"
      onChangeText = {(firstName) => this.setState({firstName})}  />
      </View>

      <View style = {{padding:10,marginTop:20,}}>
      <TextInput style = {{padding:5,height:45,}}
      blurOnSubmit = {false}
      onSubmitEditing = {() =>{this.focusNextField("email");}}
      ref = {input => {this.inputs['lastName'] = input;}}
      placeholder="Last Name" returnKeyType = "next"
      onChangeText = {(lastName) => this.setState({lastName})}  />
      </View>

      <View style = {{padding:10,marginTop:20,}}>
      <TextInput style = {{padding:5,height:45,}}
      blurOnSubmit = {false}
      onSubmitEditing = {() =>{this.focusNextField("password");}}
      ref = {input => {this.inputs['email'] = input;}}
      placeholder="Email" returnKeyType = "next" keyboardType = "email-address"
      onChangeText = {(email) => this.setState({email})}  />
      </View>

      <View style = {{padding:10,marginTop:20,}}>
      <TextInput style = {{padding:5,height:45,}}
      blurOnSubmit = {true}
      onSubmitEditing = {() =>{this.makeSignUpRequest()}}
      ref = {input => {this.inputs['password'] = input;}}
      placeholder="Password" returnKeyType = "done"
      onChangeText = {(password) => this.setState({password})}  />
      </View>

      <View style = {styles.buttonContainer}>
      <TouchableNativeFeedback background = {TouchableNativeFeedback.Ripple('white',false)}
      hitSlop = {defaultHitSlop}
      onPress = {() => this.makeSignUpRequest()} >
      <View style = {styles.button}>
      <Text style = {styles.text}>Sign Up</Text>
      </View>
      </TouchableNativeFeedback>
      </View>

      </ScrollView>
      </View>



    );
  }

}

class HomeScreen extends React.Component{
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  constructor(props){
    super(props);

    const { params } = this.props.navigation.state;
    const userId = params ? params.userId : null;
    const firstName = params ? params.firstName : null;
    const lastName = params ? params.lastName : null;

    console.log("User logged in "+userId+" "+firstName+" "+lastName);

  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    isLoading : true,
    dataSource1: ds.cloneWithRows(data1),
    dataSource2: ds.cloneWithRows(data2),
    dataSource3: ds.cloneWithRows(data3),
    dataSource4: ds.cloneWithRows(data4),
  };

  }

  loadData() {
   console.log("Load data called after Component mounted !");

   fetch('http://10.0.1.125:8082/getAllTeams',{
     method :'GET',
     headers :{'Content-Type':'application/json', },
   }).then((response) => response.json())
   .then((responseData) =>{
     console.log("Response  :"+responseData.status);
     console.log("Total Teams  :"+responseData.data.length);

     for (var i = 0; i < responseData.data.length; i++) {
       if (responseData.data[i]["groupId"] === 1) {
      //   console.log("Group A : "+responseData.data[i]["teamName"]);
         data1.push(responseData.data[i]);
       }else if (responseData.data[i]["groupId"] === 2) {
      //   console.log("Group B : "+responseData.data[i]["teamName"]);
         data2.push(responseData.data[i]);
       }else if (responseData.data[i]["groupId"] === 3) {
      //   console.log("Group C : "+responseData.data[i]["teamName"]);
         data3.push(responseData.data[i]);
       }else if (responseData.data[i]["groupId"] === 4) {
    //     console.log("Group D : "+responseData.data[i]["teamName"]);
         data4.push(responseData.data[i]);
       }
     }

     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

     this.setState({
       isLoading: false,
       dataSource1 : ds.cloneWithRows(data1),
       dataSource2 : ds.cloneWithRows(data2),
       dataSource3 : ds.cloneWithRows(data3),
       dataSource4 : ds.cloneWithRows(data4),
     });

   }).catch((error) => {
     console.log("Error :"+error);
   });

 }

 componentDidMount(){
   this.loadData();
 }

 componentWillUnmount(){
   data1 = [];
   data2 = [];
   data3 = [];
   data4 = [];
 }

  render(){

    if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }
   return(
     <View style={styles.rootContainer}>
     <ScrollView>
        <View style={styles.container}>
        <View style={styles.groupContainer}>
      <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
        groupId:1,
        groupName:'A',
      });
    }}>
        <View style={styles.groups} >
        <Text style={styles.header}>Group 'A'</Text>
        <ListView
        style={{flex:1}}
        dataSource={this.state.dataSource1}
        renderRow={(data) => <RowTeam {...data} />}
                      />
                      </View>
                      </TouchableWithoutFeedback>

                      <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
                        groupId:2,
                        groupName:'B',
                      });
                    }}>

                    <View style={styles.groups}>
                    <Text style={styles.header}>Group 'B'</Text>
                    <ListView style={{flex:1}}
                    dataSource={this.state.dataSource2}
                    renderRow={(data) => <RowTeam {...data} />}
                    />
                    </View>
                    </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.groupContainer}>
                    <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
                      groupId:3,
                      groupName:'C',
                    });
                  }}>

                  <View style={styles.groups}>
                  <Text style={styles.header}>Group 'C'</Text>
                  <ListView
                  style={{flex:1}}
                  dataSource={this.state.dataSource3}
                  renderRow={(data) => <RowTeam {...data} />}
                  />
                  </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Matches',{
                    groupId:4,
                    groupName:'D',
                  });
                }}>

                <View style={styles.groups}>
                <Text style={styles.header}>Group 'D'</Text>
                <ListView
                style={{flex:1}}
                dataSource={this.state.dataSource4}
                renderRow={(data) => <RowTeam {...data} />}
                />
                </View>
                </TouchableWithoutFeedback>
                </View>

                <View style={styles.buttonContainer}>
                <TouchableNativeFeedback
                onPress={() => {this.props.navigation.navigate('Matches',{
                  groupId:0,
                  groupName:'All',
                });
              }}
              background = {TouchableNativeFeedback.Ripple('white',false)}
              hitSlop = {defaultHitSlop}>
              <View style={styles.button}>
              <Text style={styles.text}> Go to Matches</Text>
              </View>
              </TouchableNativeFeedback>
              </View>

              <View style={styles.buttonContainer}>
              <TouchableNativeFeedback
              onPress={() => {this.props.navigation.navigate('Points');
            }}
            background = {TouchableNativeFeedback.Ripple('white',false)}
            hitSlop = {defaultHitSlop}>
            <View style={styles.button}>
            <Text style={styles.text}> See Points Table</Text>
            </View>
            </TouchableNativeFeedback>
            </View>

              </View>
              </ScrollView>
              </View>

            );
          }
        }

class GroupMatches extends React.Component {

  static navigationOptions = ({navigation}) => {
    return{
      title: 'Matches',
      headerRight :(
        <View style={{flexDirection:'row'}}>
        <TouchableNativeFeedback
        onPress={()=> {take.showDatePicker()}}
      background = {TouchableNativeFeedback.Ripple('white',false)}
      hitSlop = {defaultHitSlop}>
      <View style={styles.actionButton}>
      <Text style={styles.actionText}> Date </Text>
      </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
      onPress={()=> {navigation.navigate('MoreSamples')}}
    background = {TouchableNativeFeedback.Ripple('white',false)}
    hitSlop = {defaultHitSlop}>
    <View style={styles.actionButton}>
    <Text style={styles.actionText}> More </Text>
    </View>
    </TouchableNativeFeedback>
    </View>
      ),
    };
  };
  async showDatePicker(){
    try {
      DatePickerAndroid.open({
        date: new Date()
      }).then(function (date){
        console.log(date.action);
        if (date.action !== DatePickerAndroid.dismissedAction) {
          var newDate = new Date(date.year, date.month, date.day);
          console.log('selected date is: ', newDate);
        }
      });
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
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

    this.showDatePicker = this.showDatePicker.bind(this);

    this.state = {
      isLoading : true,
      dataSource : ds.cloneWithRows(row),
    };

    grpId = groupId;
    grpName = groupName;

    if (grpId === 0) {
      matchesUrl = 'http://10.0.1.125:8082/getAllMatches';
    }else {
      matchesUrl = 'http://10.0.1.125:8082/getAllMatches?grp='+grpId;
    }

  }

  loadMatches(){
    fetch(matchesUrl,{
      method: 'GET',
      headers : {'Content-Type':'application/json'},
    }).then((response) => response.json())
    .then((responseData) =>{
      console.log("Response  :"+responseData.status);
      console.log("Total Teams  :"+responseData.data.length);

      for (var i = 0; i < responseData.data.length; i++) {
        matches.push(responseData.data[i]);
      }

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.setState({
        isLoading : false,
        dataSource : ds.cloneWithRows(matches),
      });
    }).catch((err) =>{
      console.log("Error All Matches : "+err);
    });
  }
  componentDidMount(){
    this.loadMatches();
  }
  componentWillUnmount(){
    matches = [];
    this.props.navigation.setParams({showPicker:this.showDatePicker});
  }



  render()
  {
    take = this;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
        </View>
      );
    }

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

class Points extends React.Component {
  static navigationOptions = {
    title: 'Points',
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      tableData : [],
      refreshing: false,
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.loadData();
    this.setState({refreshing: false});

  }

  loadData(){
    var pointsTable = [{
                "teamId": 0,
                "teamName": "Country",
                "played": 'P',
                "won": 'W',
                "lost": 'L',
                "tie": 'T',
                "noResult": 'NR',
                "pts": 'PTS'
            }]

    fetch('http://10.0.1.125:8082/getPointsTable',{
      method : 'GET',
      headers :{'Content-Type':'application/json',},
    }).then((response) => response.json())
    .then((responseData) =>{
      console.log("Response  :"+responseData.status);
      console.log("Total Teams  :"+responseData.data.length);

      for (var i = 0; i < responseData.data.length; i++) {
        pointsTable.push(responseData.data[i]);
      }

      this.setState({
        isLoading: false,
        tableData: pointsTable,
      });

    }).catch((error) =>{
      console.log('Error Points table : '+error);
    });

  }

  componentDidMount(){
    this.loadData();
  }
  componentWillUnmount(){
    pointsTable = [];
  }
  renderTableView(item){

    if (item.teamId === 0) {
      return(
      <View style = {styles.ptHeaderContainer}>
      <Text style = {styles.ptHeaderColumn}>Team</Text>
      <Text style = {styles.ptHeaderRow}>P</Text>
      <Text style = {styles.ptHeaderRow}>W</Text>
      <Text style = {styles.ptHeaderRow}>L</Text>
      <Text style = {styles.ptHeaderRow}>T</Text>
      <Text style = {styles.ptHeaderRow}>NR</Text>
      <Text style = {styles.ptHeaderRow}>PTS</Text>
      </View>
    );

    }else {
      return(
      <View style = {styles.ptRowContainer}>
      <Text style = {styles.ptColumn}> {item.teamName} </Text>
      <Text style = {styles.ptRow}> {item.played} </Text>
      <Text style = {styles.ptRow}> {item.won} </Text>
      <Text style = {styles.ptRow}> {item.lost} </Text>
      <Text style = {styles.ptRow}> {item.tie} </Text>
      <Text style = {styles.ptRow}> {item.noResult} </Text>
      <Text style = {styles.ptRow}> {item.pts} </Text>
      </View>
    );
  }

  }

  _keyExtractor = (item, index) => item.teamName;

  render(){

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <View style={{padding:5,}}>
      <FlatList
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />}
      data = {this.state.tableData}
      keyExtractor={this._keyExtractor}
      numColumns = {1}
      renderItem = {({item}) => this.renderTableView(item)}
      />
      </View>
    );

  }
}

class Indicators extends React.Component{
  static navigationOptions = {
    title: 'Indicators',
  };
  constructor(props){
    super(props);
    this.state={
      tableData : [
        {'name':'Player','op':'Vs','year':'Period','inns':'Inns','runs':'Runs','sr':'S/R','cen':'100s'},
        {'name':'Virat Kohli','op':'SA','year':'2017-2018','inns':'6','runs':'588','sr':'99.46','cen':'3'},
        {'name':'Rohit Sharma','op':'SA','year':'2017-2018','inns':'6','runs':'588','sr':'99.46','cen':'3'},
        {'name':'Shikhar Dhavan','op':'SA','year':'2017-2018','inns':'6','runs':'588','sr':'99.46','cen':'3'},
      ]
    }

  // const { params } = this.props.navigation.state;
  // const maId = params ? params.matchId : null;
  //
  // matchId =  maId;
  // console.log("matchId : "+matchId);

  }

  renderTableView(item){
    console.log("Index : "+item.name);
    if (item.name === 'Player') {
      return(
      <View style = {{flexDirection:'row'}}>
      <Text style = {styles.headerColumn}>{item.name}</Text>
      <Text style = {styles.headerRow}>{item.op}</Text>
      <Text style = {styles.headerRow}>{item.year}</Text>
      <Text style = {styles.headerRow}>{item.inns}</Text>
      <Text style = {styles.headerRow}>{item.runs}</Text>
      <Text style = {styles.headerRow}>{item.sr}</Text>
      <Text style = {styles.headerRow}>{item.cen}</Text>
      </View>
    );

    }else {
      return(
      <View style = {{flexDirection:'row'}}>
      <Text style = {styles.column}>{item.name}</Text>
      <Text style = {styles.row}>{item.op}</Text>
      <Text style = {styles.row}>{item.year}</Text>
      <Text style = {styles.row}>{item.inns}</Text>
      <Text style = {styles.row}>{item.runs}</Text>
      <Text style = {styles.row}>{item.sr}</Text>
      <Text style = {styles.row}>{item.cen}</Text>
      </View>
    );
  }

  }

  _keyExtractor = (item, index) => item.name;

  render()
  {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#ebeef0'}}>
      <Text style={{margin: 10, fontSize: 25, textAlign: 'left'}}>I am in the Drawer!</Text>
      </View>
    );

    const tableHead = ['Player','Against','Season','Innings','Runs','SR','100s'];

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

      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             The series began with two of the best top three in the world pitted against each other - Rohit Sharma, Shikhar Dhawan and Virat Kohli against Hashim Amla, Quinton de Kock and Faf du Plessis. After two weeks and six ODIs, only one of them could stand up to the challenges while the other just capitulated. It did no good to the hosts when de Kock and du Plessis were ruled out afte
      first two ODIs with injuries. "Amla's" wretched run against India continued as he averaged only 25.66 in the series with a solitary fifty. His tally of 154 runs in the series was the highest for South Africa and that captured their "team's" woeful performance with the bat.
      </Text>
      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             In comparison, there were hundreds from one of "India's" top three in five of the six innings missing out only in the second ODI where the target was only 119. The trio scored 76.33% of "India's" runs off the bat in the whole series making it the fourth highest contribution from the top three in a bilateral series of five or more ODIs. Out of the 17 times an Indian batsman went past 20, nine times they crossed 50, converting five of them to hundreds. On the other hand, the South African players could score fifty-plus only four out of the 27 times they went past 20. Aiden Markram was the prime example of failure to convert starts, reaching 20 four times in six innings but failed to go past 32.
      </Text>

      <Text style={{paddingLeft:15,fontWeight:'bold',textAlign:'left',}}>Kohli in a league of his own</Text>
      <Text style={{padding:15,lineHeight:28,textAlign:'justify',fontFamily:'sans-serif-condensed'}}>             Kohli started the series with a score to settle in South Africa as it was the only nation where he "hadn't" registered an ODI century. After the end of the series, he has the joint most hundreds by any player against the home team in South Africa, sitting alongside Kevin Pietersen with three each. He ended the series at a scarcely believable tally of 558 runs from six innings - the most ever by a player in a bilateral series of any length. Such was his dominance in the series that no bowler could dismiss him for a score less than 75.
      The gap between him and the rest was so much that only Dhawan (323 runs) managed to score more than one-third of "Kohli's" aggregate in the series. The top four leading run-getters for South Africa in the series managed only 511 runs between them, 47 less than "Kohli's" tally which underlines his rich vein of form. He also became the first Indian batsman to score three centuries in a bilateral series.
      </Text>

      <Text style={{paddingLeft:15,fontWeight:'bold',textAlign:'left',}}>Most runs in a bilateral series</Text>

      <View style={{justifyContent: 'center',alignItems: 'center',}}>
      <TouchableHighlight onPress={() => {this.props.navigation.navigate('Gallery')}} >
      <Image source={{uri : 'https://i.ndtvimg.com/i/2017-09/virat-kohli-afp_806x605_61504455574.jpg'}}
      style={{width:350,height:300,margin:25}} alt="Virat Kohli"
      />
      </TouchableHighlight>
      </View>
      </View>
      <View style={styles.tableContainer}>
      <FlatList style={styles.table}
      data = {this.state.tableData}
      keyExtractor={this._keyExtractor}
      numColumns = {1}
      renderItem = {({item}) => this.renderTableView(item)}
      />
      </View>



      </View>
      </View>
      </ScrollView>

      </DrawerLayoutAndroid>
    );
  }
}

class Gallery extends React.Component {
  static navigationOptions = {
    title: 'Gallery',
  };
  constructor(props) {
    super(props);
    this.state = {
      images : [],
      selectedUri : '',
      fetchParams : {first : 20,assetType: 'Photos'},
    }

  }

  componentDidMount(){
    CameraRoll.getPhotos(this.state.fetchParams)
    .then( r =>{
      this.setState({
          images: r.edges,
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render(){
    return(
      <ScrollView style = {{flex:1}}>
      <View style = {styles.imageGrid}>
      {this.state.images.map((p,i) =>{
        return(
          <TouchableHighlight key ={i} onPress = {() => {this.props.navigation.navigate('ImagePreview',{
              imageUri : p.node.image.uri,
              pos:i,
              imageArray : this.state.images,
          });}
        } >

          <Image style = {styles.image} source = {{uri : p.node.image.uri}}
           />
          </TouchableHighlight>
        );
      })}
      </View>
      <Button onPress={() => this.props.navigation.navigate('CameraExample')} title="Click Photo"></Button>
      </ScrollView>
    );
  }
}

class CameraExample extends React.Component {
  static navigationOptions = {
    title: 'CameraExample',
  };

  takePicture() {
      const options = {};
      this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
   }
  render(){
    return(
      <View style = {styles.container}>
            <Camera
               ref = {(cam) => {
                  this.camera = cam;
               }}
               style = {styles.preview}
               type = {Camera.constants.Type.front}
               aspect = {Camera.constants.Aspect.fill}>
            </Camera>
            <Text style = {styles.capture} onPress = {this.takePicture.bind(this)}>CAPTURE</Text>
         </View>
    );
  }
}

class MoreSamples extends React.Component {
  static navigationOptions = {
    title: 'MoreSamples',
  };
  constructor(props) {
    super(props);
    this.state = {
      time : new Date().toLocaleString(),
      tick : 30,
      tickText : 'Reamining Time : 30',
      pageNumber:0,
    };

  }
  componentDidMount(){
    setInterval(() =>{
      this.setState({time : new Date().toLocaleString(),})
      if (this.state.tick > 0) {
        this.setState({
          tick : this.state.tick - 1,
          tickText: "Reamining Time : "+this.state.tick
        })
      }else {
        this.setState({tickText: 'Time Completed'})
      }
    },1000);
  }

  pageChanged(page){
    this.setState({
      pageNumber : page,
    });
  }

  render(){
    return(
      <ViewPagerAndroid style = {styles.viewPager}
      onPageSelected = {(e) =>
      {this.pageChanged(e.nativeEvent.position);}}
      initialPage={0}>
      <View style = {styles.pageStyle} key = '1'>
      <View style = {{flexDirection:'column',flex:1}}>
      <Text style = {{textAlign:'center',fontWeight:'bold'}}>React Native {this.state.pageNumber}</Text>
      <Text style = {{textAlign:'center',fontWeight:'bold'}}>{this.state.time}</Text>
      <WebView
      source = {{uri: 'https://github.com/facebook/react-native'}}
      style = {{marginTop:10}}
      onLoad = {()=> console.log("Loading finished")}
      onError = {() => console.log('Load failed')}
      onLoadStart = {() => console.log('Loading starts')}
      startInLoadingState = {true}
      renderLoading = {() => {return(<ActivityIndicator color='#104977' size='large'
        style = {{position:'absolute',top:0,bottom:0,left:0,right:0}}
        />);}}
      />
      </View>
      </View>
      <View style = {styles.pageStyle} key = '2'>
      <View style = {{flexDirection:'column',flex:1}}>
      <Text style = {{textAlign:'center',fontWeight:'bold'}}>Google {this.state.pageNumber}</Text>
      <Text style = {{textAlign:'center',fontWeight:'bold'}}>{this.state.tickText}</Text>

      <WebView
      source = {{uri: 'https://www.google.co.in/'}}
      style = {{marginTop:10}}
      startInLoadingState = {true}
      renderLoading = {() => {return(<ActivityIndicator color='#104977' size='large'
        style = {{position:'absolute',top:0,bottom:0,left:0,right:0}}
        />);}}
      />
      </View>
      </View>
      </ViewPagerAndroid>
    );
  }
}

class ImagePreview extends React.Component {
  static navigationOptions = {
    title: 'ImagePreview',
    header:null,
  };
  constructor(props) {
    super(props);
    this.state = {
      pageNumber:0,
    };

    const { params } = this.props.navigation.state;
     imageUri = params ? params.imageUri : null;
     pos = params ? params.pos:0;
     imageArray = params ? params.imageArray : null;
    console.log('Image pos :'+pos);
    console.log('Image array :'+imageArray.length);
  }
  render(){
    return(
      <ViewPagerAndroid style={styles.viewPager}
      onPageSelected = {(e) => console.log("selected page :"+e.nativeEvent.position)}
      initialPage={pos}
      >
      {imageArray.map((p,i)=>{
        return(
          <View style= {{flex:1}} key = {i} >
          <Image style= {{flex:1}}source={{uri : p.node.image.uri}}/>
          </View>
        );
      })}

      </ViewPagerAndroid>
    );
  }
}

const RootStack = StackNavigator(
  {
    Login :{
      screen : Login,
    },
    SignUp :{
      screen : SignUp,
    },
    Home: {
      screen : HomeScreen,
    },
    Matches:{
      screen : GroupMatches,
    },
    Indicators : {
      screen : Indicators,
    },
    Points :{
      screen : Points,
    },
    MoreSamples : {
      screen : MoreSamples,
    },
    Gallery : {
      screen : Gallery,
    },
    CameraExample : {
      screen : CameraExample,
    },
    ImagePreview : {
      screen : ImagePreview,
    },

  },
  {
    initialRouteName : 'Login',
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'steelblue',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

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
    fontFamily :'Roboto',
  },
  header: {
    textAlign: 'center',
    color: 'steelblue',
    padding: 8,
    fontWeight:'bold',
    fontSize: 20,
    backgroundColor:"skyblue",
    fontFamily :'Roboto',
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontFamily :'Roboto',
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
    fontSize : 23,
    backgroundColor:'steelblue',
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontFamily :'Roboto',
  },
  cardText: {
    fontSize : 23,
    padding: 5,
    fontWeight:'600',
    textAlign: 'center',
    fontFamily :'Roboto',
  },
  cardTextInfo: {
    padding:2,
    color:'steelblue',
    fontSize:13,
    alignSelf: 'center',
    fontFamily :'Roboto',
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
    fontFamily :'Roboto',
  },
  button: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'steelblue',
    marginBottom: 20,
  },
  actionButton : {
    backgroundColor :'steelblue',
    marginRight:10,
  },
  actionText: {
    textAlign :'center',
    color :'white',
    padding: 8,
    fontWeight:'800',
    fontSize:18,
    fontFamily:'Roboto'
  },
  headerRow : {
    textAlign : 'center',
    fontSize:12,
    backgroundColor:'steelblue',
    color: 'white',
    fontWeight:"500",
    paddingLeft:6,
    paddingRight:6,
    paddingTop:3,
    paddingBottom:3,
  },
  row :{
    textAlign :'center',
    fontSize:12,
    paddingLeft:6,
    paddingRight:6,
    paddingTop:3,
    paddingBottom:3,
  },
  headerColumn : {
    textAlign : 'center',
    width: 120,
    fontSize:12,
    backgroundColor:'steelblue',
    color: 'white',
    fontWeight:"500",
    padding: 3,

  },
  column: {
    textAlign :'center',
    width: 120,
    fontSize:12,
    padding : 3,
  },
  tableContainer:{
    alignItems : 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  table : {
    borderRadius : 4,
    borderWidth : 1,
    borderColor : 'steelblue',
  },
  ptHeaderContainer :{
    flexDirection:'row',
    backgroundColor:'steelblue',
    padding:5
  },
  ptRowContainer :{
    flexDirection:'row',
    padding:5,
    borderLeftWidth:0.5,
    borderRightWidth:0.5,
    borderBottomWidth:0.4,
    borderColor:'steelblue',
  },
  ptHeaderRow :{
    marginRight:5,
    textAlign:'center',
    flex:0.3,
    color:'white',
    fontWeight:'bold',
  },
  ptRow :{
    marginRight:5,
    textAlign:'center',
    flex:0.3,
  },
  ptHeaderColumn :{
    flex:1,
    color:'white',
    fontWeight:'bold',
  },
  ptColumn :{
    flex:1,
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    padding: 10,
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  image: {
      width: 150,
      height: 150,
      margin: 10,
      borderRadius:4,
  },
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
   },
   capture: {
      fontSize: 30,
      color: 'red',
      alignSelf: 'center',
   },
});

export default App;
