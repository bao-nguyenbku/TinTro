<<<<<<< HEAD
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RentRequestScreen = () => {
  return (
    <View style={styles.ScreenWrapper}>
      <View style={styles.ItemWrapper}>
        <View style={styles.ScreenTitleWrapper}>
          <Text style={styles.headertext}>
            Yêu cầu thuê phòng
          </Text>
          
          
        </View>
      </View>
        <View style={styles.ItemWrapper}>
            
          <Text>
            Nguyễn Thiên Bảo
          </Text>
          <View style={styles.fixToText}>
            <Button
              title="Từ chối"
            />
            <Button
              title="Chấp nhận"              
            />
          </View>
        </View>
             
    </View>

  )

};

export default RentRequestScreen;


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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
=======
import React, { useEffect } from 'react';
import { ScrollView, VStack } from 'native-base';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRentRequestByRenter, selectAccommodationState } from 'store/reducer/accommodation';
import Loading from 'components/loading';
import SingItem from './SingItem';

const RentRequestScreen = () => {
  const dispatch = useDispatch();
  const { rentRequest } = useSelector(selectAccommodationState);
  const { loading, data } = rentRequest;
  useEffect(() => {
    dispatch(getRentRequestByRenter())
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={loading}
          onRefresh={() => dispatch(getRentRequestByRenter())}
        />
      }
    >
      <VStack
        space='2'
        p='2'
      >
        {data && data.map(item => {
          return (
            <SingItem 
              key={item.id}
              item={item}
            />
          )
        })}
      </VStack>
    </ScrollView>
  )
}

export default RentRequestScreen;
>>>>>>> remotes/origin/ntb/checkout-when-renting
