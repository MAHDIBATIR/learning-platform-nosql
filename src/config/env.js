// Question: Quelles sont les informations sensibles à ne jamais commiter ?
// Réponse : Les informations sensibles à ne jamais commiter incluent les mots de passe, les clés API, les jetons d'accès, et toute autre information confidentielle qui pourrait compromettre la sécurité de l'application.

// Question: Pourquoi utiliser des variables d'environnement ?
// Réponse : Les variables d'environnement permettent de configurer l'application de manière flexible et sécurisée, sans avoir à modifier le code source. Elles facilitent également la gestion des configurations pour différents environnements (développement, test, production).
const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
}

validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};