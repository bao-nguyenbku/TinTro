import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import DienNuocScreen from './DienNuoc';


const Stack = createNativeStackNavigator();

const MyRoomMain = ({ navigation }) => {
  const onPressDienNuocHandler = () => {
    navigation.navigate('DienNuocScreen')
  }

  return (
    <View style={styles.ScreenWrapper}>
      <View style={styles.ScreenTitleWrapper}>
        <Text style={styles.ScreenTitleRoom}>
          Phòng 204
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ font: 15 }}>Tình trạng: </Text><Text style={styles.ScreenTitleStatus}>Đang thuê</Text>
        </View>
      </View>

      <View style={styles.ListItemWrapper}>
        <Pressable
          onPress={onPressDienNuocHandler}
          style={[({ pressed }) => ({ backgroundColor: pressed ? '#E4f9e4' : '#Ffffff' }), styles.ItemWrapper]}
        >
          <Fontisto name="atom" size={24} color="black" style={styles.desIcon} />
          <View style={styles.desWrapper}>
            <Text style={styles.desTitle}>
              Quản lí điện nước
            </Text>
            <Text style={styles.desDes}>
              dasdadadadasdadasdsadasdasdasdasdasdasdadasas
            </Text>
          </View>

          <AntDesign name="right" size={20} color="gray" style={styles.desIcon} />
        </Pressable>



        <View style={styles.ItemWrapper}>
          <TouchableOpacity>
            <Text>
              Hoá đơn
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ItemWrapper}>
          <TouchableOpacity>
            <Text>
              Gửi xe
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ItemWrapper}>
          <TouchableOpacity>
            <Text>
              Wifi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )

};




const MyRoomScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyRoomMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MyRoomMain"
        component={MyRoomMain}

      />
      <Stack.Screen
        name="DienNuocScreen"
        component={DienNuocScreen}

      />
    </Stack.Navigator>
  )
}


export default MyRoomScreen;


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
  }
})