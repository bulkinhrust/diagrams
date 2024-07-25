const express = require('express');
const cors = require('cors');
const sequelize = require('./db/index');
const models = require('./models/models');
const router = require('./routes/index');

const PORT = process.env.SERVER_PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

// app.post('/', (req, res) => {
//   const { name, location } = req.body;
//   res.status(200).send({
//     message: `YOUR KEYS WERE ${name}, ${location}`,
//   });
// });
//
// app.get('/setup', async (req, res) => {
//   try {
//     await db.query('')
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// })

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server starting on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
