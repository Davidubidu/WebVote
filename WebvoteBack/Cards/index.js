const cardService = require('../services/cardService');
const { buildResponse, httpHandler } = require('../Middleware/afUtils');
const { ObjectId } = require('mongodb');
const url = require('eslint-plugin-n/lib/rules/prefer-global/url');

module.exports = async function (context) {
  const handlers = [
    { method: 'get', function: handleGet },
    { method: 'post', function: handlePost },
    { method: 'patch', function: handlePatch },
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
      const users = await cardService.getCardsById(context, idList);
      context.res = {
        status: 200,
        body: users
      };
      // add logic here to include user search by any param except for password
    } else {
      const allCards = await cardService.getAllCards(context);
      context.res = {
        status: 200,
        body: allCards
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
    const queryObject = {};
    const hasNameProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'name'
    );
    if (hasNameProperty) {
      queryObject.name = inputObject.name;
    } else {
      context.res = {
        status: 400,
        body: 'Please pass the card name'
      };
    }
    const hasLobbyIdProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'lobbyId'
    );
    if (hasLobbyIdProperty) {
      queryObject.lobbyId = inputObject.lobbyId;
    } else {
      context.res = {
        status: 400,
        body: 'Please pass the id of the lobby this card is linked to'
      };
    }
    queryObject.upVotes = [];
    queryObject.downVotes = [];

    await cardService.insertCard(context, queryObject);
    const allCards = await cardService.getAllCards(context);
    context.res = {
      status: 200,
      body: allCards
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
    if (!req.body) {
      context.res = {
        status: 400,
        body: 'Please pass a request body'
      };
      return;
    }
    const inputObject = req.body;
    const cardId = new ObjectId(inputObject._id);
    delete inputObject._id;
    const queryObject = {};
    const hasNameProperty = Object.prototype.hasOwnProperty.call(
      inputObject,
      'name'
    );
    if (hasNameProperty) {
      queryObject.name = inputObject.name;
    }
    if (!cardId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of a card'
      };
    }
    if (!queryObject) {
      context.res = {
        status: 400,
        body: 'no card update specified'
      };
    }
    await cardService.updateCard(context, queryObject, cardId);
    const allCards = await cardService.getAllCards(context);
    context.res = {
      status: 200,
      body: allCards
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
    const cardId = req.query._id;
    if (!cardId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of the user to delete'
      };
    }
    const cardIdObject = new ObjectId(cardId);
    await cardService.deleteCard(context, cardIdObject);
    const allCards = await cardService.getAllCards(context);
    context.res = {
      status: 200,
      body: allCards
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}

async function handlePatch(context) {
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
    const cardId = new ObjectId(inputObject._id);
    if (!cardId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of a card'
      };
    }
    if (!inputObject.userId) {
      context.res = {
        status: 400,
        body: 'Please pass the id of the user that is voting'
      };
    }
    if (!inputObject.vote || inputObject.vote !== 0 || inputObject.vote !== 1) {
      context.res = {
        status: 400,
        body: 'Please pass a 0 for downvote or 1 for upvote'
      };
    }
    await cardService.voteCard(
      context,
      cardId,
      inputObject.userId,
      inputObject.vote
    );
    const allCards = await cardService.getAllCards(context);
    context.res = {
      status: 200,
      body: allCards
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}
