import { createContext } from 'react';

const OptionsContext = createContext({
  language: '',
  units: '',
  setLanguage: () => {},
  setUnits: () => {}
});

export default OptionsContext;
