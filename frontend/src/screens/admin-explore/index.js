import { 
  Center,
  Flex,
  Button,
  Text, 
  View,
  StyleSheet,
  Pressable, } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AdminAccommodationDetailsScreen from './AdminAcommodationDetails';
import AdminNEWAccommodationScreen from './AdminNEWAccommodation';


const Stack = createNativeStackNavigator();

const AdminAccommodationList = ({ navigation }) => {
  const onPressNew = () => {
    navigation.navigate('AdminNEWAccommodationScreen')
  }
  const onPressDetails = () => {
    navigation.navigate('AdminAccommodationDetailsScreen')
  }
  return (
    <View style={styles.ScreenWrapper}>
      <View style={styles.ItemWrapper}>
        <View style={styles.ScreenTitleWrapper}>
          <Text style={styles.ScreenTitleRoom}>
            Nhà trọ TinTrọ
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ font: 15 }}>235 Trần Phú, Quận 5</Text>
          </View>
          <View style={{ flexDirection: 'row' }} justifyContent='space-between'>
            <Text style={{ font: 15 , color:"red",}}>Đã thuê 12 phòng</Text>
            <Text style={{ font: 15 , color:"green",}}>Còn 10 phòng trống</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ font: 15 }}>Phòng trọ của tôi </Text>
      </View>
        <Pressable
          onPress={onPressNew}
          style={[({ pressed }) => ({ backgroundColor: pressed ? '#E4f9e4' : '#Ffffff' }), styles.plusitem]}
        >
          <Fontisto name="plus-a" size={24} color="green" style={styles.desIcon} />
          
          <Text>
            Thêm
          </Text>
            
          

          <AntDesign name="right" size={20} color="gray" style={styles.desIcon} />
        </Pressable>
        <Pressable
          onPress={onPressDetails}
          style={[({ pressed }) => ({ backgroundColor: pressed ? '#E4f9e4' : '#Ffffff' }),]}
        >
          <View style={styles.ItemWrapper}>
            <TouchableOpacity>
              <Text>
                204 Còn trống
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ItemWrapper}>
            <TouchableOpacity>
              <Text>
                205 còn trống
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ItemWrapper}>
            <TouchableOpacity>
              <Text>
                206 còn trống
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>

        
      
    </View>

  )

};

const AdminExploreScreen = () => { 
  return (
    <Stack.Navigator
      initialRouteName="AdminAccommodationList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AdminAccommodationList"
        component={AdminAccommodationList}

      />
      <Stack.Screen
        name="AdminAccommodationDetailsScreen"
        component={AdminAccommodationDetailsScreen}

      />
      <Stack.Screen
        name="AdminNEWAccommodationScreen"
        component={AdminNEWAccommodationScreen}
      />
    </Stack.Navigator>
  )
}

export default AdminExploreScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  ScreenTitleWrapper: {
    flexDirection: 'column',
    margin: '5%',
    alignItems: 'center',
  },
  ScreenTitleStatus: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#059669'
  },
  ScreenTitleRoom: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ScreenWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  ListItemWrapper: {
    flex: 1,
    width: '90%',
    padding: '2%',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    marginBottom: '63%',
    borderRadius: 15,
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
  desWrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '60%',
    height: '80%',
    paddingLeft: 10,
  },
  desTitle: {
    font: 18,
    fontWeight: 'bold',
  },
  desDes: {
    font: 10,
    color: 'lightgray',
  },
  desIcon: {
    margin: 5,
  },
  plusitem: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    font: 10,
    color: 'green',    
  },
})