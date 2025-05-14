const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: 새로운 대화 시작
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               scenario_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 생성된 대화
 */
router.post('/', conversationController.startConversation);
router.post('/:id/messages', conversationController.sendMessage); // 추가
router.get('/:id/messages', conversationController.getMessages);

module.exports = router;
