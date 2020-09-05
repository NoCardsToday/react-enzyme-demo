import React from 'react';
import { mount } from 'enzyme';
import { mountWithHistory } from 'utils/test_utils';
import SignIn from 'app/SignIn';
import TextField from '@material-ui/core/TextField';
import MockAdapter from "axios-mock-adapter";
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils';

describe('Sign in fail', () => {
    it('will fail when email inputed is invalid.', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/signin']} initialIndex={0}>
                <SignIn />
            </MemoryRouter>
        );

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

describe('Sign in success', () => {
    it('sign in success czr', () => {
        const mock = new MockAdapter(axios);
        const wrapper = mountWithHistory(<SignIn />, {
            routerConfig: { initialEntries: ['/signin'] }
        });

        const emailInput = wrapper.find('input#sign-in-email');
        emailInput.simulate('change', { target: { value: '123@abc.com' }});
        const pwInput = wrapper.find('input#sign-in-password');
        pwInput.simulate('change', { target: { value: '123456' }});
        
        const form = wrapper.find('form#sign-in-form');
        form.simulate('submit');
        //await act( async () => {
            mock.onPost("URL").reply(200,
                {
                  user: { id: 1, name: "John Smith" },
                }
            );
        //});
        
        expect(wrapper.history.location.pathname).toEqual('/');
    })
})
