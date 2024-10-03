// que objetozão hein se ta doido

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonCry {
  cry: string;
  version: string;
}

export interface PokemonForm {
  name: string;
  url: string;
}

export interface PokemonGameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    version_group: {
      name: string;
      url: string;
    };
    move_learn_method: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonSprite {
  front_default: string;
  front_shiny: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default: string;
  back_shiny: string;
  back_female?: string;
  back_shiny_female?: string;
  other: object
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonData {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: Record<string, PokemonCry>;
  forms: PokemonForm[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_abilities: unknown[];
  past_types: unknown[];
  species: PokemonSpecies;
  sprites: PokemonSprite;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}
