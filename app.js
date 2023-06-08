const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});


app.post('/submit-matricula', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

  /*
  Para recuperar os valores de um formulário enviado com o método POST, deve usar req.body. 
  No entanto, para que o req.body funcione corretamente, é preciso adicionar o middleware express.urlencoded ao código do servidor.
  */
  
    // Crie uma string com os dados a serem salvos no arquivo
    const dados = `Nome: ${nome}, E-mail: ${email}, Telefone: ${telefone}\n`;

    // Caminho do arquivo onde os dados serão salvos
    const arquivo = path.join(__dirname, 'public', 'db', 'clientes.txt');
  
    // Salva os dados no arquivo
    fs.writeFile(arquivo, dados, { flag: 'a' }, (err) => {
      if (err) {
        console.error('Erro ao salvar os dados:', err);
        return res.status(500).send('Erro ao salvar os dados');
      }
  
      console.log('Dados salvos com sucesso');
      res.send('Formulário de matrícula recebido e dados salvos com sucesso');
    });
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});