import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image, FlatList, KeyboardAvoidingView, Alert} from 'react-native';
import * as firebase from 'firebase'
import db from '../Config'

export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
        }
    }

    login = async (email,password)=>{
        if(email && password){
            try{
              const response = await firebase.auth().signInWithEmailAndPassword(email,password) 
              if (response){
                  this.props.navigation.navigate('Transaction')
              }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                    Alert.alert('This user does not exist.')
                    break;

                    case 'auth/invalid-email':
                    Alert.alert('Incorrect Email or Password')
                    break;
                }
            }
        }else{ 
            Alert.alert('Please enter the correct Email ID and Password.')
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoiding}>
                <View>
                <Image source={require("../assets/booklogo.jpg")} 
                style={{width:200, height: 200}}/>
                </View>
                <View>
                <TextInput 
                    style={styles.loginBox}
                    placeholder="Enter Email Id" keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                        emailId: text
                        })
                    }}
                    />

                <TextInput 
                    style={styles.loginBox}
                    placeholder="Enter Passwod" secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                        password: text
                        })
                    }}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress={()=>{
                        this.login(this.state.emailId,this.state.password) 
                    }}
                    style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }       
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    loginBox: { width: 300, height: 40, borderWidth: 1.5, fontSize: 20, margin:10, paddingLeft:10 },
    loginButton:{
        height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7
    },
    loginButtonText:{
        textAlign:'center'
    },
    keyboardAvoiding:{
        alignItems:'center',marginTop:20
    }
  });