// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: Le point d'entrée de l'application doit être organisé de manière à initialiser les connexions aux bases de données, configurer les middlewares, monter les routes, et démarrer le serveur. Cela permet de structurer le code de manière claire et maintenable.

// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: La meilleure façon de gérer le démarrage de l'application est d'utiliser une fonction asynchrone pour initialiser les connexions aux bases de données et configurer les middlewares avant de démarrer le serveur. En cas d'erreur, il est important de gérer proprement l'arrêt de l'application.
const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');

const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // Configurer les middlewares Express
    app.use(express.json());

    // Monter les routes
    app.use('/courses', courseRoutes);


    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await db.getMongoClient().close();
  await db.getRedisClient().quit();
  process.exit(0);
});

startServer();