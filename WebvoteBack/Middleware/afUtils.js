const { MongoClient } = require('mongodb');
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

async function httpHandler(context, methodHandlers) {
  let client;
  let session;
  try {
    client = new MongoClient(mongoConnectionString);

    // connect to the server
    await client.connect();

    // Transactional logic
    session = client.startSession();

    context.db = {
      client,
      session
    };
    // Hadndle the request checking the current req method
    await methodHandler(context, methodHandlers);
  } catch (error) {
    // Add rollback logic here

    const e = {
      error: {
        status: error?.status,
        body: error?.message
      }
    };

    buildResponse(context, error?.status || 500, error?.message, e);
  } finally {
    await session.endSession();
    client.close();
  }
}

function buildResponse(
  context,
  status,
  body,
  headers = { 'Content-Type': 'application/json' }
) {
  context.res = {
    status,
    body,
    headers
  };
}

async function methodHandler(context, handlers) {
  const requestMethod = context.req.method.toLowerCase();

  if (!handlers.map((x) => x.method).includes(requestMethod)) {
    throw new Error({
      status: 405,
      message: `Method ${requestMethod} not allowed`
    });
  } else {
    const handler = handlers.find((x) => x.method === requestMethod);
    await handler.function(context);
  }
}

module.exports = {
  httpHandler,
  buildResponse
};
