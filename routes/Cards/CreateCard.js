const { Card } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const CreateCard = async (req, res) => {
  const { cardTitle, startDate, endDate, keyword, role, impressions, imgUrl } = req.body;

  try {
    const newCard = await Card.create({
      cardTitle,
      startDate,
      endDate,
      keyword,
      role,
      impressions,
      imgUrl,
      userId: req.user.dataValues.userId
    });

    res.status(201).json(authUtil.successTrue(200, "카드 생성 완료", newCard));
  } catch (error) {
    console.error(error);
    res.status(500).json(authUtil.successFalse(error.message));
  }

};

module.exports = CreateCard;
