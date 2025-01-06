const { Introduction } = require('../../models');
const authUtil = require('../../response/authUtil.js');

const UpdateIntroduction = async (req, res) => {
  const { des, title } = req.body;
  const introductionId = req.params.id;

  try {
    const introductions = await Introduction.findOne({
      where: { introductionId: introductionId },
      raw: true
    });

    if (!introductions) {
      return res
        .status(404) 
        .send(authUtil.successFalse(404, '게시글을 찾을 수 없습니다.'));
    }

    if (introductions.userId !== req.user.dataValues.userId) {
      return res
        .status(403) 
        .send(authUtil.successFalse(403, '본인만 수정할 수 있습니다.'));
    }

    await Introduction.update(
      {
        title,
        des,
        updatedAt: new Date()
      },
      {
        where: { introductionId: introductionId },
        returning: true
      }
    );

    return res
      .status(200)
      .send(authUtil.successTrue(200, '자소서 수정완료'));

  } catch (error) {
    console.error(error);
    return res.status(500).send(authUtil.successFalse(500, '서버 오류'));
  }
};

module.exports = UpdateIntroduction;
