import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList} from 'react-native';
import * as firebase from 'firebase'
import db from '../Config'

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      allTransactions:[],
      lastTransction:null,
      search:'',

    }
  }  
  
  fetchMoreTransaction = async ()=>{
    var text = this.state.search.toUpperCase();
    var enterText = text.split('')

    if(enterText[0].toUpperCase()==='B'){
      const Query= await db.collection('transactions').where('bookId','==',text).startAfter(
        this.state.lastTransction
      ).limit(10).get()
      Query.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastTransction:doc
        })
      })
    }else if(enterText[0].toUpperCase()==='Students'){
      const Query= await db.collection('transactions').where('bookId','==',text).startAfter(
        this.state.lastTransction
      ).limit(10).get()
      Query.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastTransction:doc
        })
      })
    }

  }

  searchTransaction = async (text)=>{
    var enterText=text.split('')
    if(enterText[0].toUpperCase() === 'B'){
      const variable= await db.collection('transactions').where('bookId','==',text).get()
      variable.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastTransction:doc
        })
      })
    }else if(enterText[0].toUpperCase() === 'Students'){
      const variable= await db.collection('transactions').where('studentId','==',text).get()
      variable.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastTransction:doc
        })
      })
    }
  }

   componentDidMount = async ()=>{
    const Query = await db.collection('transactions').get()
    Query.docs.map((doc) =>{
      this.setState({
        allTransactions:[],
        lastTransction:doc,
      })
    })
  }

  render() {
      return (

        <View style={styles.container}>
        <View style={styles.searchBar}>
        <TextInput placeholder={'Enter Student of Book Id'} onChangeText={(text)=>{
          this.setState({
            search:text,

          })
        }} style={styles.bar}>
         
        </TextInput>
        <TouchableOpacity onPress={()=>{
            this.searchTransaction(this.state.search)
          }} style={styles.searchButton}>
          <Text> Search
          </Text>
        </TouchableOpacity>
        </View>

        <FlatList data={this.state.allTransactions}
          renderItem={({item})=>{
            <View style={{borderBottomWidth: 3}}>
            <Text>{'Book Id:'+item.bookId}</Text>
            <Text>{'Student Id:'+item.studentId}</Text>
            <Text>{'Transaction Type:'+item.transactionType}</Text>
            <Text>{'Date:'+item.date}</Text>
          </View>
          }}
        
          keyExtractor={(item,index)=>index.toString()}

          onEndReached={this.fetchMoreTransaction}
          onEndReachedThreshold={0.5}
        />
        
        
        </View>
      );
    }
  }

  const styles=StyleSheet.create({
    bar:{ borderWidth:2, height:30, width:300, paddingLeft:10, },
    searchButton:{ borderWidth:1, height:30, width:50, alignItems:'center', justifyContent:'center', backgroundColor:'green' },
    searchBar:{ flexDirection:'row', height:40, width:'auto', borderWidth:0.5, alignItems:'center', backgroundColor:'grey', },
container: { flex: 1, marginTop: 20 },
  })
