import React from "react";
import {View,Text,ScrollView,FlatList,StatusBar} from 'react-native'


export default function Record({tasbihat}){
    const arr=Object.keys(tasbihat)
    return(<View style={{flex:1,marginTop:15+StatusBar.currentHeight}}>
        {/* // <ScrollView style={{width:'100%'}}> */}
        {/* <Text style={{marginTop:StatusBar.currentHeight}}>zdlfzel</Text> */}
            <FlatList 
            style={{width:'100%',alignSelf:'center'}}
            data={Object.values(tasbihat)}
            renderItem={({item,index})=>{
                // console.log('h')
                return <View style={{width:'100%',borderWidth:2}}>
                    <Text style={{textAlign:'center',textAlignVertical:'center',fontWeight:'bold',fontSize:20,marginBottom:20,marginTop:10}}>{arr[index]}</Text>
                    {item.map((itm)=>{
                        return <View style={{flexDirection:'row',width:'100%',height:30,borderBottomWidth:0.6,alignItems:'center'}}>
                            <Text style={{width:'33%',textAlign:'center'}}>{itm.key}</Text>
                            <Text style={{width:'33%',textAlign:'center',borderLeftWidth:0.5}}>{itm.label} </Text>
                            <Text style={{width:'33%',textAlign:'center',borderLeftWidth:0.5}}> {itm.num} مرات  </Text>
                            
                        </View>
                    })}

                </View>
            }} /></View>
        // </ScrollView>

    )
} 