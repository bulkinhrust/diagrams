import express from 'express';
import cors from 'cors';
import db from './db/index';
import router from './routes/index';
import errorHandler from './middleware/ErrorHandlingMiddleware';

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/api', router)
  .use(errorHandler)

app.get('/', (req, res, next) => {
  res.sendStatus(200);
});

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server starting on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
