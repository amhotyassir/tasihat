
import { Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet,View,Text, TouchableOpacity ,Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import { storeData } from './store';

const DropdownComponent = ({data,value,setValue,setHistory}) => {
//   const [value, setValue] = useState(null);
    // console.log('Data = ',data)
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={200}
      labelField="label"
      valueField="key"
      placeholder={value||"قائمة"}
      searchPlaceholder="بحث ..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderItem={(item,index)=>{
        return <View 
        // style={{width:'80%',alignItems:'center',flexDirection:'row'}}
        style={{marginLeft:20,marginRight:20,borderBottomWidth:0.5,alignItems:'center',padding:18,justifyContent:'space-between',flexDirection:'row-reverse'}}
        >
            <Text 
            style={{textAlign:'right',width:'80%',fontWeight:'bold'}}
            >{item.label}</Text>
            <TouchableOpacity onPress={()=>{
              Alert.alert("تأكيد", "حذف ؟", [
                {
                  text: "لا",
                  style: "cancel",
                },
                {
                  text: "نعم",
                  onPress: () => {
                    let x=[...data]
                    x.splice(index,1)
                    // console.log('data= ',data)
                    // console.log('now data = ',x)
                    storeData('history',{data:x})
                    setHistory(x)
                  },
                }])
            }} style={{width:15,height:15}}>
                <Icon as={Ionicons} name='trash'size={4} color='black' 
                
                />
             </TouchableOpacity>
        </View>
      }}
    //   renderLeftIcon={() => (
    //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    //   )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});