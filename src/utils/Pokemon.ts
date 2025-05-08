export type PokemonGeneration = {
  value: string;
  limit: string;
  label: string;
};

export type Pokemon = Readonly<{
  id: number;
  name: string;
  artwork: string;
}>;

export type PokemonResults = {
  count: number;
  next: string | null;
  previous: string | null;
  status: boolean;
  message: string;
  results: Pokemon[];
};

export type PokemonDataProps = {
  pokemons: PokemonResults;
};

export type CardProps = {
  name: string;
  index: number;
};

// Get random array of number based on total cards
const getRandomIndices = (data: Pokemon[], totalCard: number) => {
  const randomIndicesArray: number[] = [];

  for (let i = 0; i < totalCard / 2; i++) {
    const randomNum = Math.floor(Math.random() * data.length);
    if (!randomIndicesArray.includes(randomNum)) {
      randomIndicesArray.push(randomNum);
    } else {
      i--;
    }
  }

  return randomIndicesArray;
};

// Get pokemon data based on the index
const getDataSlice = async (data: Pokemon[], totalCard: number) => {
  const randomIndices = Pokemon.getRandomIndices(data, totalCard);
  const dataSlice = randomIndices.reduce((array: Pokemon[], index) => {
    array.push(data[index]);
    return array;
  }, []);

  return dataSlice;
};

const getPokemonArray = (data: Pokemon[]) => {
  const pairedPokemonArray = [...data, ...data];

  for (let i = pairedPokemonArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = pairedPokemonArray[i];
    pairedPokemonArray[i] = pairedPokemonArray[j];
    pairedPokemonArray[j] = temp;
  }

  return pairedPokemonArray;
};

export const Pokemon = {
  getRandomIndices,
  getDataSlice,
  getPokemonArray,
} as const;
