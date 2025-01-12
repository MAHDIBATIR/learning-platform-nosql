// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est important de valider les variables d'environnement au démarrage pour s'assurer que toutes les configurations nécessaires sont présentes et correctes. Cela permet d'éviter les erreurs de configuration qui pourraient entraîner des comportements inattendus ou des pannes de l'application.

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application peut ne pas fonctionner correctement ou échouer au démarrage. Il est donc important de lever une erreur explicative pour informer le développeur ou l'administrateur du problème.onse : Les variables d'environnement permettent de configurer l'application de manière flexible et sécurisée, sans avoir à modifier le code source. Elles facilitent également la gestion des configurations pour différents environnements (développement, test, production).

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