const express = require('express');
const cors = require('cors');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true, app: 'StatusCraft Backend API' }));

app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
