import { Text, View } from 'react-native'
import React from 'react'

const AdminRentRequest = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('AdminAccommodationList')    
  }
  return(
    <View style={styles.ScreenWrapper}>
      <View style={styles.ItemWrapper}>
        <View style={styles.ScreenTitleWrapper}>
          <Text style={styles.ScreenTitleRoom}>
            Yêu cầu thuê trọ
          </Text>
          
        </View>
      </View>
          <View style={styles.ItemWrapper}>            
              <Text>
                Hà Phương Điền
              </Text>
            <View style={styles.fixToText}>
              <Button
                title="từ chối"
                onPress={onPress}
              />
              <Button
                title="chấp nhận"
                onPress={onPress}
              />
            </View>
          </View>

    </View>
  )
}

export default AdminRentRequest;

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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})