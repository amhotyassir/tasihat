// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,StatusBar,Linking, Alert ,TouchableWithoutFeedback,Modal, Vibration} from 'react-native';
import {nativeBaseProvider,Icon, NativeBaseProvider} from 'native-base';
import { Ionicons } from "@expo/vector-icons";

export default function App() {
 const [num,setNum]=React.useState(0)
 const [tasbihat,setTasbihat]=React.useState({})
const [tsbih,setTsbih]=React.useState('سبحان الله')
const [modalVisible,setModalVisible]=React.useState(true)
const [limit,setLimit]=React.useState('100')
// const obj={
//   la_ilaha_ila_lah:{
//     label:'',
//   num:0},
//   subhana_lah:{
//     label:'سبحان الله',
//     num:0
//   },
//   alhamdu_lilah:{
//     label:'الحمد لله',
//     num:0
//   },
//   allaho_akbar:{
//     label:'الله أكبر',
//     num:0
//   },
//   la_ilaha_ila_lah:{
//     label:'لا إله إلا الله وحده لا شريك له له الملك و له الحمد و هو على كل شيء قدير',
//     num:0
//   },
//   asalato_3la_nabiy:{
//     label:'الصلاة على الرسول',
//     num:0
//   }
// }
 const addOne=()=> {
  // console.log(limit,'   ',(num+1).toString())
  if ((num+1).toString()===limit.toString()){
    Vibration.vibrate(1000)
  }
  setNum(num+1)
  
 }
 let buttons=['10','15','33','34','100'].map((item)=>{

  return <View key={parseInt(item)} style={{margin:15}}>
    <TouchableOpacity onPress={()=>{
      setLimit(parseInt(item))
      setModalVisible(false)
    }} style={{width:40,height:40,alignItems:'center',justifyContent:'center',borderWidth:0.7,borderRadius:10,backgroundColor:'yellow'}}>
      <Text style={{fontWeight:'bold',textAlign:'center'}}>{item}</Text>
    </TouchableOpacity>
  </View>
 })
  return (<NativeBaseProvider>
    <TouchableWithoutFeedback onPress={addOne} >
    <View style={{flex:1}}>
      <View style={{height:100,backgroundColor:'white',width:'100%',marginTop:StatusBar.currentHeight+50}}>
        {/* <TouchableOpacity style={{borderWidth:0.8,borderRadius:10,width:250,height:40,backgroundColor:'yellow',alignSelf:'center',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
          <View style={{flexDirection:'row',margin:5,justifyContent:'center',flex:1}}>
            <Text style={{marginRight:7,fontWeight:'bold'}}>{tsbih}</Text>
            <Icon name='chevron-down-outline' size={5} as={Ionicons}/>
          </View>
        </TouchableOpacity> */}
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
              {buttons}
            </View>
          </View>
        </View>
      </Modal>
      </View>
      <View style={{alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <View style={{height:300,alignSelf:'center',alignItems:'center'}}>
        <View style={{width:220,height:220,borderRadius:220,backgroundColor:'silver',borderWidth:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPressOut={addOne} style={{width:200,height:200,backgroundColor:'lightgreen',borderRadius:200,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',fontSize:64,fontWeight:'bold'}}>{num}</Text>
          </TouchableOpacity>
        </View>
        
          <TouchableOpacity onPressOut={()=>{
            setNum(Math.max(0,num-1))
          }} style={{width:40,height:40,borderRadius:40,backgroundColor:'red',marginTop:-200,borderWidth:0.6,marginLeft:230,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:13,fontWeight:'bold'}}>-1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width:80,height:50,alignItems:'center',justifyContent:'center',marginTop:120,marginLeft:230}}>
            <Text style={{textAlign:'center',fontSize:22}}>/ {limit}</Text>
          </TouchableOpacity>
      </View>
        <TouchableOpacity onPress={()=>{
           Alert.alert("Sure?", "Initiate ?", [
            {
                text: "No",
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => {
                    setNum(0),setModalVisible(true)
                },
            },
        ]);
        }} style={{width:100,height:40,backgroundColor:'cyan',marginTop:0,borderWidth:0.5,borderRadius:8,alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
          <Text style={{fontSize:15,fontWeight:'bold'}}>
            {'<--'}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
    </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height:'15%',
    width:'95%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
