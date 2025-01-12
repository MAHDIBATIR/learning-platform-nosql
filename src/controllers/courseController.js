// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route définit l'URL et la méthode HTTP pour accéder à une ressource, tandis qu'un contrôleur contient la logique métier pour traiter la requête et générer la réponse. Les routes délèguent la logique métier aux contrôleurs.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique métier des routes permet de structurer le code de manière modulaire et maintenable. Cela facilite la réutilisation du code, la gestion des tests, et la collaboration entre les développeurs.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
};