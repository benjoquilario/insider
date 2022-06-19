import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import profileRoutes from './routes/profile.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);

const CONNECTION_URL =
  'mongodb+srv://d_insider:qwerty123456@nodejs.izk1vhl.mongodb.net/db_insider?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch(error => console.log(`${error} did not connect`));
