import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';

import register from './Controllers/register.js';
import signin from './Controllers/signin.js';
import profile from './Controllers/profile.js';
import image from './Controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('READY')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0", () => {
    console.log(`Our app is running on port ${ PORT }`);
});
