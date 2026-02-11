const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Substitui pela variável de ambiente MONGO_URI do Render
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar MongoDB:', err);
    process.exit(1); // Para encerrar o servidor caso não conecte
  }
};

module.exports = connectDB;
