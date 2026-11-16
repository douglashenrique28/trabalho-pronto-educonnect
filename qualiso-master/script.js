// PROTÓTIPO DE TREINAMENTO: esta versão contém erros intencionais.
// Alunos: investiguem o comportamento antes de modificar o código.

const formulario = document.querySelector('#form-cadastro');
const lista = document.querySelector('#lista');
const busca = document.querySelector('#busca');
const total = document.querySelector('#total');
const aviso = document.querySelector('#aviso');
const vazio = document.querySelector('#vazio');

let interessados = [];
let proximoId = 1;

// Criar elementos HTML
function criarTexto(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  elemento.textContent = texto;

  return elemento;
}

// Desenhar a lista de interessados
function desenharLista() {
  lista.replaceChildren();

  const pesquisa = busca.value.trim().toLowerCase();

  const filtrados = interessados.filter(pessoa =>
    pessoa.nome.toLowerCase().includes(pesquisa)
  );

  filtrados.forEach(pessoa => {
    const item = criarTexto('li', 'registro', '');

    const informacoes = document.createElement('div');

    informacoes.append(
      criarTexto('strong', '', pessoa.nome || '(sem nome)'),
      criarTexto('small', '', pessoa.email),
      criarTexto('small', '', pessoa.curso || '(sem curso)')
    );

    // Botão de exclusão individual
    const botao = criarTexto('button', 'excluir', 'Excluir');

    botao.type = 'button';

    botao.addEventListener('click', () => {
      excluirInteressado(pessoa.id);
    });

    item.append(informacoes, botao);

    lista.appendChild(item);
  });

  // Atualizar quantidade de registros
  total.textContent = `${interessados.length} registros`;

  // Mostrar mensagem quando a lista estiver vazia
  vazio.hidden = filtrados.length > 0;
}

// Excluir somente o interessado selecionado
function excluirInteressado(id) {
  interessados = interessados.filter(pessoa => pessoa.id !== id);

  aviso.textContent = 'Registro excluído com sucesso!';

  desenharLista();
}

// Cadastrar interessado
formulario.addEventListener('submit', evento => {
  evento.preventDefault();

  const nome = document.querySelector('#nome').value.trim();
  const email = document.querySelector('#email').value.trim();
  const curso = document.querySelector('#curso').value;

  const interessado = {
    id: proximoId++,
    nome,
    email,
    curso
  };

  interessados.push(interessado);

  aviso.textContent = 'Interessado cadastrado com sucesso!';

  formulario.reset();

  desenharLista();
});

// Pesquisar interessados pelo nome
busca.addEventListener('input', desenharLista);

// Inicializar a lista
desenharLista();
