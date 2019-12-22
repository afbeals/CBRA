// Extenal
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Local
import withPokeList from '~Modules/pokelist/withPokeList';
import { ErrorBoundary } from '~Components';
import Image from './details/Image';
import Title from './details/Title';
import BaseStats from './details/BaseStats';
import StatsDisplay from './details/StatsDisplay';
import Abilities from './details/Abilities';

// Constants
const classname = 'details';

// Component
const Details = ({
  pClassname,
  fetchPokemon,
  fetchPokemonCancel,
  getIsFetchingPokemon: isFetching,
  getSelectedPokemon: pokemon,
}) => {
  const sprites = pokemon?.sprites ?? null;
  const name = pokemon?.name ?? null;
  const height = pokemon?.height ?? null;
  const weight = pokemon?.weight ?? null;
  const types = pokemon?.types ?? [];
  const pokemonId = pokemon?.id ?? null;
  const stats = pokemon?.stats ?? [];
  const moves = pokemon?.moves ?? [];
  const abilities = pokemon?.abilities ?? [];

  useEffect(() => {
    if (pokemon && !pokemon.height) {
      fetchPokemon();
    }
  }, [pokemon, fetchPokemon]);

  useEffect(
    () => () => {
      if (isFetching) {
        fetchPokemonCancel();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ErrorBoundary>
      <div data-testid="details" className={`${pClassname}__${classname}`}>
        {/* {isFetching && <Loading text="pokemon" />} */}
        <Title
          pClassname={`${pClassname}__${classname}`}
          name={name}
          id={pokemonId}
        />
        <Image
          pClassname={`${pClassname}__${classname}`}
          sprites={sprites}
          name={name}
        />
        <BaseStats
          pClassname={`${pClassname}__${classname}`}
          height={height}
          weight={weight}
          types={types}
        />
        <Abilities
          pClassname={`${pClassname}__${classname}`}
          moves={moves}
          abilities={abilities}
        />
        <StatsDisplay
          pClassname={`${pClassname}__${classname}`}
          stats={stats}
        />
      </div>
    </ErrorBoundary>
  );
};

Details.propTypes = {
  pClassname: PropTypes.string.isRequired,
  getIsFetchingPokemon: PropTypes.bool.isRequired,
  fetchPokemonCancel: PropTypes.func.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  getSelectedPokemon: PropTypes.object,
};

export default withPokeList(Details);

export { Details };
