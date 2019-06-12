const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Place = require('../models/place')
const { initialPlaces, nonExistingId } = require('./test_helper')

beforeAll(async () => {
  await Place.remove({})
  console.log('Places removed')

  const placeObjects = initialPlaces.map(place => new Place(place))
  const promiseArray = placeObjects.map(place => place.save())
  await Promise.all(promiseArray)
})

test('places are returned as json', async () => {
  await api
    .get('/api/places')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two places', async () => {
  const response = await api
    .get('/api/places')

  expect(response.body.length).toBe(2)
})

test('the title of the first place is \'Test1\'', async () => {
  const response = await api
    .get('/api/places')

  expect(response.body[0].title).toBe('Test1')
})

test('GET /api/places/:id with invalid id return 500', async () => {
  const invalidId = '5a3d5da59070081a82a3445'
  const response = await api
    .get(`/api/places/${invalidId}`)
    .expect(500)
})

test('GET /api/places/:id with valid nonexisting id return 404', async () => {
  const validNonExistingId = await nonExistingId()
  const response = await api
    .get(`/api/places/${validNonExistingId}`)
    .expect(404)
})

test('view a specific place', async () => {
  const resultAll = await api
    .get('/api/places')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const aPlaceFromAll = resultAll.body[0]
  const resultPlace = await api
    .get(`/api/places/${aPlaceFromAll.id}`)

  const placeObject = resultPlace.body
  expect(placeObject).toEqual(aPlaceFromAll)
})

test('a place can be created and deleted', async () => {
  const newPlace = {
    title: 'Place to be deleted'
  }

  const placesAtBeginning = await api
    .get('/api/places')

  const addedPlace = await api
    .post('/api/places')
    .send(newPlace)

  const placesBeforeDelete = await api
    .get('/api/places')

  expect(placesAtBeginning.body.length).toBe(placesBeforeDelete.body.length - 1)

  await api
    .delete(`/api/places/${addedPlace.body.id}`)
    .expect(204)

  const placesAfterDelete = await api
    .get('/api/places')

  const titles = placesAfterDelete.body.map(r => r.title)

  expect(titles).not.toContain('Place to be delete')
  expect(placesAfterDelete.body.length).toBe(placesBeforeDelete.body.length - 1)
})

afterAll(() => {
  server.close()
})