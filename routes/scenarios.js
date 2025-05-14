const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenarioController');
/**
 * @swagger
 * /scenarios:
 *   get:
 *     summary: 모든 시나리오 가져오기
 *     responses:
 *       200:
 *         description: 시나리오 목록
 */
router.get('/', scenarioController.getScenarios);

module.exports = router;
