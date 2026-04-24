import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={myStyles.container}>
      <Text style={myStyles.text}>IoT Final Project</Text>
    </View>
    
  );
}

const myStyles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
  },
  text:{
    color: 'blue',
    fontSize: 30,
  }
});
