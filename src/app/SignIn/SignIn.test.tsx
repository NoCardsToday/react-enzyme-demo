import React from 'react';
import { mount } from 'enzyme';
import { mountWithHistory } from 'utils/test_utils';
import SignIn from 'app/SignIn';
import TextField from '@material-ui/core/TextField';

describe('<SignIn />', () => {
    it('will fail when email inputed is invalid.', () => {
        const wrapper = mount(<SignIn />);

        const emailInput = wrapper.find('input#sign-in-email');
        emailInput.simulate('change', { target: { value: '123@abc' }});
        expect(wrapper.find(TextField).filter('#sign-in-email').prop('value')).toEqual('123@abc');
        const pwInput = wrapper.find('input#sign-in-password');
        pwInput.simulate('change', { target: { value: '123456' }});
        expect(wrapper.find(TextField).filter('#sign-in-password').prop('value')).toEqual('123456');

        const form = wrapper.find('form#sign-in-form');
        form.simulate('submit');
        expect(wrapper.find(TextField).filter('#sign-in-email').prop('helperText')).toEqual('Invalid email');
    });
});
