exports.seed = async function(knex) {
  await knex('items').insert([
    { title: 'Alimentos', image: "alimentos.svg" },
    { title: 'Brinquedos', image: "brinquedos.svg" },
    { title: 'Produtos de Limpeza', image: "limpeza.svg" },
    { title: 'Roupas', image: "roupas.svg" },
    { title: 'Calçados', image: "shoes.svg" },
    { title: 'Móveis', image: "sofa.svg" },
  ])
}
