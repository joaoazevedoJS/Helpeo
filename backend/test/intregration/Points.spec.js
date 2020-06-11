const request = require('supertest')

const app = require("../../src/app")
const connection = require("../../src/database/connection")

describe('Points', () => {
  beforeEach(async () => {
    await connection.migrate.latest()
    await connection.seed.run()
  })

  afterAll(async () => {
    await connection('users').delete('*')
    await connection('points').delete('*')
    await connection.destroy()
  })

  it('Should be able to create a new Point', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: "João Azevedo",
        email: "joaoazevedoPoint@fakeMail.com",
        password: "12344321"
      })

    const signin = await request(app)
      .post('/signin')
      .send({
        email: "joaoazevedoPoint@fakeMail.com",
        password: "12344321"
      })

    const { token } = signin.body

    const response = await request(app)
      .post('/user/points')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Doação de Roupa",
        whatsapp: "4744444444444",
        latitude: "-46.812945943",
        longitude: "-19.812941043",
        city: "Dois Córregos",
        uf: "SP",
        address: "Rua dev",
        neighborhood: "developer",
        numbering: "404",
        items: '1, 2, 3'
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('user_id')
  })
})
