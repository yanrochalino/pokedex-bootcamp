const campoBusca = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const areaResultado = document.getElementById("resultado");

async function buscarPokemon(termo) {
  areaResultado.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();
    mostrarPokemon(dados);

  } catch (erro) {
    areaResultado.innerHTML = `
      <p class="erro">Ops! Não encontramos esse Pokémon.</p>
      <p>Verifique o nome/número e tente novamente.</p>
    `;
  }
}

function mostrarPokemon(dados) {
  const tiposHtml = dados.types
    .map(t => `<span class="tipo">${t.type.name}</span>`)
    .join("");

  areaResultado.innerHTML = `
    <h2>#${dados.id} - ${dados.name}</h2>
    <img src="${dados.sprites.front_default}" alt="${dados.name}">
    <p>Altura: ${dados.height / 10} m &nbsp;|&nbsp; Peso: ${dados.weight / 10} kg</p>
    <div class="tipos">${tiposHtml}</div>
  `;
}

botaoBuscar.addEventListener("click", () => {
  const termo = campoBusca.value.toLowerCase().trim();
  if (termo) {
    buscarPokemon(termo);
  }
});

campoBusca.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    botaoBuscar.click();
  }
});
