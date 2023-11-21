const tableService = require("../services/tableService");
module.exports = async function (context, req) {
    try{
        if(!req.body){
            context.res = {
                status: 400,
                body: "Please pass a request body"
            };
            return;
        }

        const {name, roles, password} = req.body;

        if(!name || !roles || !password){
            context.res = {
                status: 400,
                body: "name. roles or password are empty, please provide them all"
            };
            return;
        }

        await tableService.insertUser({name, roles, password});

    }catch(error){
        context.res = {
            status: 500, 
            body: error.message,       
        };
    }
    
}