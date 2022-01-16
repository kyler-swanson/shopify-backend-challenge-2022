const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const InventoryItem = require('../../models/InventoryItem.model');

const exampleItem = {
  sku: 'APPLE5',
  name: 'Red Delicious Apple',
  description: 'Decent apple.',
  price: 1.99,
  cost: 0.23,
  image: 'https://i5.walmartimages.com/asr/7320e63a-de46-4a16-9b8c-526e15219a12_3.e557c1ad9973e1f76f512b34950243a3.jpeg',
  available: true,
  inventoryCount: 5
};

const expectedCSV =
  'SKU,Name,Description,Price,Cost,In Stock,Qty in Stock,Image URL\nAPPLE5,Red Delicious Apple,Decent apple.,1.99,0.23,Yes,5,https://i5.walmartimages.com/asr/7320e63a-de46-4a16-9b8c-526e15219a12_3.e557c1ad9973e1f76f512b34950243a3.jpeg\n';

beforeEach(async () => {
  const testItem = new InventoryItem(exampleItem);
  await testItem.save();
});

afterEach(async () => {
  await mongoose.connection.dropCollection('inventoryitems');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/csv', () => {
  test('Test CSV output', async () => {
    let response = await request(app).get('/api/csv');

    expect(response.text).toEqual(expectedCSV);
  });
});
