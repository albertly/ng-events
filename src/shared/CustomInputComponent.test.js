import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CustomInputComponent from './CustomInputComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('CustomInputComponent', () => {

    it('renders <CustomInputComponent /> component as input', () => {

        const field = {name: 'name', value:'Albert', onChange: ()=>{}};
        const form = {touched: {'name': false}, errors: {}};
        const props = {label: 'My Name ...', type: 'input', className: 'my-class'};

        const wrapper = shallow(<CustomInputComponent field={field} form={form} {...props}/>);
        
        console.log(wrapper.html())
        const control = wrapper.find(props.type);
        
        expect(control.length).toEqual(1);

        const label = wrapper.find('label');
        expect(label.length).toEqual(1)
        expect(label.text()).toEqual('My Name ...');

        expect(wrapper.find('input.form-control').length).toEqual(1);

      });
});