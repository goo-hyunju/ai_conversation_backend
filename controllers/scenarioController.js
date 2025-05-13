const db = require('../db/pool');

exports.getScenarios = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM scenarios');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch scenarios' });
    }
};
