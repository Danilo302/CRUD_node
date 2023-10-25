# Documentação do Código Node.js com MySQL

Este repositório contém um código Node.js que se conecta a um banco de dados MySQL e realiza operações CRUD (Create, Read, Update, Delete) em uma tabela chamada "estoque". O código utiliza a biblioteca `mysql2/promise` para lidar com Promises e o pacote `dotenv` para configurar as variáveis de ambiente de conexão com o banco de dados.

## Configuração

Antes de executar o código, é necessário configurar as variáveis de ambiente no arquivo `.env`. Certifique-se de que o arquivo `.env` contenha as seguintes variáveis:

- `MYSQL_HOST`: O host do banco de dados MySQL.
- `MYSQL_USER`: O nome de usuário do banco de dados MySQL.
- `MYSQL_PASSWORD`: A senha do usuário do banco de dados MySQL.
- `MYSQL_DB`: O nome do banco de dados MySQL.




## Funções

### Função de Conexão `connect()`

Esta função cria uma conexão com o banco de dados MySQL usando as configurações definidas no arquivo `.env`. Retorna uma conexão ativa que pode ser usada para executar consultas.

```javascript
async function connect() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão realizada com sucesso!');
    return connection;
  } catch (error) {
    throw new Error('Erro ao conectar ao banco de dados: ' + error.message);
  }
}
```




### Função de Leitura `read()`

Esta função realiza uma consulta SELECT na tabela "estoque" e imprime os resultados no console.



```javascript
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
```
### Função de Inclusão `create(nome, qtd, preco)`

Esta função insere um novo registro na tabela "estoque" com os valores fornecidos e imprime o ID do novo registro inserido.

```javascript
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
```

### Função de Atualização update(parametro, nome, qtd, preco)

Esta função atualiza um registro na tabela "estoque" com base no nome do produto fornecido. Ela verifica se o registro foi encontrado e imprime uma mensagem apropriada.

```javascript
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
```

### Função de Exclusão deletar(parametro)

Esta função exclui um registro na tabela "estoque" com base no nome do produto fornecido. Ela verifica se o registro foi encontrado e imprime uma mensagem apropriada.

```javascript
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
```

### Considerações Finais
Este código é um exemplo simples de como interagir com um banco de dados MySQL usando Node.js e a biblioteca mysql2/promise. Certifique-se de ajustar as funções e a lógica conforme necessário para atender aos requisitos específicos do seu projeto.

Para obter mais informações sobre a biblioteca mysql2/promise, consulte a documentação oficial: mysql2/promise Documentation.




