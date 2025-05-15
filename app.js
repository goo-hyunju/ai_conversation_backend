const express = require('express');
const app = express();
const scenariosRouter = require('./routes/scenarios');
const conversationsRouter = require('./routes/conversations');
require('dotenv').config();
app.use(express.json());

// ✅ 라우터 등록 (← 이게 중요!)
app.use('/scenarios', scenariosRouter);
app.use('/conversations', conversationsRouter);


// ✅ Swagger 설정
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AI Conversation API',
    version: '1.0.0',
    description: 'AI 영어/일본어 회화 학습 백엔드 API 명세서',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '개발 서버',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const cors = require('cors');
app.use(cors());