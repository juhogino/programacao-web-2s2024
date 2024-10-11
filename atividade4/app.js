const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para analisar o JSON no corpo da requisição
app.use(express.json());

// Estrutura de dados para armazenar os produtos
let estoque = {};

// Rota para adicionar um novo produto
app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    estoque[id] = { nome, quantidade: parseInt(qtd) };
    res.send(`Produto ${nome} adicionado com sucesso!`);
});

// Rota para listar todos os produtos
app.get('/listar', (req, res) => {
    res.json(estoque);
});

// Rota para remover um produto
app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    if (estoque[id]) {
        delete estoque[id];
        res.send(`Produto com ID ${id} removido com sucesso!`);
    } else {
        res.status(404).send('Produto não encontrado.');
    }
});

// Rota para editar a quantidade de um produto
app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    if (estoque[id]) {
        estoque[id].quantidade = parseInt(qtd);
        res.send(`Quantidade do produto ${estoque[id].nome} atualizada para ${qtd}.`);
    } else {
        res.status(404).send('Produto não encontrado.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
