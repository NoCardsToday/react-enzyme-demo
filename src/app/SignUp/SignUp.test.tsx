import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { mountWithHistory } from 'utils/test_utils';
import SignUp from 'app/SignUp';
import TextField from '@material-ui/core/TextField';
import MockAdapter from "axios-mock-adapter";
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils';

describe('Sign up', () => {
    let wrapper: ReactWrapper

    beforeEach(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={['/signup']} initialIndex={0}>
                <SignUp />
            </MemoryRouter>
        );
    });

    it('fails when email is not valid', () => {
        const usernameInput = wrapper.find('input#sign-up-username')
        usernameInput.simulate('change', {target:{value:'faymine'}})

        const emailInput = wrapper.find('input#sign-up-email')
        emailInput.simulate('change', { target: { value: '123@abc' }})

        const pwInput = wrapper.find('input#sign-up-password')
        pwInput.simulate('change', { target: { value: '123456' }});
        
        const ensureInput = wrapper.find('input#sign-up-ensure-password')
        ensureInput.simulate('change', { target: { value: '123456' }})

        const form = wrapper.find('form#sign-up-form');
        form.simulate('submit');
        expect(wrapper.find(TextField).filter('#sign-up-email').prop('helperText')).toEqual('Invalid email');
    })

    it('fails when password is too short', () => {
        const usernameInput = wrapper.find('input#sign-up-username')
        usernameInput.simulate('change', {target:{value:'faymine'}})

        const emailInput = wrapper.find('input#sign-up-email')
        emailInput.simulate('change', { target: { value: '123@abc.com' }})

        const pwInput = wrapper.find('input#sign-up-password')
        pwInput.simulate('change', { target: { value: '123' }});
        
        const ensureInput = wrapper.find('input#sign-up-ensure-password')
        ensureInput.simulate('change', { target: { value: '123456' }})

        const form = wrapper.find('form#sign-up-form');
        form.simulate('submit');
        expect(wrapper.find(TextField).filter('#sign-up-password').prop('helperText')).toEqual('Password too short')
    })

    it('fails when ensure is not equal to password', () => {
        const usernameInput = wrapper.find('input#sign-up-username')
        usernameInput.simulate('change', {target:{value:'faymine'}})

        const emailInput = wrapper.find('input#sign-up-email')
        emailInput.simulate('change', { target: { value: '123@abc.com' }})

        const pwInput = wrapper.find('input#sign-up-password')
        pwInput.simulate('change', { target: { value: '123456' }});
        
        const ensureInput = wrapper.find('input#sign-up-ensure-password')
        ensureInput.simulate('change', { target: { value: 'abcdef' }})

        const form = wrapper.find('form#sign-up-form');
        form.simulate('submit');
        expect(wrapper.find(TextField).filter('#sign-up-ensure-password').prop('helperText')).toEqual('Inconsistent password')
    })

    it('fails when email is duplicate', async () => {
        const mock = new MockAdapter(axios);

        const usernameInput = wrapper.find('input#sign-up-username')
        usernameInput.simulate('change', {target:{value:'faymine'}})

        const emailInput = wrapper.find('input#sign-up-email')
        emailInput.simulate('change', { target: { value: '123@abc.com' }})

        const pwInput = wrapper.find('input#sign-up-password')
        pwInput.simulate('change', { target: { value: '123456' }});
        
        const ensureInput = wrapper.find('input#sign-up-ensure-password')
        ensureInput.simulate('change', { target: { value: '123456' }})

        const form = wrapper.find('form#sign-up-form');
        form.simulate('submit');

        await act(async () => {
            mock.onPost('/signup', {
                userName: 'faymine',
                email: '123@abc.com',
                pw: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            }).reply(200, {
                result: 'fail',
                content: {
                    errCode: 201,
                }
            });
        });

        wrapper.update()
        expect(wrapper.find(TextField).filter('#sign-up-email').prop('helperText')).toEqual('Duplicate email');
    })

    it('success sign up', async () => {
        const mock = new MockAdapter(axios);
        const wrapper = mountWithHistory(<SignUp />, {
            routerConfig: { initialEntries: ['/signup'] }
        });

        const usernameInput = wrapper.find('input#sign-up-username')
        usernameInput.simulate('change', {target:{value:'faymine'}})

        const emailInput = wrapper.find('input#sign-up-email')
        emailInput.simulate('change', { target: { value: '123@abc.com' }})

        const pwInput = wrapper.find('input#sign-up-password')
        pwInput.simulate('change', { target: { value: '123456' }});
        
        const ensureInput = wrapper.find('input#sign-up-ensure-password')
        ensureInput.simulate('change', { target: { value: '123456' }})

        const form = wrapper.find('form#sign-up-form');
        form.simulate('submit');

        await act(async () => {
            mock.onPost('/signup', {
                userName: 'faymine',
                email: '123@abc.com',
                pw: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            }).reply(200, {
                result: 'success',
                content: {
                    userId: '234klj0sfu',
                    userEmail: '123@abc.com',
                    userName: 'faymine',
                    userAvatar: 'https://img.test.com/23jnsd9.jpg',
                    userToken: 'sdfj098guh23',
                }
            });
        });

        wrapper.update()
        expect(wrapper.history.location.pathname).toEqual('/')
    })

})