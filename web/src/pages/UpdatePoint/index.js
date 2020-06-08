import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { FiCheckCircle } from 'react-icons/fi'

import axios from 'axios'
import api from '../../services/api'

import BackTo from '../../Components/BackTo'
import Input from '../../Components/Input'
import Select from '../../Components/Select'
import AlertError from '../../Components/AlertError'
import Dropzone from '../../Components/Dropzone'

import './style.css'

function CreatePoint() {
  const history = useHistory()

  const [error, setError] = useState('')
  const [sucess, setSucess] = useState('')

  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [initialPosition, setInitialPosition] = useState([0, 0])
  const [selectedFile, setSelectedFile] = useState()

  const [formData, setFormData] = useState({
    title: '',
    whatsapp: '',
    address: '',
    neighborhood: '',
    numbering: 0,
  })

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const [selectedPosition, setSelectedPosition] = useState([0, 0])

  useEffect(() => {
    const point = localStorage.getItem('pointID')

    api.get(`/points/${point}`)
      .then(res => {
        const { point } = res.data

        setFormData({
          title: point.title,
          whatsapp: point.whatsapp,
          address: point.address,
          neighborhood: point.neighborhood,
          numbering: point.numbering,
        })

        setSelectedUf(point.uf)
        setSelectedCity(point.city)
        setSelectedPosition([point.latitude, point.longitude])
        setInitialPosition([point.latitude, point.longitude])
      })
  }, [])

  useEffect(() => {
    api.get('/items')
      .then(res => setItems(res.data))
  }, [])

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => {
        const ufInitials = res.data.map(uf => uf.sigla)

        setUfs(ufInitials)
      })
  }, [])

  useEffect(() => {
    if (selectedUf === '0') return;

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(res => {
        const cities = res.data.map(city => city.nome)

        setCities(cities)
      })
  }, [selectedUf])

  function handleSelectItem(id) {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  function handleMapCity(event) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  async function handleSubmit(event) {
    const point = localStorage.getItem('pointID')
    event.preventDefault()

    const { title, whatsapp, address, neighborhood, numbering } = formData
    const uf = selectedUf
    const city = selectedCity
    const items = selectedItems
    const [latitude, longitude] = selectedPosition

    if (!selectedFile || !title || !whatsapp || !address || !neighborhood || !numbering || !uf || !city || !items || !latitude || !longitude) {
      return setError("Informe todos os campos!")
    }

    const data = new FormData()

    data.append('title', title);
    data.append('whatsapp', whatsapp);
    data.append('address', address);
    data.append('neighborhood', neighborhood);
    data.append('numbering', String(numbering));
    data.append('uf', uf);
    data.append('city', city);
    data.append('items', items);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    if (selectedFile) {
      data.append('image', selectedFile)
    }

    try {
      await api.put(`/user/point/${point}`, data)

      setSucess('O ponto foi atualizado com sucesso!')

      setTimeout(() => {
        history.push('/user/profile')
      }, 3000)
    } catch (e) {
      setError("Um erro aconteceu! Tente novamente")
    }
  }

  return (
    <div id="page-create-point">
      <AlertError error={error} onclick={() => setError('')} />

      {sucess ? <div className="sucess">
        <FiCheckCircle className="sucess-icon" />
        {sucess}
      </div>
        : ''
      }

      <BackTo to='/user/profile' back="Profile" />

      <form action="/user/points" method="POST" onSubmit={handleSubmit}>
        <h1>Atualizar o <br /> Ponto de doação</h1>

        <Dropzone onFile={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <Input
            title="Título do Ponto"
            type="text"
            value={formData.title}
            htmlfor="title"
            onchange={handleInputChange}
          />

          <Input
            title="Whatsapp"
            type="text"
            value={formData.whatsapp}
            htmlfor="whatsapp"
            onchange={handleInputChange}
          />
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapCity}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <Select
              title="Estado"
              htmlfor="uf"
              option="Selecione uma UF"
              value={selectedUf}
              onchange={e => setSelectedUf(e.target.value)}
              array={ufs}
            />

            <Select
              title="City"
              htmlfor="city"
              option="Selecione uma cidade"
              value={selectedCity}
              onchange={e => setSelectedCity(e.target.value)}
              array={cities}
            />
          </div>

          <div className="field-group-3">
            <Input
              title="Endereço"
              type="text"
              htmlfor="address"
              value={formData.address}
              onchange={handleInputChange}
            />

            <Input
              title="Bairro"
              type="text"
              htmlfor="neighborhood"
              value={formData.neighborhood}
              onchange={handleInputChange}
            />

            <Input
              title="Número"
              type="number"
              htmlfor="numbering"
              value={formData.numbering}
              onchange={handleInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de Doação</h2>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            )
            )}
          </ul>
        </fieldset>

        <button type="submit" className="btn">
          Cadastrar ponto de doação
        </button>
      </form>
    </div>
  )
}

export default CreatePoint
