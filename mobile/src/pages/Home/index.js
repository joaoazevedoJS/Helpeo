import React, { useState, useEffect } from 'react'
import { View, Text, Image, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import { Feather as Icon } from '@expo/vector-icons'
import PickerSelect from 'react-native-picker-select'
import axios from 'axios'

import styles from './styles'
import imgBackground from '../../assets/home-background.png'
import logo from '../../assets/logo.png'

export default function Home() {
  const navigation = useNavigation()

  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedUf, setSelectedUf] = useState("")

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => {
        const ufs = res.data.map(uf => {
          return { label: uf.nome, value: uf.sigla }
        })

        setUfs(ufs)
      })
  }, [])

  useEffect(() => {
    setCities([])

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(res => {
        const cities = res.data.map(city => {
          return { label: city.nome, value: city.nome }
        })

        setCities(cities)
      })
  }, [selectedUf])

  function handleNavigationPoints() {
    if(!selectedUf || !selectedCity) {
      Alert.alert('Ops....', 'Por favor preencha todos os dados!')
    } else {
      navigation.navigate('Points', {
        uf: selectedUf,
        city: selectedCity,
      })
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : undefined}>
      <ImageBackground
        source={imgBackground}
        style={styles.container}
        imageStyle={{ width: 214, height: 308 }}
      >
        <View style={styles.main}>
          <Image source={logo} />

          <Text style={styles.title}>Ajude as pessoas na crise do coronavírus.</Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de doação de forma eficiente.
          </Text>
        </View>

        <View style={styles.footer}>
          <PickerSelect
            onValueChange={value => setSelectedUf(value)}
            items={ufs}
          />

          {
            cities.length === 0 ? <Text /> :
              <PickerSelect
                onValueChange={value => setSelectedCity(value)}
                items={cities}
              />
          }
        </View>

        <RectButton style={styles.button} onPress={handleNavigationPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="search" color="#fff" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Procurar Pontos</Text>
        </RectButton>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}
