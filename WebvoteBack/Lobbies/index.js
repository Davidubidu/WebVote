const lobbiesService = require('../services/lobbiesService');
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
    const hasUserIdProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'userId'
    );
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
      const lobbies = await lobbiesService.getLobbiesById(context, idList);
      context.res = {
        status: 200,
        body: lobbies
      };
      // add logic here to include user search by any param except for password
    } else if (hasUserIdProperty) {
      const lobbies = await lobbiesService.getLobbiesByUser(
        context,
        inputObject.userId
      );
      context.res = {
        status: 200,
        body: lobbies
      };
    } else {
      const allLobbies = await lobbiesService.getAllLobbies(context);
      context.res = {
        status: 200,
        body: allLobbies
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
    const inputObject = req.body;
    // structure of queryObject: {name : lobbyName , creatorId : idOfCreator, participants(not provided in the body) : [participants], password(optional) :  password}
    const queryObject = {};

    // check that a name for the lobbie has been provided and if so, add it to the field list, the name is obligatory
    const hasNameProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'name'
    );
    if (hasNameProperty) {
      queryObject.name = inputObject.name;
    } else {
      context.res = {
        status: 400,
        body: 'Please pass a name for the lobby'
      };
    }

    // check that a creators Id for the lobbie has been provided and if so, add it to the field list, the creator's id is obligatory,
    // the creator will be the first participant of the lobby
    const hasCreatorIdProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'creatorId'
    );
    if (hasCreatorIdProperty) {
      queryObject.creatorId = inputObject.creatorId;
      queryObject.participants = [inputObject.creatorId];
    } else {
      context.res = {
        status: 400,
        body: 'Please pass the id of the creator of the lobby'
      };
    }

    // check if a password for the lobby has been provided, if not the lobby becomes public by default
    const hasPasswordProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'password'
    );
    if (hasPasswordProperty) {
      queryObject.password = inputObject.isPrivate;
    }

    await lobbiesService.createLobby(context, queryObject);
    const allUsers = await lobbiesService.getAllLobbies(context);
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
    const lobbyId = new ObjectId(inputObject._id);
    delete inputObject._id;
    const queryObject = {};

    const hasNameProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'name'
    );
    if (hasNameProperty) {
      queryObject.name = inputObject.name;
    }

    const hasPasswordProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'password'
    );
    if (hasPasswordProperty) {
      queryObject.password = inputObject.password;
    }
    if (!lobbyId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of a lobby'
      };
    }
    if (!queryObject) {
      context.res = {
        status: 400,
        body: 'no lobby update specified'
      };
    }
    await lobbiesService.updateLobby(context, queryObject, lobbyId);
    const allUsers = await lobbiesService.getAllLobbies(context);
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
    const lobbyId = req.query._id;
    if (!lobbyId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of the lobby to delete'
      };
    }
    const lobbyIdObject = new ObjectId(lobbyId);
    await lobbiesService.deleteLobby(context, lobbyIdObject);
    const allUsers = await lobbiesService.getAllLobbies(context);
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
