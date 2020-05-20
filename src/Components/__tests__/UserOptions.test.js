import React, { useContext } from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Option from '../Option';
import OptionsContext from '../OptionsContext';

configure({ adapter: new Adapter() });

describe('User options', () => {
  const TestComponent = () => {
    const context = useContext(OptionsContext);

    return (
      <Option
        id="pl"
        language="pl"
        name="language"
        bold={context.language === 'pl' ? true : false}
      />
    );
  };

  const wrapper = mount(
    <OptionsContext.Provider value={{ language: 'pl', units: 'metric' }}>
      <TestComponent />
    </OptionsContext.Provider>
  );

  test('options should be rendered', () => {
    expect(wrapper.find(Option).exists()).toEqual(true);
  });

  test('should have property bold set to true when context language is equal to pl', () => {
    expect(wrapper.find(Option).prop('bold')).toBeTruthy();
  });
});
