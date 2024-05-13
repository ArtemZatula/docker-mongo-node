import express from 'express'
import mongoose from 'mongoose'
import {createClient} from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'

import config from './config/config.js'
import postRouter from './routes/post.route.js'
import authRouter from './routes/auth.route.js'
import workspaceRouter from './routes/workspace.route.js'

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PORT
} = config;
const app = express();
const RedisStore = connectRedis(session);

const redisClient = createClient({
  socket: { port: REDIS_PORT, host: REDIS_HOST },
  legacyMode : true
})
redisClient.on('error', (error) => console.log('error', error));
redisClient.on('connect', () => console.log('Connected to Redis'))
redisClient.connect();

const connectWithRetry = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`)
    .then(() => console.log("Succesfully connected to DB"))
    .catch(e => {
      console.log("Error", e);
      setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: "myapp:"
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 360000 }
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h2>Hi there!!!</h2>');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/workspace', workspaceRouter);
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));