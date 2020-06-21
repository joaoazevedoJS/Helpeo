import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native"
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import styles from './styles'

export default function Points() {
  const Params = useRoute().params
  const navigation = useNavigation()

  const [initialPosition, setInitialPosition] = useState([0, 0])
  const [points, setPoints] = useState([])

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permissão para o funcionamento do aplicativo!')

        return;
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      setInitialPosition([
        latitude,
        longitude
      ])
    }

    loadPosition()
  }, [])

  function handleNavigationBack() {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" color="#6B62FA" size={20} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de doação.</Text>

        <View style={styles.mapContainer}>
          {
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >

            </MapView>
          }
        </View>
      </View>
    </SafeAreaView>
  )
}
