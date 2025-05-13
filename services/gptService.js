const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.getResponseWithTranslation = async (systemPrompt, messages) => {
  const chatMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: chatMessages,
    temperature: 0.7
  });

  const aiText = response.choices[0].message.content;

  const translationPrompt = `다음 문장을 한국어로 번역하고, 한국어식 발음(음차 표기)도 알려줘. 문장: "${aiText}"`;

  const translationResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: translationPrompt }],
    temperature: 0.5
  });

  const translationText = translationResponse.choices[0].message.content;

  const [translated, pronunciation] = translationText.split(/\n/).map(s =>
    s.replace(/^(번역|발음)[:：]?\s*/i, '').trim()
  );

  return {
    aiText,
    translated,
    pronunciation
  };
};
