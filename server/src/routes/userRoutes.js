const UserController = require('../controllers/UserController');

module.exports = (routes, auth) => {
    routes.post("/users/register", UserController.registerUser);
    //routes.post("/users/login", UserController.loginUser);
    routes.get("/users", auth, UserController.getAllUsers);
    routes.get("/users/:id", auth, UserController.getUserbyId);
    routes.put("/users/:id", auth, UserController.updateUser);
    routes.delete("/users/:id", auth, UserController.deleteUser);
};