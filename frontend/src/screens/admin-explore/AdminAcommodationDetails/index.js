import { 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Pressable,
  AntDesign,
  Button,
  Text, 
  View,
  StyleSheet,
  } from 'react-native';
import { Icon } from '@iconify/react';
import React from 'react';
import AdminAccommodationList from '..';
import AdminAccommodationCRUDScreen from '../AdminAccommodationCRUD';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stacks = createNativeStackNavigator();

const AdminAccommodationDetailsScreen = ({navigation}) => {
  const onPressBack = () => {
    navigation.navigate('AdminAccommodationList')    
  }
  const onPressCRUD = () => {
    navigation.navigate('AdminAccommodationCRUDScreen')    
  }
  return (
    <View style={styles.body}>      
      <Text style={styles.headertext}>Tổng quan phòng</Text>
      <Button
        title="Back"
        onPress={onPressBack}
      />
      <View style={styles.listContainer}>
          <SafeAreaView>
            <Pressable
            onPress={onPressCRUD}
            style={[({ pressed }) => ({ backgroundColor: pressed ? '#E4f9e4' : '#Ffffff' }),]}
          >
            <View style={styles.ItemWrapper}>
              <TouchableOpacity>
                <Text>
                  Chỉnh sửa thông tin
                </Text>
              </TouchableOpacity>
            </View>

            
          </Pressable>           
          </SafeAreaView>
          
      </View>


    </View>

  )
};



export default AdminAccommodationDetailsScreen;

const styles = StyleSheet.create({
  body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
  },
  text: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
  },
  ItemWrapper: {
    flexDirection: 'row',
    width: '95%',
    height: 70,
    margin: '2.5%',
    backgroundColor: '#Ffffff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  listContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
      marginBottom: 150,
  },
  headertext:{
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 40,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  desIcon: {
    margin: 5,
  },
})