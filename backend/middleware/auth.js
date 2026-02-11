const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check for token in cookies or header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Não autorizado para acessar esta rota'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user || !req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado ou inativo'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Check subscription status
exports.checkSubscription = (req, res, next) => {
  if (req.user.subscription.status !== 'active') {
    return res.status(403).json({
      success: false,
      message: 'Assinatura inativa. Por favor, atualize seu plano.'
    });
  }
  next();
};

// Check plan limits
exports.checkLimit = (limitType) => {
  return (req, res, next) => {
    const limit = req.user.limits[limitType];
    const used = req.user.usage[`${limitType}Used`];

    if (limit !== -1 && used >= limit) {
      return res.status(403).json({
        success: false,
        message: `Limite de ${limitType} atingido. Faça upgrade do seu plano.`
      });
    }
    next();
  };
};

// Get token from model, create cookie and send response
exports.sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        limits: user.limits
      }
    });
};
