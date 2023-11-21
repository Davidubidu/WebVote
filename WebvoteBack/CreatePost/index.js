const tableService = require('../services/tableService');
const { buildResponse, httpHandler } = require('../Middleware/afUtils');

module.exports = async function (context) {
    const handlers = [
        { method: 'get', function: handleGet }, 
        { method: 'post', function: handlePost },
        { method: 'put', function: handlePut },
        { method: 'delete', function: handleDelete }
    ];
    await httpHandler(context, handlers);
}

async function handleGet(context) {

    // Logic here
    const req = context.req;
    try{

    }catch(error){
        context.res = {
            status: 500, 
            body: error.message,       
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

        await tableService.insertUser(context, {name, roles, password});

    }catch(error){
        context.res = {
            status: 500, 
            body: error.message,       
        };
    }
}

async function handlePut(context) {

    // Logic here
    const req = context.req;
    try{

    }catch(error){
        context.res = {
            status: 500, 
            body: error.message,       
        };
    }
}

async function handleDelete(context) {

    // Logic here
    const req = context.req;
    try{

    if (!name || !roles || !password) {
      context.res = {
        status: 400,
        body: 'name. roles or password are empty, please provide them all'
      };
      return;
    }

    await tableService.insertUser({ name, roles, password });
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    };
  }
}
