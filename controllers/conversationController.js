const db = require('../db/pool');
const { getResponseWithTranslation } = require('../services/gptService');

exports.startConversation = async (req, res) => {
    const { user_id, scenario_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO conversations (user_id, scenario_id) VALUES ($1, $2) RETURNING *',
            [user_id, scenario_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to start conversation' });
    }
};

exports.sendMessage = async (req, res) => {
    const conversationId = req.params.id;
    const { user_message } = req.body;

    try {
        const convo = await db.query(
            `SELECT c.*, s.system_prompt FROM conversations c
             JOIN scenarios s ON c.scenario_id = s.id
             WHERE c.id = $1`, [conversationId]);
        if (convo.rows.length === 0) return res.status(404).json({ error: 'Conversation not found' });

        const { system_prompt } = convo.rows[0];

        const historyRes = await db.query(
            'SELECT sender, content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
            [conversationId]
        );

        const history = historyRes.rows;

        const result = await getResponseWithTranslation(system_prompt, [...history, { sender: 'user', content: user_message }]);

        await db.query(
            'INSERT INTO messages (conversation_id, sender, content) VALUES ($1, $2, $3)',
            [conversationId, 'user', user_message]
        );
        await db.query(
            'INSERT INTO messages (conversation_id, sender, content, translated, pronunciation) VALUES ($1, $2, $3, $4, $5)',
            [conversationId, 'ai', result.aiText, result.translated, result.pronunciation]
        );

        res.status(200).json({
            user: user_message,
            ai: {
                original: result.aiText,
                translated: result.translated,
                pronunciation: result.pronunciation
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process message' });
    }
};

exports.getMessages = async (req, res) => {
    const conversationId = req.params.id;

    try {
        const result = await db.query(
            `SELECT sender, content, translated, pronunciation, created_at
             FROM messages
             WHERE conversation_id = $1
             ORDER BY created_at ASC`,
            [conversationId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};
