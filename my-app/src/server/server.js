import express from 'express';

const app = express();
const port = 5000;

app.get('/api/data', (req, res) => {
  const data = {
    message: 'Message'
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})