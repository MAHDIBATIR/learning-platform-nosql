// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est important de définir des stratégies de mise en cache appropriées, telles que la définition de TTL (Time To Live) pour les clés, l'invalidation du cache lorsque les données changent, et l'utilisation de structures de données adaptées aux besoins de l'application.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés descriptifs et hiérarchiques, l'ajout de préfixes pour éviter les collisions de noms, et la définition de TTL pour les clés afin de gérer la mémoire de manière efficace.


const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URI });

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  try {
    await connectRedis();
    await client.set(key, JSON.stringify(data), { EX: ttl });
    console.log(`Data cached with key: ${key}`);
  } catch (error) {
    console.error("Error caching data:", error);
    throw error;
  }
}

async function getData(key) {
  try {
    await connectRedis();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting cached data:", error);
    throw error;
  }
}

async function deleteData(key) {
  try {
    await connectRedis();
    await client.del(key);
    console.log(`Data deleted with key: ${key}`);
  } catch (error) {
    console.error("Error deleting cached data:", error);
    throw error;
  }
}

module.exports = {
  cacheData,
  getData,
  deleteData,
  connectRedis,
};