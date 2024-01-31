Pessoal, tornei público meu repositório de gerenciamento de vagas para que vocês possam controlar de forma melhor as vagas aplicadas. Ainda falta um refatoramento no código, pois eu o fiz às pressas com certa urgência kkkk.

- O projeto é fullstack, feito com Next, Prisma e SQLite.
- Não é necessário saber React nem Next para rodar; basta ter o Node na máquina e seguir os passos abaixo.
- Caso você não tenha o Yarn, rode "npm install --global yarn".
- Verifique se foi instalado com sucesso usando "yarn --version".
- Dentro do repositório, rode "yarn" ou "yarn install" para instalar as dependências (funciona como um 'bundle install').
- Rode "yarn dev" para iniciar o servidor.
- No sistema em questão, é possível cadastrar os seguintes campos:

- Título da vaga
- Empresa
- Data da aplicação
- Se obteve ou não resposta
- Se a vaga já foi encerrada
- Linkedin do recrutador
- Linkedin do tech lead
- Link para os detalhes da vaga (Gupy, Indeed, etc.)
- Se você enviou ou não mensagem ao recrutador
- Se você enviou ou não mensagem ao tech lead
De forma geral, acho que é isso. Estou à disposição para qualquer dúvida :)

--
É necessario ter o node 18.17.0 ou superior
Antes de inciar o projeto rode os seguintes comandos para criar o banco de dados e validar as migrations
"npx prisma generate"
"npx prisma migrate dev"
