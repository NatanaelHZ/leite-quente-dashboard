const { User } = require('../models');

exports.list = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      data: users,
      message: 'list_success'
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    const dataUser = {
      name: user.name,
      email: user.email,
      id: user.id
    };

    res.json({ data: dataUser, message: 'get_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      data: user,
      message: 'create_success'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    const { password } = data;

    const user = {
      ...(password !== '' && { password: data.password }),
      email: data.email,
      name: data.name
    };

    const updated = await User.update(user, { where: { id } });

    res.status(201).json({ data: updated, message: 'update_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });

    res.status(200).json({ data: user, message: 'delete_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
