function Serialized(rest, folder) {
  const Items = rest.map(item => {
    return {
      ...item,
      image_url: `http://${process.env.HOST}:3333/uploads/${folder}/${item.image}`
    }
  })

  return Items
}

module.exports = Serialized
