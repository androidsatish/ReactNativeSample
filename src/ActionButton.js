import React from 'react';
import { StyleSheet, View, Text,TouchableNativeFeedback} from 'react-native';
const defaultHitSlop = { top: 15, bottom: 15, right: 15, left: 15 };

class ActionButton extends React.Component {
  constructor(props) {
    super(props);

  }

  render(){
    console.log("navigation options : "+this.props.par);

    return(
      <TouchableNativeFeedback
      onPress={()=> {this.props.par}}
    background = {TouchableNativeFeedback.Ripple('white',false)}
    hitSlop = {defaultHitSlop}>
    <View style={styles.button}>
    <Text style={styles.text}> {this.props.text}</Text>
    </View>
    </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
button : {
  backgroundColor :'steelblue',
  marginRight:10,
},
text : {
  textAlign :'center',
  color :'white',
  padding: 8,
  fontWeight:'400',
  fontSize:18,
},
});

export default ActionButton;
