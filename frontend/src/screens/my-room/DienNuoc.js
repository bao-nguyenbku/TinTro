import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stacks = createNativeStackNavigator();



function ScreenB({ navigation }) {

    const onPressHandler = () => {
        navigation.navigate('Screen_A')
    }

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                alright
            </Text>
            <Pressable
                onPress={onPressHandler}
                style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
            >
                <Text style={styles.text}>
                    Go to A
                </Text>
            </Pressable>
        </View>
    )
}

function ScreenA({ navigation }) {
    const onPressHandler = () => {
        navigation.navigate('Screen_B')
    }

    return (
        <View style={styles.body}>
            <View style={styles.listContainer}>
                <View style={styles.detailContainer}>
                    <View style={styles.detailText}>
                        <Text>
                            detaildasdasdadadasdadad
                        </Text>
                    </View>
                    <View style={styles.detailStatus}>
                        <Text style={styles.detailStatusText}>
                            Đã thanh toán
                        </Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <View style={styles.detailText}>
                        <Text>
                            detaildasdasdadadasdadad
                        </Text>
                    </View>
                    <View style={styles.detailStatus}>
                        <Text>
                            đã đóng tiền
                        </Text>
                    </View>
                </View>

                <View style={styles.detailContainer}>
                    <View style={styles.detailText}>
                        <Text>
                            detaildasdasdadadasdadad
                        </Text>
                    </View>
                    <View style={styles.detailStatus}>
                        <Text>
                            đã đóng tiền
                        </Text>
                    </View>
                </View>
                <Pressable
                    onPress={onPressHandler}
                    style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
                >
                    <Text style={styles.text}>
                        Go to B
                    </Text>
                </Pressable>
            </View>


        </View>
    )
}


const DienNuocScreen = () => {
    return (
        <Stacks.Navigator>
            <Stacks.Screen
                name="Screen_A"
                component={ScreenA}

            />
            <Stacks.Screen
                name="Screen_B"
                component={ScreenB}
                option={{
                    header: () => null
                }}
            />
        </Stacks.Navigator>
    )
}

export default DienNuocScreen

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
    detailContainer: {
        flex: 1,
        flexDirection: "row",
    },
    detailText: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderRightWidth: 0,
        height: 75,
        width: 250,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    detailStatus: {
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#059669',
        borderColor: 'gray',
        borderLeftWidth: 0,
        height: 75,
        width: 75,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    detailStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        heigth: '80%',
        width: '80%',
        margin: '8%',
    }

})