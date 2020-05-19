import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInputComponent, Alert ,Image, AsyncStorage} from 'react-native';
import MyHeader from './MyHeader';
import { TextInput, List, Card,Button } from 'react-native-paper';
import LinearGradient  from 'react-native-linear-gradient'
class HomeScreen extends Component {

    state={
        info:{
            name:"loading !!",
            temp: "loading !!",
            humidity: "loading !!",
            desc: "loading !!",
            icon: "loading !!"
            
        }
    }
   
  async getWeather(){
      Mycity=await AsyncStorage.getItem('mericity');
      if(!Mycity){
      Mycity=this.props.navigation.getParam('city','karachi')
      }
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=d88d5cee691d111cfe739a25387438ba`)
      .then(res=>res.json())
      .then(data=>{
       this.setState({
           info:{
               name: data.name,
               temp: data.main.temp,
               humidity: data.main.humidity,
               desc: data.weather[0].description,
               icon: data.weather[0].icon
           }
       
       })
    }).catch(err=>{
        Alert.alert("Error"+err.message+"Please connect to internet",[{text:"ok"}])
    })
  
  
    }
  
  componentDidMount(){
      this.getWeather()
  }
    render() {
        console.log(this.state.info)
        if(this.props.navigation.getParam('city')){
            this.getWeather()
        }

        return (
            <View style={styles.container}>
                <MyHeader title="current waether"/>
               
                <Card style={{ margin: 20 }}>
                 
                    <View style={{padding:20,alignItems:'center'}}>
                        <Text style={styles.text}>{this.state.info.name}</Text>
                        <Image style={{width:120,height:120}}
                            source={{
                                uri: 'http://openweathermap.org/img/w/' + this.state.info.icon +'.png'}}
                        />
                        <Text style={styles.text}>Temperature: {this.state.info.temp}</Text>
                        <Text style={styles.text}>Description: {this.state.info.desc}</Text>
                        <Text style={styles.text}>humidity: {this.state.info.humidity}</Text>

                    </View>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'

    },
    text:{
        textAlign:"center",
        marginBottom:10,
            fontSize:20
    }
});
export default HomeScreen;
