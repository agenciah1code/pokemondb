// Busca do Pokemon
const btnBusca = document.querySelector('#buscapokemon');
const btnLimpar = document.querySelector('#limparcampos');
const inputBusca = document.querySelector('#nomepokemon');
const displayInfo = document.querySelector('.informacoes');
const erroPoke = document.querySelector('.erropoke');

// Informações do Pokemon
const imagemPoke = document.querySelector('#imagempoke');
const nomePoke = document.querySelector('#nomepoke');
const idPoke = document.querySelector('#idpoke');
const habilidadePoke = document.querySelector('#habilidadepoke');
const expBasePoke = document.querySelector('#expbasepoke');
const alturaPoke = document.querySelector('#alturapoke');
const pesoPoke = document.querySelector('#pesopoke');
const movimentosPoke = document.querySelector('#movimentospoke');
const tiposPoke = document.querySelector('#tipospoke');

btnLimpar.addEventListener('click', limparCampos);
btnBusca.addEventListener('click', handleClick);

function limparCampos(event) {
	event.preventDefault();
	inputBusca.value = '';
	displayInfo.classList.remove('ativo');
	displayInfo.classList.add('hide');
	erroPoke.classList.add('hide');
}

function handleClick(event) {
	event.preventDefault();
	const nomePokemon = inputBusca.value;
	// Acionamento da API
	if (inputBusca.value) {
		pokemonAPI(nomePokemon);
	}
}

async function pokemonAPI(nome) {
	await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
		.then((response) => response.json())
		.then((data) => {
			// Mostrar campos
			if (inputBusca.value.length > 0) {
				displayInfo.classList.remove('hide');
				displayInfo.classList.add('ativo');
				erroPoke.classList.add('hide');
			}

			imagemPoke.setAttribute('src', data.sprites.other.home.front_default);
			idPoke.innerText = data.id;
			nomePoke.innerText = data.name;
			const habilidades = data.abilities;
			habilidadePoke.innerText = '';
			habilidades.forEach((item) => {
				habilidadePoke.innerText += ` ${item.ability.name}`;
			});
			expBasePoke.innerText = data.base_experience;
			alturaPoke.innerText = data.height / 10 + 'm';
			pesoPoke.innerText = data.weight / 10 + 'kg';
			const movimentos = data.moves;
			movimentosPoke.innerText = '';
			movimentos.forEach((item) => {
				movimentosPoke.innerText += ` ${item.move.name} `;
			});
			const tipos = data.types;
			tiposPoke.innerText = '';
			tipos.forEach((item) => {
				tiposPoke.innerText += ` ${item.type.name} `;
			});
		})
		.catch((error) => {
			displayInfo.classList.remove('ativo');
			displayInfo.classList.add('hide');
			erroPoke.classList.remove('hide');
		});
}
