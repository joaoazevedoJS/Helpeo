function Serialized(rest, folder) {
  const Items = rest.map(item => {
    return {
      ...item,
      image_url: `http://localhost:3333/uploads/${folder}/${item.image}`
    }
  })

  return Items
}

module.exports = Serialized
