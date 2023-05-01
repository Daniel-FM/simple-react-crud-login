const jwt = require('jsonwebtoken');
const HttpStatus = require("../constants/httpStatuses.js");

// 3 dias, em segundos
const MAX_AGE = 3 * 24 * 60 * 60;
const PRIVATE_KEY = "my_key";

// O uso de "id" para nomear o argumento aqui faz com que o payload a ser passado para
// a token que será criada e assinada aqui seja "{id: <o id do cliente>}"
function createToken(id){
    // O tempo de expiração de um jwt deve ser em segundos
    return jwt.sign( {id} , PRIVATE_KEY, {
        expiresIn: MAX_AGE
    });
}

class ClientController{

    constructor(repo){
        this.clientRepository = repo;
    }

    createClient = async(req,res) => {
        try{
            const user = await this.clientRepository.insertOne(req.body);
            res.status(HttpStatus.OK_CREATED).json(user);
        }catch(e){
            res.status(HttpStatus.CONFLICT).send();
        }
    }

    getLoggedInClient = async(req, res) => {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, PRIVATE_KEY, async (err, decodedToken) => {

                if (err) {
                    console.log("Error verifying token");
                    res.status(HttpStatus.NOT_FOUND).send();
                } else {
                    try{
                        const client = await this.clientRepository.findOneById(decodedToken.id);
                        res.statusHttpStatus.OK.json(client);
                    }catch{
                        console.log("Error: no client found with the token's id: "+decodedToken.id);
                        res.status(HttpStatus.NOT_FOUND).send();
                    }
                }
            });
        } else {
            console.log("Error: No token (not logged in)");
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    login = async(req,res) => {
        try{
            const client = await this.clientRepository.checkCredentials(req.body);
            const token = createToken(client._id);

            // O tempo de expiração de um cookie deve ser em milissegundos
            res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
            res.statusHttpStatus.OK.json({ client: client._id });
            
        }catch(e){
            console.log(e);
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    logout = (req,res) => {
        res.clearCookie("jwt");
        res.statusHttpStatus.OK.send();
    }

}

module.exports = ClientController;