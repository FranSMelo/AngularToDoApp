const fs = require('fs');
const path = require('path');

// Dados para o seed
const seedData = {
  todos: [
    {
      id: "1a2b",
      title: "Completar projeto Angular",
      completed: false
    },
    {
      id: "3c4d",
      title: "Aprender TypeScript",
      completed: true
    },
    {
      id: "5e6f",
      title: "Configurar ambiente de desenvolvimento",
      completed: false
    },
    {
      id: "7g8h",
      title: "Revisar documentação do Angular",
      completed: false
    }
  ]
};

// Função para limpar e repopular a base de dados
const seed = () => {
  const databasePath = path.join(__dirname, 'database.json');
  
  try {
    fs.writeFileSync(databasePath, JSON.stringify(seedData, null, 2));
    console.log('✅ Base de dados resetada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao resetar a base de dados:', error);
  }
};

// Função para limpar completamente o banco de dados
const clear = () => {
  const databasePath = path.join(__dirname, 'database.json');
  const emptyDatabase = { todos: [] };
  
  try {
    fs.writeFileSync(databasePath, JSON.stringify(emptyDatabase, null, 2));
    console.log('✅ Base de dados limpa com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao limpar a base de dados:', error);
  }
};

// Verificar qual operação executar
const operation = process.argv[2];

switch (operation) {
  case 'seed':
    seed();
    break;
  case 'clear':
    clear();
    break;
  default:
    console.log('Por favor, especifique uma operação: "seed" ou "clear"');
    console.log('Exemplo: node seed.js seed');
}
