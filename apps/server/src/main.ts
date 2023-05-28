import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import SentenceRoutes from './routes/Sentence';
import WordRoutes from './routes/Word';

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to MongoDB');
    startServer();
  })
  .catch((err) => {
    Logging.error('Error connecting to MongoDB');
    Logging.error(err);
  });

const startServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      Logging.info(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.setHeader(
        'Access-Control-Allow-Methods',
        'PUT, GET, POST, PATCH, DELETE'
      );
      return res.status(200).json({});
    }

    next();
  });

  router.use('/sentences', SentenceRoutes);
  router.use('/words', WordRoutes);

  router.get('/ping', (req, res, next) =>
    res.status(200).json({ message: 'pong' })
  );

  router.use((req, res, next) => {
    const error = new Error('Not found');
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    Logging.info(`Server listening on port ${config.server.port}`);
  });
};
