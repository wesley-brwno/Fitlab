const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// Configura o EJS como mecanismo de renderização
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/clientes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'clientes.html'));
});
/* array para armazenar todos os clientes */

const clientes = [];


app.post('/submit-matricula', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const plano = req.body.plano;

  /*
  Para recuperar os valores de um formulário enviado com o método POST, deve usar req.body. 
  No entanto, para que o req.body funcione corretamente, é preciso adicionar o middleware express.urlencoded ao código do servidor.
  */
  
  // Cria uma string com os dados a serem salvos no arquivo
  const dados = `
  --------------------------------------------
  Nome: ${nome}
  E-mail: ${email} 
  Telefone: ${telefone}
  Plano: ${plano}
  -------------------------------------------\n`
  ;

  // Caminho do arquivo onde os dados serão salvos
  const arquivo = path.join(__dirname, 'public', 'db', 'clientes.txt');
  
  // Salva os dados no arquivo txt
  fs.writeFile(arquivo, dados, { flag: 'a' }, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      return res.status(500).send('Erro ao salvar os dados');
    }

    console.log('Dados salvos com sucesso');
  });

  /* salva os dados do cliente no array */
  const novoCliente = {
    nome: nome,
    plano: plano,
    telefone: telefone,
    email: email,
    dataDeInscricao: pegaData()
  };
  
  clientes.push(novoCliente);

  console.log(clientes);

  criaPaginaComOsDados();

  res.redirect('/clientes.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


function pegaData() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();  
  const mes = dataAtual.getMonth() + 1; // Lembre-se de adicionar 1 ao mês, pois janeiro é 0
  const ano = dataAtual.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}


function geraPaginaParaExibirClientes() {
  // Gerar o conteúdo HTML da tabela
  let htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="css/normalize.css">
      <link rel="stylesheet" href="css/styles.css">
      <title>FitLab-Matricula</title>
  </head>
  <body>
      <header>
          <div class="menu">
              <img src="asserts/svg/logo-no-background.svg" alt="logo da fitlab">
              <nav>
                <ul>
                  <li><a href="index.html">Inicio</a></li>
                  <li><a href="index.html#planos">Planos</a></li>
                  <li><a href="#qm-somos">Sobre</a></li>
                </ul>
              </nav>
          </div>
      </header>
      
      <main class="main-clientes">
        <h1>Clientes da FitLab</h1>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Plano</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Data de Inscrição</th>
            </tr>
          </thead>
          <tbody>
  `;

  clientes.forEach(cliente => {
    htmlContent += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.plano}</td>
          <td>${cliente.telefone}</td>
          <td>${cliente.email}</td>
          <td>${cliente.dataDeInscricao}</td>
        </tr>
    `;
  });


  htmlContent += `
      </tbody>
      </table>
    </main>
  <footer>
  <img src="asserts/svg/logo-no-background.svg" alt="logo da fitlab">
  <hr>
  <div class="rodape">
      <section class="qm-somos" id="qm-somos">
          <h2>Quem Somos?</h2>
          <p>Lorem ipsum donolor sit amet consectetur adipisicing elit.
             Perspiciatis officiis magnam deleniti reprehenderit fuga deserunt ea,
             beatae quas dolorem incidunt quaerat exercitationem nulla, ipsam enim
             voluptatem accusamus unde repellat assumenda.
          </p>
      </section>

      <section class="fl-conosco">
          <h2>Fale conosco</h2>
          <ul>
              <li>(XX) XXXXX-XXXXX</li>
              <li>fitlab@emmail.com</li>
              <li class="newsletter">
                  <div class="newsletter">
                      <label for="newsletter-input">Assine nossa newsletter</label>
                      <input type="email" id="newsletter-input" name="newsletter" placeholder="Digite seu e-mail" required>
                      <button type="submit">Inscrever-se</button>
                  </div>   
              </li>
          </ul>
      </section>

      <section class="creators">
          <h2>Desenvovido por</h2>
          <ul>
              <li><a href="https://github.com/wesley-brwno">wesley-brwno</a></li>
              <li>dev1</li>
              <li>dev1</li>
          </ul>
      </section>
  </div>
</footer>
</body>
</html>`;

  return htmlContent;
}


function criaPaginaComOsDados() {
  // Caminho do arquivo onde os dados serão salvos
  const paginaClientes = path.join(__dirname, 'public', 'clientes.html');

  // Salvar o conteúdo HTML em um arquivo
  
  fs.writeFile(paginaClientes, geraPaginaParaExibirClientes(), err => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      return;
    }
    console.log('Arquivo HTML salvo com sucesso!');
  });
}