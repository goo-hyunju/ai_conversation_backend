const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

router.post('/', conversationController.startConversation);
router.post('/:id/messages', conversationController.sendMessage); // 추가
router.get('/:id/messages', conversationController.getMessages);

module.exports = router;
