import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInputComponent, AppRegistry, AsyncStorage } from 'react-native';
import MyHeader from './MyHeader';
import { TextInput, List, Card,Button } from 'react-native-paper';

class SearchScreen extends Component {
    state = {
        text: '',
        cities: []
    };
    async buttonclick(){
        console.log("clicked")
        this.props.navigation.navigate('current city',{city:this.state.text})
        await AsyncStorage.setItem("mericity",this.state.text)
    }
    async Listclicked(name){
             this.setState({text:name})
        await AsyncStorage.setItem("mericity", this.state.text)
        this.props.navigation.navigate('current city', { city: this.state.text })


    }
    fetchCities(text) {
        this.setState({ text })
        fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
            .then(data => data.json())
            .then(city => {
                this.setState({
                    cities: city.RESULTS.slice(0, 9)
                })
            })
        console.log(this.state.cities)
    }
    render() {
        renderCity = <Card><List.Item title="no cities" /></Card>
        if (this.state.cities.length > 0) {
            renderCity = this.state.cities.map(city => {
                return (
                    <Card style={{ margin: 5 }} key={city.lat} onPress={()=> this.Listclicked(city.name)}>
                        <List.Item title={city.name} />
                    </Card>
                )
            })
        }
        return (
            <View style={styles.container}>
                <MyHeader  title="select  city"/>
                <TextInput
                    label='Email'
                    value={this.state.text}
                    onChangeText={text => this.fetchCities(text)}
                />
                <Button mode="contained" style={{margin:20}} onPress={()=>this.buttonclick()}>
                 save changes
                </Button>
                <ScrollView>
                    {renderCity}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'

    },
});
export default SearchScreen;
