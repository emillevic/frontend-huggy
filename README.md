# Front-End Huggy | Emille Sampaio

Projeto desenvolvido para o desafio técnico de Front-End Developer da Huggy. Consistem em uma aplicação web que permite a gestão de contatos de uma conta da Huggy.
## Após clonar o projeto, instale as dependências com o seguinte comando:

```
npm install
```

## Pré-configurações

Para configurar o projeto, é necessário definir algunas variáveis obrigatórias no sistema.
Inicialmente crie um arquivo .env na raiz do projeto e defina a VUE_APP_BASE_URL, que será a BASE_URL utilizada para a api, nesse caso a versão 3 da api da huggy (exemplo pode ser visto em .env.example).

Após isso, crie um arquivo config.json, onde ficarão as configurações propostas pela api utilizada para a header das requisições. Esse arquivo precisa conter tal objeto:

{
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer xxx"
}

É importante frisar que o Token de autorização é a chave gerada ao fazer as configurações necessárias no painel da Huggy e deve ser definida no seu arquivo de configurações, já que o projeto em questão está sendo rodado em ambiente de desenvolvimento.
### Após as configurações, compile o projeto para desenvolvimento:
```
npm run serve
```

### Caso necessário, para compilar o projeto para produção:
```
npm run build
```
