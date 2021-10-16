const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: 'login_failed',
        email: 'email_invalid'
      });
    }

    if (await user.comparePassword(password)) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '9h'
        }
      );

      user.token = token;

      return res.status(200).json({ data: user, message: 'login_success' });
    }

    return res
      .status(401)
      .json({ error: 'login_error', password: 'wrong_password' });
  } catch (error) {
    return res
      .status(401)
      .json({ error: error.message, message: 'login_error' });
  }
};
