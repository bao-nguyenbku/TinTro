import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})




// const UserInformation = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         return await getProfile();
//       } catch (error) {
//         throw new Error(error);
//       }
//     }
  
//     fetchData().then(res => {
//       setUserData(prev => {
//         return {
//           ...prev,
//           ...res.data
//         }
//       })
//     })

//   }, [])
  
//   if (!userData)
//     return <Loading />
//   return (
//     // Your form here
//   )
// }