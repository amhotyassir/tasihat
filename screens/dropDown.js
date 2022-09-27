
import { Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet,View,Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";

const DropdownComponent = ({data,value,setValue}) => {
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
      renderItem={(item)=>{
        return <View 
        // style={{width:'80%',alignItems:'center',flexDirection:'row'}}
        style={{marginLeft:20,marginRight:20,borderBottomWidth:0.5,alignItems:'center',padding:18,justifyContent:'space-between',flexDirection:'row-reverse'}}
        >
            <Text 
            style={{textAlign:'right',width:'80%',fontWeight:'bold'}}
            >{item.label}</Text>
            <TouchableOpacity style={{width:15,height:15}}>
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