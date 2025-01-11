// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser le code de connexion, de simplifier la gestion des erreurs et des retries, et de faciliter la maintenance et les tests du code. Cela permet également de séparer les préoccupations, en gardant la logique de connexion distincte de la logique métier de l'application.

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour gérer proprement la fermeture des connexions, il est important d'écouter les événements de terminaison de l'application (comme 'SIGINT' ou 'SIGTERM') et d'appeler les méthodes de fermeture des clients de base de données. Par exemple, pour MongoDB, on peut utiliser mongoClient.close(), et pour Redis, on peut utiliser redisClient.quit(). Cela garantit que les connexions sont correctement fermées et que les ressources sont libérées.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    setTimeout(connectMongo, 5000); // Retry after 5 seconds
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redis.uri });
    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
      setTimeout(connectRedis, 5000); // Retry after 5 seconds
    });
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis', error);
    setTimeout(connectRedis, 5000); // Retry after 5 seconds
  }
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  getDb: () => db
};