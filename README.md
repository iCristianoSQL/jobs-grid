
# Gerenciador de Vagas

Repositório de gerenciamento de vagas para que vocês possam controlar de forma melhor as vagas aplicadas.


## Instalação

### É necessario ter o node 18.17.0 ou superior.

#### Instale o yarn.
```bash
  npm install --global yarn
```
    
#### Verifique a versão do yarn.
```bash
  yarn --version
```
        
#### Instale as dependencias.
```bash
  cd jobs-grid
  yarn install
```

#### Feito isso, é necessario gerar o banco de dados e as migrations com o Prisma.

```bash
    npx prisma generate
    npx prisma migrate dev
```

#### Inicie o sistema.

```bash
  yarn dev
```

## O Sistema
No sistema em questão, é possível cadastrar os seguintes campos:

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
