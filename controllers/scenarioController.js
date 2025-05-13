const db = require('../db/pool');

exports.getScenarios = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM scenarios');
        res.json(result.rows);
    } catch (error) {
        console.error("❌ 시나리오 불러오기 실패:", error);
        res.status(500).json({ error: 'Failed to fetch scenarios' });
    }
};
