const { Card } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const CreateCard = async (req, res) => {

  try {
    const newCard = await Card.findAll({ where: { userId: req.user.dataValues.userId } });

    res.status(201).json(authUtil.successTrue(200, "카드를 찾았습니다.", newCard));
  } catch (error) {
    console.error(error);
    res.status(500).json(authUtil.successFalse(error.message));
  }

};

module.exports = CreateCard;
