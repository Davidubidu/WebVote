const{testConection} = require("../services/tableService");
module.exports = async function (context, req) {
    try{

        await testConection();

    }catch(error){
        context.res = {
            status: 500, 
            body: error.message,       
        };
    }
    
}