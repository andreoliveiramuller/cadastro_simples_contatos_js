const contatos = []; // Este array será preenchido com objetos para cada contato.
let indiceEmEdicao = -1; // Este índice será usado para saber qual contato está sendo editado, ele é iniciado com -1 para indicar que não há nenhum contato sendo editado.

const salvar = () => {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const fone = document.getElementById("fone");
  //validação da entrada de dados
  const contato = new Object();//criar um objeto para cada contato
  contato.nome = nome.value;//atribuir o valor do campo nome ao atributo nome do objeto contato
  contato.email = email.value; //atribuir o valor do campo email ao atributo email do objeto contato
  contato.fone = fone.value; //atribuir o valor do campo fone ao atributo fone do objeto contato
  //validação se já tem um contato cadastrado
  if (indiceEmEdicao === -1) {
    contatos.push(contato);//adicionar o objeto contato ao array contatos
  } else {
    contatos[indiceEmEdicao] = contato;//substituir o objeto contato no array contatos
    indiceEmEdicao = -1;//desativar o modo de edição
    chavearExcluir();//desativar o botão excluir
  }
  listar();//atualizar a lista de contatos
  limpar();//limpar os campos do formulário
};

const listar = () => {
  const listaContatos = document.getElementById("listaContatos");//obter a referência do elemento select
  for (let i = listaContatos.length - 1; i >= 0; i--) {
    listaContatos.remove(i);//remover todos os elementos option do select
  }
  contatos.sort((antecessor, sucessor) => {
    let retorno = 0;//inicializar a variável retorno com 0
    antecessor.nome > sucessor.nome ? retorno = 1 : retorno = -1;//se o nome do antecessor for maior que o nome do sucessor, a variável retorno recebe 1, caso contrário recebe -1
    return retorno;//retornar o valor da variável retorno
  });
  for (let i = 0; i < contatos.length; i++) {
    let option = document.createElement("option");//criar um elemento option
    option.value = i;//atribuir o valor do índice do array contatos ao atributo value do elemento option para que o índice seja armazenado quando o usuário selecionar um contato
    option.innerHTML = `${contatos[i].nome} - ${contatos[i].fone}`;//atribuir o nome e o telefone do contato ao elemento option
    listaContatos.appendChild(option);//adicionar o elemento option ao elementoo  select
  }
}

const obter = () => {
  const listaContatos = document.getElementById("listaContatos");//obter a referência do elemento select  
  indiceEmEdicao = listaContatos.value;//obter o índice do contato selecionado
  const contato = contatos[indiceEmEdicao];//obter o contato selecionado
  const nome = document.getElementById("nome");//obter a referência do campo nome
  nome.value = contato.nome;//atribuir o valor do atributo nome do objeto contato ao campo nome
  const email = document.getElementById("email");//obter a referência do campo email
  email.value = contato.email;//atribuir o valor do atributo email do objeto contato ao campo email
  const fone = document.getElementById("fone");//obter a referência do campo fone
  fone.value = contato.fone;//atribuir o valor do atributo fone do objeto contato ao campo fone
  chavearExcluir()//ativar o botão excluir
};

const excluir = () => {
  contatos.splice(indiceEmEdicao);//remover o contato selecionado do array contatos
  chavearExcluir();//desativar o botão excluir
  listar();//atualizar a lista de contatos
  limpar();//limpar os campos do formulário
};

const limpar = () => {
  const nome = document.getElementById("nome");//obter a referência do campo nome
  const email = document.getElementById("email");//obter a referência do campo email
  const fone = document.getElementById("fone");//obter a referência do campo fone
  nome.value = "";//limpar o campo nome
  email.value = "";// limpar o campo email
  fone.value = "";//limpar o campo fone
}

const chavearExcluir = () => {
  const excluir = document.getElementById("excluir");//obter a referência do botão excluir
  if (excluir.disabled) {
    excluir.disabled = false;//ativar o botão excluir
  } else {
    excluir.disabled = true;//desativar o botão excluir
  }
}