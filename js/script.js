
const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__number')
const pokemonImg = document.querySelector('.pokemon__img')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

const pokemonHeight = document.querySelector('.height__points')
const pokemonWeight = document.querySelector('.weight__points')
const pokemonStatsHp = document.querySelector('.hp')
const pokemonStatsAtk = document.querySelector('.atk')
const pokemonStatsDef = document.querySelector('.def')
const pokemonStatsSpecialAtk = document.querySelector('.specialAtk')
const pokemonStatsSpecialDef = document.querySelector('.specialDef')
const pokemonStatsSpd = document.querySelector('.spd')
const pokemonAbilities1 = document.querySelector('.abilityeOne')
const pokemonAbilities2 = document.querySelector('.abilityTwo')
const pokemonTypes1 = document.querySelector('.typeOne')
const pokemonTypes2 = document.querySelector('.typeTwo');

const sleep = ms => new Promise(r => setTimeout(r, ms));

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  await sleep(350)

  try{
    const data = await APIResponse.json();
    return data;
  }catch(err){
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...'
  pokemonId.innerHTML = ' '

  const pokemonInfo = document.querySelector('.pokemon__info');
  pokemonInfo.style = 'opacity: 0';

  const data = await fetchPokemon(pokemon);

  const [typeOne, typeTwo] = data.types;
  const [abilityOne, abilityTwo] = data.abilities

  if(data){
    pokemonImg.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = 'No.' + data.id
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    pokemonHeight.innerHTML = data.height + 'ft'
    pokemonWeight.innerHTML = data.weight + 'lb'
    pokemonStatsHp.innerHTML = 'HP: ' + data['stats']['0']['base_stat'] 
    pokemonStatsAtk.innerHTML = 'ATK: ' + data['stats']['1']['base_stat']
    pokemonStatsDef.innerHTML = 'DEF: ' + data['stats']['2']['base_stat']
    pokemonStatsSpecialAtk.innerHTML = 'SpecialATK: ' + data['stats']['3']['base_stat']
    pokemonStatsSpecialDef.innerHTML = 'SpecialDef: ' + data['stats']['4']['base_stat']
    pokemonStatsSpd.innerHTML = 'SPD: ' + data['stats']['5']['base_stat']
    pokemonAbilities1.innerHTML = abilityOne.ability.name.toUpperCase()
    pokemonAbilities2.innerHTML = abilityTwo ? abilityTwo.ability.name.toUpperCase(): '';
    pokemonTypes1.innerHTML = typeOne.type.name.toUpperCase();

    const [secondColor, firstColor] = colors[typeOne.type.name].backgroundColor;
    const fontColor = colors[typeOne.type.name].fontColor

    pokemonTypes1.style = `background-image: linear-gradient(to bottom, ${firstColor} 50%, ${secondColor} 50%); color: ${fontColor}`;

    if (typeTwo) {
      const [secondColor, firstColor] = colors[typeTwo.type.name].backgroundColor;
      const fontColor = colors[typeTwo.type.name].fontColor
      pokemonTypes2.style = `display: block; background-image: linear-gradient(to bottom, ${firstColor} 50%, ${secondColor} 50%); color: ${fontColor}`;
      pokemonTypes2.innerHTML = typeTwo.type.name.toUpperCase();
    } else {
      pokemonTypes2.style = 'display: none;';
    }

    input.value = '';

    searchPokemon = data.id
    
    pokemonInfo.style = 'opacity: 1';
  } else {
    pokemonImg.style.display = 'none'
    pokemonName.innerHTML = 'Not found'
    pokemonId.innerHTML = ''
  
    
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', (event) => {
  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', (event) => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)

})

renderPokemon(searchPokemon)


