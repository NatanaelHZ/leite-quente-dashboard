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
          expiresIn: '2h'
        }
      );

      const logged = {
        email: user.email,
        name: user.name,
        id: user.id,
        token
      };

      return res.status(200).json({ data: logged, message: 'login_success' });
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

exports.register = async (req, res) => {
  try {
    const has = Object.prototype.hasOwnProperty;
    const user = { ...req.body };
    const { email } = user;

    const userCreated = await User.create(user);

    if (userCreated.id) {
      const token = jwt.sign(
        { user_id: userCreated.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '9h'
        }
      );

      userCreated.token = token;

      if (has.call(user, 'password')) {
        delete user.password;
      }
    }

    res.status(201).json({ data: userCreated, message: 'register_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
