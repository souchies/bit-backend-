const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lelixir', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas
const perfumesRoutes = require('./routes/perfumes');
app.use('/api/perfumes', perfumesRoutes);
const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('API L\'Elixir funcionando');
});

// ... aquí se agregarán las rutas de perfumes ...

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 