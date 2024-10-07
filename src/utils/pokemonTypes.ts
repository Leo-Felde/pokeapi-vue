interface PokemonTypeColors {
  primary: string;
  accent: string;
  list: string;
}

export const pokemonTypeColors: Record<string, PokemonTypeColors> = {
  normal: {
    primary: 'rgb(234, 224, 207)',
    accent: 'rgb(255, 255, 255)',
    list: 'rgb(151, 151, 151)'
  },
  fire: {
    primary: '#ee5430',
    accent: '#FFA07A',
    list: 'rgb(238, 84, 48)'
  },
  water: {
    primary: '#6390F0',
    accent: '#A7C8E8',
    list: '#6390F0'
  },
  grass: {
    primary: 'rgb(145, 193, 58)',
    accent: 'rgb(219, 206, 123)',
    list: 'rgb(86, 179, 34)'
  },
  electric: {
    primary: '#F7D02C',
    accent: '#FAE76D',
    list: 'rgb(225, 185, 16)'
  },
  ice: {
    primary: 'rgb(181, 205, 226)',
    accent: 'rgb(213, 229, 239)',
    list: 'rgb(71, 196, 202)'
  },
  fighting: {
    primary: 'rgb(215, 155, 93)',
    accent: 'rgb(255, 202, 142)',
    list: 'rgb(213, 98, 53)'
  },
  poison: {
    primary: 'rgb(93, 144, 120)',
    accent: 'rgb(111, 166, 141)',
    list: 'rgb(157, 49, 151)'
  },
  ground: {
    primary: '#E2BF5B',
    accent: '#E3C6A8',
    list: 'rgb(210, 103, 25)'
  },
  flying: {
    primary: '#A98FF3',
    accent: '#D0B8E2',
    list: 'rgb(114, 131, 223)'
  },
  psychic: {
    primary: 'rgb(116, 56, 176)',
    accent: 'rgb(148, 102, 215)',
    list: 'rgb(191, 56, 82)'
  },
  bug: {
    primary: 'rgb(213, 215, 92)',
    accent: 'rgb(224, 226, 120)',
    list: 'rgb(144, 200, 76)'
  },
  rock: {
    primary: 'rgb(189, 206, 168)',
    accent: 'rgb(233, 244, 208)',
    list: 'rgb(137, 147, 110)'
  },
  ghost: {
    primary: '#735797',
    accent: '#A79BCA',
    list: 'rgb(60, 73, 147)'
  },
  dragon: {
    primary: 'rgb(76, 73, 58)',
    accent: 'rgb(103, 99, 62)',
    list: 'rgb(70, 107, 251)'
  },
  dark: {
    primary: 'rgb(74, 74, 74)',
    accent: 'rgb(49, 49, 49)',
    list: 'rgb(47, 47, 47)'
  },
  steel: {
    primary: 'rgb(94, 94, 74)',
    accent: 'rgb(244, 243, 239)',
    list: 'rgb(66, 94, 123)'
  },
  fairy: {
    primary: 'rgb(248, 177, 251)',
    accent: '#F1A7DF',
    list: 'rgb(202, 102, 206)'
  },
};

// Add a new constant for weaknesses
export const pokemonTypeWeaknesses: Record<string, string[]> = {
  normal: ['fighting'],
  fire: ['water', 'rock', 'ground'],
  water: ['electric', 'grass'],
  grass: ['fire', 'ice'],
  electric: ['ground'],
  ice: ['fire', 'fighting', 'rock'],
  fighting: ['flying', 'psychic', 'fairy'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'ice', 'grass'],
  flying: ['electric', 'ice', 'rock'],
  psychic: ['bug', 'ghost', 'dark'],
  bug: ['fire', 'flying', 'rock'],
  rock: ['water', 'grass', 'fighting'],
  ghost: ['ghost', 'dark'],
  dragon: ['ice', 'fairy'],
  dark: ['fighting', 'bug', 'fairy'],
  steel: ['fire', 'fighting', 'ground'],
  fairy: ['poison', 'steel']
};
