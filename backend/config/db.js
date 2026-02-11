const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Pega a variável MONGO_URI do Render ou MONGODB_URI local
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("❌ Variável de ambiente MONGO_URI não definida!");
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar MongoDB:', err);
    process.exit(1); // Para o backend se não conectar
  }
};

module.exports = connectDB;
