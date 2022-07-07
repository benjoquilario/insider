import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('APPLICATION IS RUNNING');
});

// Routes
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

//prettier-ignore
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch(error => console.log(`${error} did not connect`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
