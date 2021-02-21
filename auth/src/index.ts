import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('currentUser works fine');
});

app.listen(5000, () => {
  console.log('Listen on 5000');
});
