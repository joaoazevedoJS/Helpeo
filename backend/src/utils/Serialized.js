function Serialized(rest, folder) {
  const Items = rest.map(item => {
    return {
      ...item,
      image_url: `http://192.168.0.24:3333/uploads/${folder}/${item.image}`
    }
  })

  return Items
}

module.exports = Serialized
