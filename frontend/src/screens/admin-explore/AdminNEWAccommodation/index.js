import { 
  SafeAreaView,
  TextInput,
  Button,
  Text, 
  View,
  StyleSheet,
  } from 'react-native';
import React from 'react';
import AdminAccommodationList from '..';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stacks = createNativeStackNavigator();

const AdminNEWAccommodationScreen = ({navigation}) => {
  const onPressCreate = () => {
    navigation.navigate('AdminAccommodationList')  
  }
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);
  return (
      
    <View style={styles.body}>
      <Text style={styles.headertext}>Thêm phòng mới</Text>
        <View style={styles.listContainer}>
            <SafeAreaView>
            <Text>Số phòng</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Số phòng"
              />
            <Text>Số người tối đa</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Số người ở tối đa"
                keyboardType="numeric"
              />
              <Text>Giá thuê</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Giá thuê"
                keyboardType="numeric"
              />
            </SafeAreaView>
            <Button
              title="Tạo Phòng"
              onPress={onPressCreate}
            />
        </View>


    </View>
  )
};

export default AdminNEWAccommodationScreen;

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
  listContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
      marginBottom: 150,
  },
  headertext:{
    fontSize: 30,
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

})