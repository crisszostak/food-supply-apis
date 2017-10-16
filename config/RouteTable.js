const {ControllerFactory} = require('../app/library/controller/ControllerFactory');
const UserController = ControllerFactory.createController('user');
const FoodController = ControllerFactory.createController('food');

const RouteTable = {
  "get": [
      {
          path: "/food/all",
          acl: 'guest',
          actions: [
              FoodController.getFoodsAll.bind(FoodController)
          ],
          args: []
      }
  ],
  "post": [
      {
          path: "/user/register",
          acl: 'guest',
          actions: [
              UserController.register.bind(UserController)
          ],
          args: [
              "login","password"
          ]
      },
      {
          path: "/user/auth",
          acl: 'guest',
          actions: [
              UserController.auth.bind(UserController)
          ],
          args: [
              "login", "password"
          ]
      },
  ],
  "put": [

  ]
};

module.exports = { RouteTable };