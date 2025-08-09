import cors from 'cors';
import express from 'express';
import { connectDB } from './db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import entityRoutes from './routes/entity.routes.js';
import clientRoutes from './routes/client.routes.js';
import productRoutes from './routes/product.routes.js';
import saleRoutes from './routes/sale.routes.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5501',
];

// CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Origin no permitido:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api', authRoutes);
app.use('/api', entityRoutes);
app.use('/api', clientRoutes);
app.use('/api', productRoutes);
app.use('/api', saleRoutes);

// Conexión a base de datos y levantamiento del servidor
connectDB();

app.listen(3000, () => {
  console.log('🚀 SERVER ON PORT 3000');
});
