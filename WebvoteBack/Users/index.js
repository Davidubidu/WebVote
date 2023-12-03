const userService = require('../services/userService');
const { buildResponse, httpHandler } = require('../Middleware/afUtils');
const { ObjectId } = require('mongodb');
const url = require('eslint-plugin-n/lib/rules/prefer-global/url');

module.exports = async function (context) {
  const handlers = [
    { method: 'get', function: handleGet },
    { method: 'post', function: handlePost },
    { method: 'put', function: handlePut },
    { method: 'delete', function: handleDelete }
  ];
  await httpHandler(context, handlers);
};

async function handleGet(context) {
  // Logic here
  const req = context.req;
  try {
    const inputObject = req.query;
    const queryObject = {};
    const hasIdProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      '_id'
    );
    if (hasIdProperty) {
      queryObject._id = inputObject._id.split(',');
      const idList = [];
      queryObject._id.forEach((id) => {
        idList.push(new ObjectId(id));
      });
      const users = await userService.getUsersById(context, idList);
      context.res = {
        status: 200,
        body: users
      };
      // add logic here to include user search by any param except for password
    } else {
      const allUsers = await userService.getAllUsers(context);
      context.res = {
        status: 200,
        body: allUsers
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}

async function handlePost(context) {
  const req = context.req;
  try {
    if (!req.body) {
      context.res = {
        status: 400,
        body: 'Please pass a request body'
      };
      return;
    }
    const { name, roles, password } = req.body;

    if (!name || !roles || !password) {
      context.res = {
        status: 400,
        body: 'Please pass the user name, roles and password'
      };
    }

    await userService.insertUser(context, { name, roles, password });
    const allUsers = await userService.getAllUsers(context);
    context.res = {
      status: 200,
      body: allUsers
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}

async function handlePut(context) {
  // Logic here
  const req = context.req;
  try {
    const inputObject = req.body;
    const userId = new ObjectId(inputObject._id);
    delete inputObject._id;
    const queryObject = {};
    const hasNameProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'name'
    );
    if (hasNameProperty) {
      queryObject.name = inputObject.name;
    }
    const hasRolesProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'roles'
    );
    if (hasRolesProperty) {
      queryObject.roles = inputObject.roles;
    }
    const hasPasswordProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'password'
    );
    if (hasPasswordProperty) {
      queryObject.password = inputObject.password;
    }
    if (!userId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of a user'
      };
    }
    if (!queryObject) {
      context.res = {
        status: 400,
        body: 'no user update specified'
      };
    }
    await userService.updateUser(context, queryObject, userId);
    const allUsers = await userService.getAllUsers(context);
    context.res = {
      status: 200,
      body: allUsers
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}

async function handleDelete(context) {
  // Logic here
  const req = context.req;
  try {
    const userId = req.query._id;
    if (!userId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of the user to delete'
      };
    }
    const userIdObject = new ObjectId(userId);
    await userService.deleteUser(context, userIdObject);
    const allUsers = await userService.getAllUsers(context);
    context.res = {
      status: 200,
      body: allUsers
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}
