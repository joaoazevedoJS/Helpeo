import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native"
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'

import styles from './styles'

import api from '../../services/api'

export default function Points() {
  const Params = useRoute().params
  const navigation = useNavigation()

  const [initialPosition, setInitialPosition] = useState([0, 0])
  const [points, setPoints] = useState([])
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState([])

  useEffect(() => {
    api.get('/items')
      .then(res => setItems(res.data))
  }, [])

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      // caso o usuário não de permissão para acessar a localização
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

  useEffect(() => {
    api.get('/points', {
      params: {
        city: Params.city,
        uf: Params.uf,
        items: selectedItem
      }
    }).then(res => setPoints(res.data))
  }, [selectedItem])

  function handleNavigationBack() {
    navigation.goBack()
  }

  function handleNavigationDetail(id) {
    navigation.navigate('Detail', { point_id: id })
  }

  function handleSelectedItem(id) {
    const alreadySelected = selectedItem.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filteredItems = selectedItem.filter(item => item !== id)

      setSelectedItem(filteredItems)
    } else {
      setSelectedItem([...selectedItem, id])
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack} style={{ marginTop: 16 }}>
          <Icon name="arrow-left" color="#6B62FA" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de doação.</Text>

        <View style={styles.mapContainer}>
          {
            initialPosition[0] !== 0 && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                  latitudeDelta: 0.014,
                  longitudeDelta: 0.014
                }}
              >
                {
                  points.map(point => (
                    <Marker
                      onPress={() => handleNavigationDetail(point.id)}
                      key={point.id}
                      style={styles.mapMarker}
                      coordinate={{
                        latitude: point.latitude,
                        longitude: point.longitude
                      }}
                    >
                      <View style={styles.mapMarkerContainer}>
                        <Image
                          style={styles.mapMarkerImage}
                          source={{ uri: point.image_url }}
                        />
                        <Text style={styles.mapMarkerTitle}>{point.title}</Text>
                      </View>
                    </Marker>
                  ))
                }
              </MapView>
            )
          }
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {
            items.map(item => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItem.includes(item.id) ?
                    styles.selectedItem : {}
                ]}
                key={item.id}
                onPress={() => handleSelectedItem(item.id)}
                activeOpacity={0.7}
              >
                <SvgUri width={42} height={42} uri={item.image_url} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
