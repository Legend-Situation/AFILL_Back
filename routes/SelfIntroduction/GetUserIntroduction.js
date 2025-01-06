const { Introduction } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const GetUserIntroduction = async (req, res) => {
  try {
    Introduction.findAll({
      where: {
        userId: req.user.dataValues.userId
      }
    })
      .then(introduction => {
        if (!introduction) {
          return res.status(404).send(authUtil.successFalse(404, '소개글을 찾을 수 없습니다'));
        }
        return res.status(200).send(authUtil.successTrue(200, '소개글 조회 성공', introduction));
      });

  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.successFalse(500, '서버 오류'));
  }
};

module.exports = GetUserIntroduction;
