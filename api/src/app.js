const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// Uma coleção de objetos com métodos de bancos de dados (models/repositories) é passado como argumento para que o objeto 
// app possa se abstrair de especificidades do banco de dados usado (por exemplo, o arquivo userRepository.js deste 
// projeto utiliza o banco MongoDB, mas poderia ser um que usa MySQL. Se o objeto conter métodos com os mesmos nomes, 
// que geram os mesmos resultados, ele poderá ser passado aqui sem que a aplicação do servidor note qualquer distinção)
function getApp(repositories){
    const app = express();

    // app.use(cors());

    // Este middleware faz com que as requisições que passem pelo servidor que sejam strings no formato json
    // sejam transformadas em actual objetos json. Dessa forma, quando pegarmos o campo body de uma response,
    // ele já vai vir como um objeto do qual podemos facilmente pegar seus campos, ao invés de um texto
    app.use(bodyParser.json());
    
    // Necessário para ler cookies pela requisição
    app.use(cookieParser())

    let connected = false;

    // Este middleware faz com o que o servidor estabeleça as conexões aos repositórios (se isso não já tiver
    // sido feito) antes de tratar uma requisição
    app.use(async (req,res,next)=>{
        if (!connected){
            for (const eachRepository of Object.values(repositories)){
                await eachRepository.connect();
            }
            connected = true;
        }

        //Não esquecer do next() no final da função do middleware!
        next();
    })

    // Este middleware adiciona uns headers na resposta às requisições de acordo com a política de CORS.
    // Basicamente, coisas que precisamos especificar que a nossa aplicação autoriza, porque senão ele não deixa requisições/respostas
    // entre o cliente a API passarem (pelo que entendi é pra nos obrigar a ter um certo controle sobre as requisições que circulam pela API,
    // e assim evitar que agentes desconhecidos possam mandar coisas pra ela que possam gerar problemas)
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
    });

    app.use(routes(repositories));

    return app;
}

module.exports = getApp