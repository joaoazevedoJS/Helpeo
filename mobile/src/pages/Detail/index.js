import React, { useState, useEffect } from 'react'
import { View, Text, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'

import api from '../../services/api'

export default function Detail() {
  const [point, setPoint] = useState({})
  const [items, setItems] = useState('')

  const Params = useRoute().params
  const navigation = useNavigation()

  useEffect(() => {
    api.get(`points/${Params.point_id}`)
      .then(res => {
        setPoint(res.data.point)

        const items = res.data.items.map(item => item.title).join(', ')

        setItems(items)
      })
  }, [])

  function handleNavigationBack() {
    navigation.goBack()
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${point.whatsapp}&text=Tenho interesse na doação de ${items} `)
  }

  function handleMail() {
    MailComposer.composeAsync({
      subject: `Tenho interesse na doação de ${items}`,
      recipients: [point.email]
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack} style={{ marginTop: 16 }}>
          <Icon name="arrow-left" color="#6B62FA" size={24} />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: point.image_url }} />

        <Text style={styles.pointName}>{point.title}</Text>
        <Text style={styles.pointItems}>{items}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{point.city} / {point.uf}</Text>
          <Text style={styles.addressContent}>Bairro: {point.neighborhood}</Text>
          <Text style={styles.addressContent}>Rua: {point.address}, número: {point.numbering} </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name='whatsapp' size={20} color="#f2f2f2" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleMail}>
          <Icon name="mail" size={20} color="#f2f2f2" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}
