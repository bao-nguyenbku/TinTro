import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreHeader from 'components/header/ExploreHeader';
const Stack = createNativeStackNavigator();

const ExploreScreen = (props) => {
  const { allAccommodations } = props.stack;
  
  return (
    <Stack.Navigator
      initialRouteName={allAccommodations.title}
      screenOptions={{
        header: (stackProps) => <ExploreHeader {...stackProps} />,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      {Object.keys(props.stack).map(stackScreen => {
        const StackComponent = props.stack[stackScreen].component;
        return (
          <Stack.Screen 
            name={props.stack[stackScreen].title}
            options={{
              title: props.stack[stackScreen].label
            }}
            key={stackScreen}
            children={(stackProps) => <StackComponent {...stackProps } {...props} />}
          />
        )
      })}
    </Stack.Navigator>
  )
}

export default ExploreScreen;
