// Extenal
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Local
import { IconButton } from '~Components';
// Constants
const classname = 'image';
/* Declarations */
/* Functions */

// Component
const Image = ({ pClassname, sprites, name }) => {
  const [displayBack, updateDisplayBack] = useState(false);
  const [displayFemale, updateDisplayFemale] = useState(false);

  const maleBack = sprites?.['back_default'] ?? null;
  const femaleBack = sprites?.['back_female'] ?? null;
  const maleFront = sprites?.['front_default'] ?? null;
  const femaleFront = sprites?.['front_female'] ?? null;

  const handleUpdateDisplayBack = () => {
    updateDisplayBack(pVal => !pVal);
  };

  const handleUpdateDisplayFemale = val => {
    updateDisplayFemale(val);
  };

  return (
    <div data-testid="details-image" className={`${pClassname}__${classname}`}>
      <div className={`${pClassname}__${classname}__gender`}>
        <IconButton
          disabled={!maleFront && !maleBack}
          className="male"
          onClick={() => handleUpdateDisplayFemale(false)}
          primary={displayFemale}
        >
          <i className="fas fa-mars" />
        </IconButton>
        <IconButton
          disabled={!femaleFront && !femaleBack}
          className="female"
          onClick={() => handleUpdateDisplayFemale(true)}
          primary={!displayFemale}
        >
          <i className="fas fa-venus" />
        </IconButton>
      </div>
      {sprites && displayFemale && (
        <img
          className={`${pClassname}__${classname}__pokemon`}
          src={displayBack ? femaleBack : femaleFront}
          alt={`${name}`}
        />
      )}
      {sprites && !displayFemale && (
        <img
          className={`${pClassname}__${classname}__pokemon`}
          src={!displayBack ? maleFront : maleBack}
          alt={`${name}`}
        />
      )}
      <div className={`${pClassname}__${classname}__flipper`}>
        <IconButton
          onClick={handleUpdateDisplayBack}
          disabled={!sprites || !!sprites.length}
        >
          <i className="fas fa-sync-alt" />
        </IconButton>
      </div>
    </div>
  );
};

Image.propTypes = {
  pClassname: PropTypes.string.isRequired,
  sprites: PropTypes.object,
  name: PropTypes.string,
};

export default Image;

export { Image };
