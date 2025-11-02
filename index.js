import express from 'express';
const app = express();
const port = 3000;
const host = 'localhost';

let listaDeUsuarios = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Inicial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/">Meu Sistema</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/CadastroDePessoas">Cadastro</a></li>
            <li class="nav-item"><a class="nav-link" href="/listaDeUsuarios">Usuários</a></li>
            <li class="nav-item"><a class="nav-link" href="/Logout">Sair</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5 text-center">
      <h1 class="mb-4">Bem-vindo ao Sistema</h1>
      <a href="/CadastroDePessoas" class="btn btn-success btn-lg">Cadastrar Pessoa</a>
      <a href="/listaDeUsuarios" class="btn btn-outline-primary btn-lg ms-3">Ver Usuários</a>
    </div>
  </body>
  </html>
  `);
});

app.get('/Logout', (req, res) => {
  res.send(`
    <div style="font-family:sans-serif; text-align:center; margin-top:100px;">
      <h2>Logout realizado com sucesso!</h2>
      <a href="/" style="text-decoration:none; color:white;">
        <button style="margin-top:20px; padding:10px 20px; background:#0d6efd; border:none; border-radius:5px; color:white;">Voltar</button>
      </a>
    </div>
  `);
});

app.get('/CadastroDePessoas', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro de Pessoas</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f8f9fa;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .form-container {
      background-color: #fff;
      padding: 40px 60px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      max-width: 800px;
      width: 100%;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>Cadastro de Pessoas</h1>
    <form method="POST" action="/adicionarUsuario" class="row g-3 needs-validation" id="formCadastro" novalidate>
      
      <div class="col-md-6">
        <label for="nome" class="form-label">Nome</label>
        <input type="text" class="form-control" id="nome" name="nome" required>
        <div class="invalid-feedback">Informe seu nome.</div>
      </div>

      <div class="col-md-6">
        <label for="sobrenome" class="form-label">Sobrenome</label>
        <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
        <div class="invalid-feedback">Informe seu sobrenome.</div>
      </div>

      <div class="col-md-6">
        <label for="cidade" class="form-label">Cidade</label>
        <input type="text" class="form-control" id="cidade" name="cidade" required>
        <div class="invalid-feedback">Informe uma cidade válida.</div>
      </div>

      <div class="col-md-3">
        <label for="estado" class="form-label">Estado</label>
        <select class="form-select" id="estado" name="estado" required>
          <option selected disabled value="">Escolha...</option>
          <option value="AC">Acre</option><option value="AL">Alagoas</option><option value="AP">Amapá</option>
          <option value="AM">Amazonas</option><option value="BA">Bahia</option><option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option><option value="ES">Espírito Santo</option><option value="GO">Goiás</option>
          <option value="MA">Maranhão</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option><option value="PA">Pará</option><option value="PB">Paraíba</option>
          <option value="PR">Paraná</option><option value="PE">Pernambuco</option><option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option><option value="RN">Rio Grande do Norte</option><option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option><option value="RR">Roraima</option><option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option><option value="SE">Sergipe</option><option value="TO">Tocantins</option>
        </select>
        <div class="invalid-feedback">Selecione um estado.</div>
      </div>

      <div class="col-md-3">
        <label for="cep" class="form-label">CEP</label>
        <input type="text" class="form-control" id="cep" name="cep" pattern="\\d{5}-?\\d{3}" required>
        <div class="invalid-feedback">Informe um CEP válido (ex: 12345-678).</div>
      </div>

      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="concordo" required>
          <label class="form-check-label" for="concordo">Concordo com os termos e condições</label>
          <div class="invalid-feedback">Você deve concordar antes de enviar.</div>
        </div>
      </div>

      <div class="col-12 text-center">
        <button class="btn btn-primary px-5" type="submit">Enviar</button>
        <a href="/" class="btn btn-secondary px-5 ms-3">Voltar</a>
      </div>
    </form>
  </div>

  <script>
    (function () {
      'use strict'
      const form = document.getElementById('formCadastro')
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          alert('Formulário enviado com sucesso!')
        }
        form.classList.add('was-validated')
      }, false)
    })()
  </script>
</body>
</html>
`);
});

app.post('/adicionarUsuario', (req, res) => {
  const { nome, sobrenome, cidade, estado, cep } = req.body;
  listaDeUsuarios.push({ nome, sobrenome, cidade, estado, cep });
  res.redirect('/listaDeUsuarios');
});

app.get('/listaDeUsuarios', (req, res) => {
  let listaHTML = `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Lista de Usuários</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body class="bg-light">
    <div class="container mt-5">
      <h1 class="text-center mb-4">Usuários Cadastrados</h1>
      <table class="table table-striped table-bordered text-center align-middle">
        <thead class="table-primary">
          <tr>
            <th>#</th><th>Nome</th><th>Sobrenome</th><th>Cidade</th><th>Estado</th><th>CEP</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>`;
  
  listaDeUsuarios.forEach((u, i) => {
    listaHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${u.nome}</td>
        <td>${u.sobrenome}</td>
        <td>${u.cidade}</td>
        <td>${u.estado}</td>
        <td>${u.cep}</td>
        <td>
          <form method="POST" action="/excluirUsuario/${i}" style="display:inline;">
            <button type="submit" class="btn btn-danger btn-sm">Excluir</button>
          </form>
        </td>
      </tr>`;
  });

  listaHTML += `
        </tbody>
      </table>
      <div class="text-center mt-4">
        <a href="/CadastroDePessoas" class="btn btn-success">Novo Cadastro</a>
        <a href="/" class="btn btn-secondary ms-2">Voltar</a>
      </div>
    </div>
  </body>
  </html>`;
  res.send(listaHTML);
});

app.post('/excluirUsuario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id) && id >= 0 && id < listaDeUsuarios.length) {
    listaDeUsuarios.splice(id, 1);
  }
  res.redirect('/listaDeUsuarios');
});
// Fim do arquivo index.js