Aplicação CRUD simples com login para praticar com React, e outros frameworks. Esta é basicamente uma expansão da simple-react-crud, mas com funcionalidade de login: o acesso à aplicação principal é restrito a usuários logados. Já que a aplicação original já usava um repositório de objetos chamados de "User", aqui os usuários logados são chamados de "Client". Eventualmente serão feitas refatorações nas quais, entre outras coisas, alguns nomes serão alterados para que ela adquira um contexto que faça mais sentido.

O repositório consiste em dois projetos: api e client. Dentro da pasta de cada um deles deverá haver um arquivo ".env", cada um contendo as seguintes variáveis de ambiente:

Em /client :

  REACT_APP_API_URL = <O endereço onde a API estará rodando. Por padrão, "http://localhost:4000" se for rodar localmente>
  REACT_APP_API_KEY = <A chave da API, se ela for implantada na nuvem. Se for rodar localmente, esta propriedade não é necessária>

Em /api :

  DB_URL  = <Endereço do banco de dados MongoDB a ser usado na aplicação. Exemplo: "mongodb+srv://usuario:senha@cluster0.abc1def.mongodb.net/?retryWrites=true&w=majority">
  DB_NAME = <Nome do banco de dados no endereço fornecido em DB_NAME>

  TST_DB_URL  = <Endereço do banco de dados MongoDB a ser usado nos testes unitários, ao se executar "npm test">
  TST_DB_NAME = <Nome do banco de dados no endereço fornecido em TST_DB_NAME>

Com os arquivos criados, dê um "npm install" em cada um desses diretórios, para instalar as respectivas dependências do cliente e da api, e depois você pode executar cada aplicação em seu próprio terminal com "npm start"
