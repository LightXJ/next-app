import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from '../index';

describe('MyComponent', () => {
  it('should render correctly in "deb" mode', () => {    const component = shallow(<MyComponent debug />);
  
    expect(component).toMatchSnapshot();
  });
});
