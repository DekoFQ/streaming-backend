import cors from 'cors';
import express from 'express';
import { connectDB } from './db.js';
import cookieParser from 'cookie-parser';

// Rutas
import authRoutes from './routes/auth.routes.js';
import entityRoutes from './routes/entity.routes.js'; // de Diego-Romero
import clientRoutes from './routes/client.routes.js'; // de santiago
import productRoutes from './routes/product.routes.js';

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5501',
];

// CORS dinámico
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

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api', authRoutes, entityRoutes, clientRoutes, productRoutes);

// Conexión y servidor
connectDB();
app.listen(3000, () => {
  console.log('🚀 SERVER ON PORT', 3000);
});
