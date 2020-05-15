import React, { useContext } from 'react';
import OptionsContext from './OptionsContext';
import Option from './Option';

const UserOptions = () => {
  const context = useContext(OptionsContext);

  const handleLanguageClick = e => {
    if (e.target.id === 'pl') {
      context.setLanguage('pl');
    } else {
      context.setLanguage('en');
    }
  };

  const handleUnitsClick = e => {
    if (e.target.id === 'imperial') {
      context.setUnits('imperial');
    } else {
      context.setUnits('metric');
    }
  };

  return (
    <div className="text-right p-2 mr-2 text-sm lg:text-base">
      <Option
        bold={context.language === 'en' ? true : false}
        handleClick={handleLanguageClick}
        textContent="en"
        id="en"
        name="language"
      />
      <span className="mx-1">|</span>
      <Option
        bold={context.language === 'pl' ? true : false}
        handleClick={handleLanguageClick}
        textContent="pl"
        id="pl"
        name="language"
      />
      <span className="ml-6"></span>
      <Option
        bold={context.units === 'metric' ? true : false}
        handleClick={handleUnitsClick}
        textContent="metric"
        id="metric"
        name="units"
      />
      <span className="mx-1">|</span>
      <Option
        bold={context.units === 'imperial' ? true : false}
        handleClick={handleUnitsClick}
        textContent="imperial"
        id="imperial"
        name="units"
      />
    </div>
  );
};

export default UserOptions;
