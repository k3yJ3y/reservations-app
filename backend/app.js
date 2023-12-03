const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const sequelize = require('./util/db');

const reservationRoutes = require('./routes/reservation-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

// routers
app.use('/api/v1/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;
sequelize
  .sync({ logging: console.log })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT} ...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
