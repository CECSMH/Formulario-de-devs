# Formulario-de-devs

Catalogo de devs, feito em fullMVC, neste catalogo você pode cadastrar, atualizar e excluir seu perfil, e também pode ver outros devs cadastrados, esse projeto foi feito inspirado no video FORMULÁRIOS COM HTML e CSS!
da  Rafaella Ballerini.

<br>

## Tecnologias

<ul>
<li>NodeJS</li>
<li>BcryptJS</li>
<li>Express</li>
<li>Express-session</li>
<li>Connect-mongo</li>
<li>MongoDB</li>
<li>Mongoose</li>
<li>Path</li>
<li>Dotenv</li>
<li>Sucrase</li>
<li>Validator</li>
<li>Ejs</li>
<li>Webpack</li>
<li>Babel</li>

</ul>

<br>

## Como usar
<p>Primeiro, faça o download do projeto e extrai-o em alguma pasta, na mesma pasta abra o prompt/terminal, e execute o comando <br><code>npm install</code> ou <code>yarn install</code></p>
<p>Depois da conclusão do processo, crie um arquivo com o nome <code>.env</code> com as seguintes linhas <br>

```
strConection=<sua string de conexão com o mongo>
sessionSecret=<algum secret aleatorio de sua preferencia>
```
</p>
<p>logo após, rode o comando <code>npm start</code> ou <code>yarn start</code>, a aplicação estará rodando em <code>http://localhost:3030/</code>.</p>
<p>Caso queira editar o codigo do front-end rode o comando <code>npm run web</code> ou <code>yarn run web</code>.</p>
<br>

## Endpoints
<ul>

<li>Verbo get <code>baseUrl/</code>, Direciona para pagina inicial.</li>
<br>
<li>Verbo get <code>baseUrl/fetchAll</code>, Busca todos os registos e paginação, com ou sem base em filtros, exemplos: <br>
 
 ```
 baseUrl/fetchAll?limit=10&offSet=6
 baseUrl/fetchAll?limit=10&offSet=6&fn=carlos&ds=Back-end
 baseUrl/fetchAll?limit=10&offSet=6&fn=carlos&ds=Back-end+Front-end&st=HTML+CSS+Java
 baseUrl/fetchAll?limit=10&offSet=6&fn=carlos&ds=Back-end+Front-end&st=HTML+CSS+Java/html
 ```
 filtros: 
 <ul>
 <li><code>fn</code>, pesquisa por nome, recebe desde uma letra, até um nome completo.</li>
 <li><code>st</code>, pesquisa por stacks, pode receber os valores: <code>HTML, CSS, JavaScript, PHP, Java, C, Python</code>. Podem ser enviados um ou mais, com o separador <code>+</code> entre eles.</li>
 <li><code>ds</code>, pesquisa por lado de atuação, pode receber os valores: <code>Front-end, Back-end, Full-stack</code>. Podem ser enviados um ou mais, com o separador <code>+</code> entre eles.</li>
 <li><code>sr</code>, pesquisa por senioridade, pode receber os valores: <code>Junior, Pleno, Senior</code>. Podem ser enviados um ou mais, com o separador <code>+</code> entre eles.</li>
 <li><code>limit</code>, determina um limite para a quantidade de resultados, recebe apenas um valor inteiro. </li>
 <li><code>offSet</code>, determina o ponto de partida dos resultados, recebe apenas um valor interio.</li>
 </ul>
 
 Os filtros podem ser usados desde um até todos eles com todos os valores juntos. 
 O retorno será em JSON, ou em HTML caso o parâmetro <code>/html</code> seja passado ao final, resultando em cards na home.
</li>
<br> 
<li>Verbo get <code>baseUrl/fetchOne/:id/:type?</code>, Busca apenas um resgistro JSON com base no id, exemplo: <br> 
<code>baseUrl/fetchOne/6166bf4145cba414db02c538</code> se for passado o parâmetro <code>/html</code>, retonará um html montado que resultará em um modal na pagina incial, exemplo: <code>baseUrl/fetchOne/6166bf4145cba414db02c538/html</code>.

</li>
<br> 
<li>Verbo get <code>baseUrl/cadastrar</code>, Direciona para pagina de cadastro.</li>
<br> 
<li>Verbo post <code>baseUrl/cadastrar</code>, Realiza o cadastro de devs, deve receber informações atraves do body da requisição, exemplo:<br>

```
{
  "devSide": "Back-end",
  "fullName": "carlos",
  "email": "carlos@email.com",
  "seniority": "Junior",
  "experience": "alguma experiencia",
  "password": "40028922",
  "stacks": ["HTML", "CSS"]
}
```
Todas as informações são obrigatorias, e caso omitidas ou invalidas, resultará em Bad request(400).<br>
Se cadastrado com sucesso, será redirecionado para home, já logado.
</li>
<br> 
<li>Verbo get <code>baseUrl/login</code>, Retorna um html com formulario de login, que resulta em um modal na home.</li>
<br>
<li>Verbo post <code>baseUrl/login</code>, Realiza o login de usuário, deve receber informações atraves do body da requisição, exemplo:<br>

```
{
	"email": "carlos@email.com",
	"password": "40028922"
}
```
Ambos os campos são obrigatorios e caso omitidos ou invalidos podem retornar Bad resquest(400) ou Unauthorized(401).<br>
Se realizado o login com sucesso, será redirecionado(reload da pagina) para pagina inicial já logado.
</li>
<br>

<li>Verbo get <code>baseUrl/logout</code>, Destroi a sessão atual (desloga o usuário).</li>
<br>

<li>Verbo get <code>baseUrl/edit/:id</code>, Direciona para a pagina de atualização de cadastro, deve receber o id do usuário como parâmetro, exemplo:<br>
<code>baseUrl/edit/6166bf4145cba414db02c538</code>, o usuário deve estár logado para realizar esta ação.
</li>
<br>
<li>Verbo post <code>baseUrl/edit/:id</code>, Realiza a atualização do registro do usuário, deve receber o id do usuário como parâmetro, exemplo:<br>
<code>baseUrl/edit/6166bf4145cba414db02c538</code> e também deve receber informações atraves do body da requisição, exemplo:<br>

```
{
  "devSide": "Front-end",
  "stacks": ["Java", "C"]
}
```
Um ou mais campos podem ser alterados, inclusive senha e e-mail, contudo, campos invalidos(email ou senha fora dos principios estabelecidos) resultarão em Bad request(400)
e campos vazios serão ignorados.<br>
O usuário deve estár logado para realizar esta ação, se atualizado com sucesso, será redirecionado para home.
</li>
<br>
<li>Verbo get <code>baseUrl/del/:id</code>, Exclui a conta do usuário, deve receber o id do usuário como parâmetro, exemplo:<br>
<code>baseUrl/del/6166bf4145cba414db02c538</code>, o usuário deve estár logado para realizar esta ação.</li>
<br>
</ul>
