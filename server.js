const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' }
];

// GET /products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products
app.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

// PUT /products/:id
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  products = products.map(product => {
    if (product.id === productId) {
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  res.json(products.find(product => product.id === productId));
});

// DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(product => product.id !== productId);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
