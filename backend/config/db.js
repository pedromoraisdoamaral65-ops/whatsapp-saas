const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Usar MONGO_URI (Render) ou MONGODB_URI (local) como fallback
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI ou MONGODB_URI não definida nas variáveis de ambiente');
    }

    console.log('🔄 Conectando ao MongoDB...');
    
    const conn = await mongoose.connect(mongoUri);

    console.log('✅ MongoDB conectado com sucesso!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error.message);
    console.error('💡 Verifique se a MONGO_URI está correta nas variáveis de ambiente');
    process.exit(1);
  }
};

module.exports = connectDB;
