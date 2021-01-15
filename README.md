# cnz-api

##### SERVIÇOS DE USUÁRIO #####

A API espera receber uma request do tipo POST para '/users' para cadastro
de novos usuários.

Estrutura do POST:

```
JSON {
  data: {
    title: 'chave',
    content: {
      phone: 'número de telefone',
      chave: valor
    }
  }
}
```

A primeira requisição dever do tipo POST com o número de telefone e nome do usuário.
Exemplo:

JSON
```
{
  data: {
    title: 'phone',
    content: {
      phone: '9299292929',
      nome: 'Chama no zap'
    }
  }
}
```

Para salvar endereço, a requisição deve ser feita com a chave que se quer que seja salva.
Exemplo:

JSON
```
{
  data: {
    title: 'cep',
    content: {
      phone: '9299292929',
      cep: '83828250'
    }
  }
}
```

## FORMATO DA REQUEST (ERROR)
Caso a requisição não seja feita no formato listado anteriormente, a API lidará como Bad request, respondendo o seguinte JSON:
```
{
  errors: {
      request: {
        name: 'Bad request',
        message: 'The request must be this format: { data: { title, content } }',
      }
    },
    code: 400,
  }
}
```

## Função responsável: createUser (controller)

-- A função *** createUser *** recebe os parametros citados anteriormente através do body da requisição e os trata.
Há uma validação para CPF, cep, número de telefone etc, antes de salvar
essas informações no banco.

Ao não reconhecer o número de telefone, a função lança um erro (USER_NOT_FOUND)


### REQUISIÇÕES


---- createUser()
Para criação de um usuário, é necessário fazer um POST para a rota '/'.
A API retornará seus dados já presentes no banco, com excessão do atual dado inserido.

<p>Status code 201</p>
```
{
    "address": {
        "cep": "",
        "number": "",
        "complement": ""
    },
    "name": "",
    "purchaseHistory": [],
    "desatived": false,
    "_id": "5ffd88894ac9285aadbe",
    "phone": "111444554",
    "__v": 0
}
```

Se o usuário ainda não existe no banco, será necessário criá-lo a partir do primeiro contato com o número de telefone. A partir deste ponto pode-se adicionar o restante das informações.

## ERROS
<p>Status code 11000</p>
Se o usuário já existe no banco, ao tentar criá-lo será estourado o erro 11000 do mongoose.
obs: A API responderá como Bad request (400)


Se o item a ser inserido não passar nas validações de tipo/tamanho etc,
a resposta será um json no seguinte formato, com todos os erros de validação encontrados:

<p>Status 400 - Bad Request</p>
```
{
    "errors": {
        "cpf": {
            "name": "ValidatorError",
            "message": "Path `cpf` (`A`) is shorter than the minimum allowed length (11).",
            "properties": {
                "message": "Path `cpf` (`A`) is shorter than the minimum allowed length (11).",
                "type": "minlength",
                "minlength": 11,
                "path": "cpf",
                "value": "A"
            },
            "kind": "minlength",
            "path": "cpf",
            "value": "A"
        }
    },
    "_message": "Validation failed",
    "message": "Mensagem de erro."
}
```

<p>Status 404 - Bad Request</p>

Se a requisição busca um usuário não cadastrado, a API retornará Not Found, no seguinte formato:

```
{
  errors: {
      user: {
        name: 'Not found',
        message: 'User not found on database',
      }
    },
    code: 404,
  }
}
```


