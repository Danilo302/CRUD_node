const mysql = require('mysql2/promise'); // Use 'mysql2/promise' para lidar com Promises.

require('dotenv').config()

// Configurações de conexão com o banco de dados
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
};
console.log(dbConfig.host)

// Função para conectar ao banco de dados
async function connect() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexão realizada com sucesso!');
        return connection;
    } catch (error) {
        throw new Error('Erro ao conectar ao banco de dados: ' + error.message);
    }
}

// Função de consulta de BD
async function read() {
    const connection = await connect();
    try {
        const [rows] = await connection.execute('SELECT nome_produto, quantidade, preco FROM estoque');
        console.log('Resultado:', rows);
    } catch (error) {
        console.error('Erro: Consulta não realizada com sucesso:', error.message);
    } finally {
        connection.end();
    }
}

// Função de inclusão
async function create(nome, qtd, preco) {
    const connection = await connect();
    try {
        const [result] = await connection.execute('INSERT INTO estoque (nome_produto, quantidade, preco) VALUES (?, ?, ?)', [nome, qtd, preco]);
        console.log('Incluído com sucesso! ID do novo registro:', result.insertId);
    } catch (error) {
        console.error('Erro ao incluir:', error.message);
    } finally {
        connection.end();
    }
}

// Função de atualização
async function update(parametro, nome, qtd, preco) {
    const connection = await connect();
    try {
        const [result] = await connection.execute('UPDATE estoque SET nome_produto = ?, quantidade = ?, preco = ? WHERE nome_produto = ?', [nome, qtd, preco, parametro]);
        if (result.affectedRows > 0) {
            console.log('Registro alterado com sucesso!');
        } else {
            console.error('Registro não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao atualizar:', error.message);
    } finally {
        connection.end();
    }
}

// Função de exclusão
async function deletar(parametro) {
    const connection = await connect();
    try {
        const [result] = await connection.execute('DELETE FROM estoque WHERE nome_produto = ?', [parametro]);
        if (result.affectedRows > 0) {
            console.log('Registro excluído com sucesso!');
        } else {
            console.error('Registro não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao excluir:', error.message);
    } finally {
        connection.end();
    }
}

// Exemplo de uso:
read(); // Chame as funções apropriadas conforme necessário

