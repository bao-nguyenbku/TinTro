import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';

const Stack = createNativeStackNavigator();

const MyRoomScreen = (props) => {
  // const dispatch = useDispatch();
  const { stack } = props;
  // const { roomInfo } = useSelector(selectRentingState);
  // const { loading, data } = roomInfo;
  // useEffect(() => {
  //   dispatch(getRoomInfo());
  // }, [])
  // if (loading) {
  //   return <Loading />
  // }
  return (
    <Stack.Navigator
      initialRouteName={stack.roomMenu.title}
      screenOptions={{
        header: (stackProps) => <CustomHeader {...stackProps} />,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center'
      }}
    >
      {Object.keys(stack).map(stackScreen => {
        const StackComponent = stack[stackScreen].component;
        return (
          <Stack.Screen 
            name={stack[stackScreen].title}
            options={{
              title: stack[stackScreen].label
            }}
            key={stackScreen}
            children={(stackProps) => <StackComponent {...stackProps } {...props} />}
          />
        )
      })}
    </Stack.Navigator>
  )
}


export default MyRoomScreen;
