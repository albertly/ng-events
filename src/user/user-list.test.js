import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {UserList} from './user-list';
Enzyme.configure({ adapter: new Adapter() });


describe('UserList',  () => {

    it('renders without crashing', () => {

        const wrapper =  shallow(<UserList></UserList>);
    
    });

}
)