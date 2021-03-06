import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'


function Main() {

    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition()
    }, [])

    if (!currentRegion) {
        return null
    }

    return (<MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -23.9825019, longitude: -46.299784625 }}>
            <Image style={styles.avatar} source={{ uri: 'https://i.ytimg.com/vi/F1RloLcDo0I/hqdefault.jpg' }} />
            
            <Callout>

            </Callout>
        </Marker>
    </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    }


})

export default Main
