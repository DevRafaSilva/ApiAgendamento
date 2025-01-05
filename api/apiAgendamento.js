// Importa os módulos necessários
const express = require('express');
const cors = require('cors');

// Inicializa o app e configura middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para lidar com JSON e CORS
app.use(express.json());
app.use(cors());

// Banco de dados temporário (em memória)
let registros = [];

// Rota para criar um novo registro (POST)
app.post('/registros', (req, res) => {
  const { nome, data, horario } = req.body;

  if (!nome || !data || !horario) {
    return res
      .status(400)
      .json({ error: 'Por favor, forneça nome, data e horário.' });
  }

  const novoRegistro = {
    id: registros.length + 1, // Gera um ID simples
    nome,
    data,
    horario,
  };

  registros.push(novoRegistro);
  res.status(201).json(novoRegistro);
});

// Rota para obter todos os registros (GET)
app.get('/registros', (req, res) => {
  res.json(registros);
});

// Rota para deletar um registro pelo ID (DELETE)
app.delete('/registros/:id', (req, res) => {
  const { id } = req.params;
  const registroIndex = registros.findIndex((r) => r.id === parseInt(id));

  if (registroIndex === -1) {
    return res.status(404).json({ error: 'Registro não encontrado.' });
  }

  registros.splice(registroIndex, 1);
  res.status(204).send(); // Retorna sucesso sem conteúdo
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
