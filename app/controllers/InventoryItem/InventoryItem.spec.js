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

let testItem;
beforeEach(async () => {
  testItem = new InventoryItem(exampleItem);
  await testItem.save();
});

afterEach(async () => {
  await mongoose.connection.dropCollection('inventoryitems');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/item', () => {
  test('Get a list of all items', async () => {
    const response = await request(app).get('/api/item');
    const body = filterResponse(response.body.items[0]);

    expect(body).toEqual(exampleItem);
  });
});

describe('GET /api/item/:id', () => {
  test('Get a specific item', async () => {
    let response = await request(app).get('/api/item/' + testItem._id.toString());
    expect(filterResponse(response.body.item)).toEqual(exampleItem);
  });
});

describe('POST /api/item', () => {
  test('Create an incomplete item', async () => {
    const incomplete = {
      sku: 'BREAD2',
      name: 'White Bread',
      price: 2.49,
      cost: 0.56
    };

    let response = await request(app).post('/api/item').send(incomplete);

    expect(filterResponse(response.body.item)).toEqual({ sku: 'BREAD2', name: 'White Bread', price: 2.49, cost: 0.56, available: true, inventoryCount: 0 });
  });

  test('Create a complete item', async () => {
    const completeItem = {
      sku: 'ORANGE4',
      name: 'Orange',
      description: 'A healthy fruit',
      price: 0.99,
      cost: 0.11,
      image: 'https://i5.walmartimages.ca/images/Enlarge/234/6_r/6000191272346_R.jpg',
      available: true,
      inventoryCount: 50
    };

    let response = await request(app).post('/api/item').send(completeItem);
    expect(filterResponse(response.body.item)).toEqual(completeItem);
  });

  test('Create a duplicate item', async () => {
    await request(app).post('/api/item').send(exampleItem);

    let duplicateResponse = await request(app).post('/api/item').send({
      sku: 'APPLE5',
      name: 'Granny Smith Apple',
      price: 0.49,
      cost: 0.007
    });
    expect(duplicateResponse.status).toEqual(409);
  });
});

describe('PATCH /api/item/:id', () => {
  test("Update an item's price", async () => {
    let response = await request(app)
      .patch('/api/item/' + testItem._id.toString())
      .send({ price: 2.99 });
    expect(filterResponse(response.body.item)).toEqual({ ...exampleItem, price: 2.99 });
  });
});

describe('DELETE /api/item/:id', () => {
  test('Delete an item', async () => {
    let response = await request(app).delete('/api/item/' + testItem._id.toString());
    expect(response.body.success).toEqual(true);
    expect(filterResponse(response.body.item)).toEqual(exampleItem);
  });
});

const filterResponse = (body) => {
  const allowed = ['sku', 'name', 'description', 'price', 'cost', 'image', 'available', 'inventoryCount'];
  return Object.keys(body)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = body[key];
      return obj;
    }, {});
};
