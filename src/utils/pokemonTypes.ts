interface PokemonTypeColors {
  primary: string;
  accent: string;
}

export const pokemonTypeColors: Record<string, PokemonTypeColors> = {
  normal: {
    primary: 'rgb(234, 224, 207)',
    accent: 'rgb(255, 255, 255)',
  },
  fire: {
    primary: '#ee5430',
    accent: '#FFA07A',
  },
  water: {
    primary: '#6390F0',
    accent: '#A7C8E8',
  },
  grass: {
    primary: 'rgb(145, 193, 58)',
    accent: 'rgb(219, 206, 123)',
  },
  electric: {
    primary: '#F7D02C',
    accent: '#FAE76D',
  },
  ice: {
    primary: 'rgb(181, 205, 226)',
    accent: 'rgb(213, 229, 239)',
  },
  fighting: {
    primary: 'rgb(215, 155, 93)',
    accent: 'rgb(255, 202, 142)',
  },
  poison: {
    primary: 'rgb(93, 144, 120)',
    accent: 'rgb(111, 166, 141)',
  },
  ground: {
    primary: '#E2BF5B',
    accent: '#E3C6A8',
  },
  flying: {
    primary: '#A98FF3',
    accent: '#D0B8E2',
  },
  psychic: {
    primary: 'rgb(116, 56, 176)',
    accent: 'rgb(148, 102, 215)',
  },
  bug: {
    primary: 'rgb(213, 215, 92)',
    accent: 'rgb(224, 226, 120)',
  },
  rock: {
    primary: 'rgb(189, 206, 168)',
    accent: 'rgb(233, 244, 208)',
  },
  ghost: {
    primary: '#735797',
    accent: '#A79BCA',
  },
  dragon: {
    primary: 'rgb(76, 73, 58)',
    accent: 'rgb(103, 99, 62)',
  },
  dark: {
    primary: 'rgb(74, 74, 74)',
    accent: 'rgb(49, 49, 49)',
  },
  steel: {
    primary: 'rgb(94, 94, 74)',
    accent: 'rgb(244, 243, 239)',
  },
  fairy: {
    primary: 'rgb(248, 177, 251)',
    accent: '#F1A7DF',
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
