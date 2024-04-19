const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT
} = require('./config/config');

const postRouter = require('./routes/post.route')
const authRouter = require('./routes/auth.route')

const app = express();

const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

redisClient.on('error', console.error)

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

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 30000
//     }
//   })
// )

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h2>Hi there!!!</h2>');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));