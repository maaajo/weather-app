import React from 'react';
import { shallow, configure } from 'enzyme';
import Option from '../Option';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('prop test', () => {
  const mockFunction = jest.fn();
  const component = shallow(
    <Option
      name="language"
      id="en"
      textContent="en"
      handleClick={mockFunction}
      bold={true}
    />
  );
  const button = component.find('button');

  test('renders properly', () => {
    expect(button.debug()).toMatchSnapshot();
  });

  test('name created when id and name passed', () => {
    expect(button.prop('name')).toEqual('language-en');
  });

  test('id created when prop passed', () => {
    expect(button.prop('id')).toEqual('en');
  });
  test('text content should equal to passed prop', () => {
    expect(button.text()).toEqual('en');
  });
  test('triggers on click prop function when clicked', () => {
    button.simulate('click');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
  test('should have class font-bold when bold is true', () => {
    expect(button.hasClass('font-bold')).toEqual(true);
  });
});
