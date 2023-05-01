const {MongoClient} = require('mongodb')
const bcrypt = require('bcrypt');
const {ObjectId} = require('bson');

const ERROR_MSG_NO_PARAMS = "Não foram passados os parâmetros de conexão ao banco de dados! " + 
"Verifique se estas informações estão presentes no arquivo .env na raíz do projeto.";

class ClientRepository{
    constructor(connectionParams){
        this.url = connectionParams.url;
        this.dbName = connectionParams.dbName;

        if (this.url === undefined || this.dbName === undefined){
            throw new Error(ERROR_MSG_NO_PARAMS);
        }
    }

    async connect(){
        this.client = new MongoClient(this.url);
        await this.client.connect();
        this.collection = this.client.db(this.dbName).collection("clients");
    }

    async disconnect(){
        await this.client.close();
    }

    async insertOne(newClient){
        // Primeiro checa se um cliente com o mesmo email já existe
        const dummyClient = await this.collection.findOne({"email" : newClient.email});

        if (dummyClient !== null){
            throw new Error();
        }

        const salt = await bcrypt.genSalt();
        newClient.password = await bcrypt.hash(newClient.password, salt);
        
        await this.collection.insertOne(newClient);
        return newClient;
    }

    async checkCredentials(credentials){
        // Checa se um cliente com o email e senha passadas existe
        const client = await this.collection.findOne({"email" : credentials.email});

        if (client){
            // Se sim, checa se a senha passada (hasheada com salt) bate com a senha
            // hasheada com salt salva no banco de dados
            const passOk = await bcrypt.compare(credentials.password, client.password);

            // Se sim, retorna o cliente
            if (passOk){
                return client;
            }
        }

        throw new Error();
    }

    async findAll(){
        const cursor = await this.collection.find();

        let list = [];
        let i = 0;
        while (await cursor.hasNext()){
            let currItem = await cursor.next()
            list[i++] = currItem
        }
        console.log(list);
    }

    async findOneById(id){
        
        const _id = ObjectId(id);
        const client = await this.collection.findOne({_id});

        if (client === null){
            throw new Error(`Client with id ${_id} does not exist!`);
        }

        return client;
    }
}

module.exports = ClientRepository;