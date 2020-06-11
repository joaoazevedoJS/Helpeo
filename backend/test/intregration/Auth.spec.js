const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Authorization', () => {
  beforeEach(async () => {
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection('users').delete('*')
    await connection.destroy()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        name: "João Azevedo",
        email: "joaoazevedo@fakeMail.com",
        password: "12344321"
      })

    expect(response.body).toHaveProperty("id")
  })

  it('Should be able to sign in', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        email: "joaoazevedo@fakeMail.com",
        password: "12344321"
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('token')
  })
})
