# pokeapi-vue
<p>O objetivo desse projeto é implementar a PokeApi V2 com Vue.js com um design distinto e original, utilizando os dados disponibilizados para exibir cartas do Pokémon Trading Card Game (TCG).</p>
![exemplo de carta TCG](https://github.com/Leo-Felde/pokeapi-vue/raw/main/public/exemplo.png)

<p>
</p>

<sub>Inspirado em https://poke-holo.simey.me/</sub>
</p>

## Tecnologias utilizadas
<ul>
  <li>
    <a href="https://v2.vuetifyjs.com/en/">Vuetify</a>
  </li>
  <li>
    <a href="https://vuejs.org/guide/introduction.html">VueJs</a>
  </li>
  <li>
    <a href="https://axios-http.com/ptbr/docs/intro">Axios</a>
  </li>
  <li>
    <a href="https://pinia.vuejs.org/">Pinia</a>
  </li>
</ul>

## Detalhes de uso
- **Tipos de Pokémon:**
  - Pokémons podem ter no máximo 2 tipos.
  - Os tipos são exibidos com seus respectivos ícones no canto superior direito da tela.
  - Para alterar a visualização dos tipos, basta clicar nos ícones.

- **Filtragem:**
  - Para filtrar pelos tipos de Pokémon, clique no ícone ao lado esquerdo do input (com o tooltip "filtrar por tipo").
  - Para listar todos os tipos, clique no tipo selecionado na lista para desmarcá-lo.

- **Responsividade:**
  - Ao redimensionar a tela, é necessário selecionar novamente o pokemon.
  - Esta ação é necessária para evitar bugs visuais e garantir que a responsividade funcione adequadamente ao alternar entre desktop e mobile.

## Ressalvas

- A API não possui um endpoint de busca; portanto, digitar no campo de busca da lista apenas filtra os resultados.
- A API não contém todos os dados para criar a carta; assim, alguns dados são fixos:
  - Por exemplo, toda habilidade tem poder 10.
  - As fraquezas são listadas a partir de uma constante.


## Api
https://pokeapi.co/docs/v2

## Instalação

Primeiro certifique-se de ter instalado a [ultima versão do Node.js](https://nodejs.org/en/download).\
Depois, instale as dependencias rodando o seguinte comando em um terminal dentro da raiz do projeto:

```
  npm install
```

## Desenvolvimento
#### Iniciar o servidor de desenvolvimento
Para rodar o projeto, basta rodar o seguinte comando em um terminal dentro da raiz do projeto e abrir o navegador no endereço retornado (padrão localhost:5174)
```bash
  npm run serve
```

#### Build de produção | gerar pasta /dist

```bash
  npm run serve
```

