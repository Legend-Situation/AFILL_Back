const { Card, Introduction } = require('../../models');
const authUtil = require('../../response/authUtil.js');
const GptBody = require('./GptBody.json');
const request = require('request');

const GetIntroduction = async (req, res) => {
  const { title, cards } = req.body;
  const username = req.user?.name;
  let cardData = [];

  try {
    if (!Array.isArray(cards) || cards.length > 3) {
      return res.status(400).send(authUtil.successFalse(400, '카드는 최대 3개까지만 가능합니다'));
    }

    cardData = await Card.findAll({
      where: {
        cardId: cards,
      }
    });

    if (cardData.length === 0) {
      return res.status(404).send(authUtil.successFalse(404, '카드를 찾을 수 없습니다'));
    }

    // dataValues만 추출
    const cleanCardData = cardData.map(card => card.dataValues);
    const userMessage = `username : ${username} ${JSON.stringify(cleanCardData)}`;

    const updatedGptBody = {
      ...GptBody,
      messages: [
        ...GptBody.messages.slice(0, 2),
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": userMessage
            }
          ]
        }
      ]
    };

    // GPT API 요청 설정
    const options = {
      uri: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      body: updatedGptBody,
      json: true,
      headers: {
        'Authorization': `Bearer ${process.env.GPT_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
    };

    // GPT API 요청 실행
    request.post(options, async (err, httpResponse, body) => {
      if (err) {
        console.error('API 요청 에러:', err);
        return res.status(500).send(authUtil.successFalse(500, 'GPT API 요청 실패'));
      }

      if (body.error) {
        console.error('GPT 에러:', body.error);
        return res.status(400).send(authUtil.successFalse(400, body.error.message || 'GPT 처리 중 오류 발생'));
      }

      if (!body.choices || !body.choices[0]) {
        return res.status(500).send(authUtil.successFalse(500, 'GPT 응답이 올바르지 않습니다'));
      }

      // GPT 응답에서 텍스트 추출
      const generatedText = body.choices[0].message.content;

      await Introduction.create({
        title: title,
        cards: cards,  // 배열 그대로 전달 (모델에서 자동으로 문자열로 변환됨)
        des: generatedText,
        userId: req.user.dataValues.userId
      });

      res.status(200).send(authUtil.successTrue(200, '자기소개서 생성 완료', {
        content: generatedText
      }));
    });

  } catch (error) {
    console.error('처리 중 에러:', error);
    res.status(500).send(authUtil.successFalse(500, '서버 내부 오류'));
  }
};

module.exports = GetIntroduction;
