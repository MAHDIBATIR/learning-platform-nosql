// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet de structurer le code de manière modulaire et maintenable. Cela facilite la gestion des routes, la réutilisation du code, et la collaboration entre les développeurs.

// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Pour organiser les routes de manière cohérente, il est important de regrouper les routes par fonctionnalité, d'utiliser des noms de routes descriptifs, et de suivre les conventions RESTful. Cela permet de rendre le code plus lisible et maintenable. 

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;