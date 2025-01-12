// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est important de définir des stratégies de mise en cache appropriées, telles que la définition de TTL (Time To Live) pour les clés, l'invalidation du cache lorsque les données changent, et l'utilisation de structures de données adaptées aux besoins de l'application.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés descriptifs et hiérarchiques, l'ajout de préfixes pour éviter les collisions de noms, et la définition de TTL pour les clés afin de gérer la mémoire de manière efficace.


const db = require('../config/db');

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  const client = db.getRedisClient();
  await client.set(key, JSON.stringify(data), 'EX', ttl);
}

async function getCachedData(key) {
  const client = db.getRedisClient();
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

module.exports = {
  cacheData,
  getCachedData
};