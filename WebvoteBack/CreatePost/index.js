const{testConection} = require("../services/tableService");
module.exports = async function (context, req) {
    try{

        await testConection();
        // if(!req.body){
        //     context.res = {
        //         status: 400,
        //         body: "no request body, please pass a request body"
        //     };
        //     return;
        // }

        // const {name, roles, lobbies} = req.body;

        // if(!name || !roles || !lobbies){
        //     context.res = {
        //         status: 400,
        //         body: "name, roles or lobbies are Null, please pass all required parameters"
        //     };
        //     return;
        // }

        // const entity = {
        //     PartitionKey: {'_': name},
        //     RowKey: {'_':'1'},
        //     roles: {'_': roles},
        //     lobbies: {'_': lobbies}
        // }
        
        // const result = await insertEntity("Users", entity);

        // context.res = {
        //     body: result
        // };

    }catch(error){
        context.res = {
            status: 500, 
            body: error.message,       
        };
    }
    
}