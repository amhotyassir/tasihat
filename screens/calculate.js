// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar,BackHandler, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, Modal, Vibration, TextInput, Keyboard, ScrollView } from 'react-native';
import { Icon, NativeBaseProvider } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
// import {StatusBar as expoStatusBar}  from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { storeData } from './store';
// import DropDownPicker from 'react-native-dropdown-picker';
import Record from './record';
import CustomizedDropDown from './dropDown';

// const Stack = createStackNavigator();

export default function Calculate() {
  const [num, setNum] = React.useState(0)
  const [tasbihat, setTasbihat] = React.useState({})
  const [tsbih, setTsbih] = React.useState({})
  const [open, setOpen] = React.useState(false)
  const date = new Date()
  const index = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
  const [open2, setOpen2] = React.useState(false)
  const [value, setValue] = React.useState(null)
  const [text, setText] = React.useState('')
  const [history, setHistory] = React.useState([])
  const [begin, setBegin] = React.useState(null)
  const [modalVisible, setModalVisible] = React.useState(true)
  const [limit, setLimit] = React.useState('100')
  React.useEffect(() => {
    const backAction = () => {
        // navigation.pop()
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
}, []);
  React.useEffect(() => {

    // console.log('Date = ',index)
    setBegin(date.getHours() + ':' + (parseInt(date.getMinutes()) > 9 ? date.getMinutes() : '0' + date.getMinutes()))
    async function getData() {
      try {
        await AsyncStorage.getItem('All').then((value) => {
          // console.log(JSON.parse(value))
          if (value) {
            // console.log('all ', JSON.parse(value))
            setTasbihat(JSON.parse(value))

          }
        })
        await AsyncStorage.getItem('history').then((value) => {
          // console.log(value)
          if (value) {
            setHistory([...JSON.parse(value).data])

          }
        })
      } catch {

      }
    }
    getData()

  }, [])
  const addOne = () => {
    // console.log(limit,'   ',(num+1).toString())
    Vibration.vibrate(90)
    if (!begin) {
      setBegin(date.getHours() + ':' + (parseInt(date.getMinutes()) > 9 ? date.getMinutes() : '0' + date.getMinutes()))
    }
    if ((num + 1).toString() === limit.toString()) {
      Vibration.vibrate(1000)
    }
    setNum(num + 1)


  }
  let buttons = ['10', '15', '33', '34', '100'].map((item) => {
    return <View key={parseInt(item)} style={{ margin: 15 }}>
      <TouchableOpacity onPress={() => {
        setLimit(parseInt(item))
        setModalVisible(false)
      }} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0.7, borderRadius: 10, backgroundColor: 'yellow' }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item}</Text>
      </TouchableOpacity>
    </View>
  }).concat(<View key={'infini'} style={{ margin: 15 }}>
    <TouchableOpacity onPress={() => {
      setLimit('∞')
      setModalVisible(false)
    }} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 0.7, borderRadius: 10, backgroundColor: 'yellow' }}>
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>∞</Text>
    </TouchableOpacity>
  </View>)
  // return<Record tasbihat={tasbihat} />
  // return <CustomizedDropDown data={tasbihat}/>
  return (<NativeBaseProvider>
    
    <TouchableWithoutFeedback onPress={addOne} >
      <View style={{ flex: 1 }}>
        <View style={{ height: 100, width: '100%', marginTop: StatusBar.currentHeight + 50 }}>
          <View >
            <TouchableOpacity onPress={() => {
              let x = { ...tasbihat }
              x[index] = x[index] || []
              x[index] = [...x[index], { label: tsbih.label, num: num, key: begin + ' - ' + date.getHours() + ':' + (parseInt(date.getMinutes()) > 9 ? date.getMinutes() : '0' + date.getMinutes()) }]
              Alert.alert("تأكيد", "حفظ ؟", [
                {
                  text: "لا",
                  style: "cancel",
                },
                {
                  text: "نعم",
                  onPress: () => {
                    setNum(0), setModalVisible(true), setBegin(null)
                    storeData('All', x)
                    setTasbihat(x)
                  },
                }])

            }} style={{ borderWidth: 0.5, borderColor: 'silver', borderRadius: 10, width: 60, height: 40, alignItems: 'center', backgroundColor: 'orange', justifyContent: 'center', alignSelf: 'flex-end', marginRight: 25 }}>
              <Text style={{ textAlignVertical: 'center', textAlign: 'center', fontSize: 21, fontWeight: 'bold' }}>تم</Text>
            </TouchableOpacity>
          </View>
          {/* <expoStatusBar /> */}
          <Modal
            animationType="none"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {

            }}

          >
            <View style={styles.centeredView}>
              <View style={styles.modalView }>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={open2}
                  onRequestClose={() => {

                    setOpen2(!open2);
                  }}
                >
                  {/* <ScrollView> */}
                  <View style={styles.centeredView}>
                    <View style={[styles.modalView,{height:'100%',width:'100%'}]}>
                      <TouchableOpacity onPress={()=>setOpen2(false)} style={{width:55,height:35,backgroundColor:'orange',borderWidth:2,alignSelf:'flex-start',borderColor:'silver',borderRadius:9}}>
                        <Text style={{fontWeight:'bold',fontSize:15,textAlign:'center',textAlignVertical:'center',flex:1}}>{'<'}</Text>
                      </TouchableOpacity>
                      <Record tasbihat={tasbihat} />
                    </View>
                  </View>
                  {/* </ScrollView> */}
                </Modal>

                <KeyboardAvoidingView style={{ width: '100%', justifyContent: 'center', marginBottom: 30 }}>

                  <View style={{ flexDirection: 'row', width: '100%', height: 40, marginBottom: 20, alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                    <TextInput placeholder='دعاء جديد' value={text} style={{ width: '60%', height: 35, textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }} onChangeText={setText} />
                    <TouchableOpacity onPress={() => {
                      Alert.alert("تأكيد", "حفظ ؟", [
                        {
                          text: "لا",
                          style: "cancel",
                        },
                        {
                          text: "نعم",
                          onPress: () => {
                          let x = [...history, { label: text.toString(), value: text.toString() }]
                          // console.log('here   ', x)
                          storeData('history', { data: x })
                          setHistory(x)
                          setText('')
                          },
                        }])
                      
                    }} style={{ alignItems: 'center', justifyContent: 'center', width: 60, height: 35, backgroundColor: 'lightgreen', borderRadius: 10, borderWidth: 1 }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', }}>حفظ</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <CustomizedDropDown data={history} value={value} setValue={setValue} />

                </KeyboardAvoidingView>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20, opacity: !open ? 1 : 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>{buttons.slice(0, 3)}</View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>{buttons.slice(3, 6)}</View>
                </View>
                <TouchableOpacity onPress={()=>{
                  setOpen2(true)
                }} style={{ width: 37, height: 37, backgroundColor: 'lightblue', borderWidth: 2, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: -450, marginRight: 0, borderColor: 'silver', alignSelf: 'flex-end' }}>
                  <Icon as={Ionicons} name='reorder-three' size={6} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <View style={{ height: 300, alignSelf: 'center', alignItems: 'center' }}>
            <View style={{ width: 220, height: 220, borderRadius: 220, backgroundColor: 'silver', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPressOut={addOne} style={{ width: 200, height: 200, backgroundColor: 'lightgreen', borderRadius: 200, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 64, fontWeight: 'bold' }}>{num}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPressOut={() => {
              Vibration.vibrate(90)
              setNum(Math.max(0, num - 1))
            }} style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'red', marginTop: -200, borderWidth: 0.6, marginLeft: 230, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>-1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 80, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 120, marginLeft: 230 }}>
              <Text style={{ textAlign: 'center', fontSize: 22 }}>/ {limit}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
            Alert.alert("تأكيد", "إلغاء ؟", [
              {
                text: "لا",
                style: "cancel",
              },
              {
                text: "نعم",
                onPress: () => {
                  setNum(0), setModalVisible(true), setBegin(null)
                },
              },
            ]);
          }} style={{ width: 100, height: 40, backgroundColor: 'cyan', marginTop: 0, borderWidth: 0.5, borderRadius: 8, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
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
    height: 380,
    width: '95%',
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
