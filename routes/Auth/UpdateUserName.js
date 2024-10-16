const { Users } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const UpdateUserName = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.dataValues.userId;

  try {
    const user = await Users.findOne({
      where: {
        userId,
      },
    });

    if (!user) {
      return res.status(404).send(authUtil.successFalse(404, '사용자를 찾을 수 없습니다.'));
    } else {
      await user.update({
        name: name,
      });
      return res.status(200).send(authUtil.successTrue(200, '유저이름 수정 성공'));
    }

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(authUtil.successFalse(500, '디코딩 중 문제발생 Console 확인바람'));
  }
}

module.exports = UpdateUserName;
