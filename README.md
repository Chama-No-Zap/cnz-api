# cnz-api

##### SERVIÇOS DE USUÁRIO #####

A API espera receber uma request do tipo POST para cadastro
de novos usuários.

Estrutura do POST:

JSON {
  data: {
    title: 'chave',
    content: {
      phone: 'número de telefone',
      chave: valor
    }
  }
}

A primeira requisição dever do tipo POST com o número de telefone e nome do usuário.
Exemplo:

JSON {
  data: {
    title: 'phone',
    content: {
      phone: '9299292929',
      nome: 'Chama no zap'
    }
  }
}

Para salvar endereço, a requisição deve ser feita com a chave que se quer que seja salva.
Exemplo:

JSON {
  data: {
    title: 'cep',
    content: {
      phone: '9299292929',
      cep: '83828250'
    }
  }
}

## Função responsável: createUser (controller)

-- A função *** createUser *** recebe os parametros acima através do body da requisição e os trata.
Há uma validação para CPF, cep, número de telefone etc, antes de salvar
essas informações no banco.

Ao não reconhecer o número de telefone, a função lança um erro (USER_NOT_FOUND)


