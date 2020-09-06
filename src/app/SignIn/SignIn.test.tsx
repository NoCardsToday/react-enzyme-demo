import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { mountWithHistory } from 'utils/test_utils';
import SignIn from 'app/SignIn';
import TextField from '@material-ui/core/TextField';
import MockAdapter from "axios-mock-adapter";
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils';

describe('Sign in', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={['/signin']} initialIndex={0}>
                <SignIn />
            </MemoryRouter>
        );
    });

    it('fails when email inputed is invalid.', () => {
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

    it('fails when email is not-founded.', async () => {
        const mock = new MockAdapter(axios);

        const emailInput = wrapper.find('input#sign-in-email');
        emailInput.simulate('change', { target: { value: '123@abc.com' }});
        expect(wrapper.find(TextField).filter('#sign-in-email').prop('value')).toEqual('123@abc.com');
        const pwInput = wrapper.find('input#sign-in-password');
        pwInput.simulate('change', { target: { value: '123456' }});
        expect(wrapper.find(TextField).filter('#sign-in-password').prop('value')).toEqual('123456');

        const form = wrapper.find('form#sign-in-form');
        form.simulate('submit');
        await act(async () => {
            mock.onPost('/signin', {
                email: '123@abc.com',
                pw: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            }).reply(200, {
                result: 'fail',
                content: {
                    errCode: 101,
                }
            });
        });

        wrapper.update();
        expect(wrapper.find(TextField).filter('#sign-in-email').prop('helperText')).toEqual('Email not found');
    });

    it('fails when password mismatches.', async () => {
        const mock = new MockAdapter(axios);

        const emailInput = wrapper.find('input#sign-in-email');
        emailInput.simulate('change', { target: { value: '123@abc.com' }});
        expect(wrapper.find(TextField).filter('#sign-in-email').prop('value')).toEqual('123@abc.com');
        const pwInput = wrapper.find('input#sign-in-password');
        pwInput.simulate('change', { target: { value: '123456' }});
        expect(wrapper.find(TextField).filter('#sign-in-password').prop('value')).toEqual('123456');

        const form = wrapper.find('form#sign-in-form');
        form.simulate('submit');
        await act(async () => {
            mock.onPost('/signin', {
                email: '123@abc.com',
                pw: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            }).reply(200, {
                result: 'fail',
                content: {
                    errCode: 102,
                }
            });
        });

        wrapper.update();
        expect(wrapper.find(TextField).filter('#sign-in-email').prop('helperText')).toEqual('Password mismatch');
    });

    it('successes when email matches with password.', async () => {
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
        await act(async () => {
            mock.onPost('/signin', {
                email: '123@abc.com',
                pw: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
            }).reply(200, {
                result: 'success',
                content: {
                    userId: '234klj0sfu',
                    userEmail: '123@abc.com',
                    userName: 'zx5',
                    userAvatar: 'https://img.test.com/23jnsd9.jpg',
                    userToken: 'sdfj098guh23',
                }
            });
        });

        wrapper.update();
        expect(wrapper.history.location.pathname).toEqual('/');
    });
});
