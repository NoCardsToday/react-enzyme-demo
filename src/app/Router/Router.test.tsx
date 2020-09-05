import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { mountWithHistory } from 'utils/test_utils';
import Welcome from 'app/Welcome';
import SignIn from 'app/SignIn';
import SignUp from 'app/SignUp';
import NotFound from 'app/Router/NotFound';


describe('<Router />', () => {
    const wrapper = mountWithHistory(
        <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NotFound} />
        </Switch>
    );

    it('should display <Welcome /> when visiting "/".', () => {
        wrapper.history.push('/');
        wrapper.update();

        expect(wrapper.find(Welcome).exists()).toBeTruthy();
        expect(wrapper.find(SignIn).exists()).toBeFalsy();
        expect(wrapper.find(SignUp).exists()).toBeFalsy();
        expect(wrapper.find(NotFound).exists()).toBeFalsy();
    });

    it('should display <SignIn /> when visiting "/signin".', () => {
        wrapper.history.push('/signin');
        wrapper.update();

        expect(wrapper.find(Welcome).exists()).toBeFalsy();
        expect(wrapper.find(SignIn).exists()).toBeTruthy();
        expect(wrapper.find(SignUp).exists()).toBeFalsy();
        expect(wrapper.find(NotFound).exists()).toBeFalsy();
    });

    it('should display <SignUp /> when visiting "/signup".', () => {
        wrapper.history.push('/signup');
        wrapper.update();

        expect(wrapper.find(Welcome).exists()).toBeFalsy();
        expect(wrapper.find(SignIn).exists()).toBeFalsy();
        expect(wrapper.find(SignUp).exists()).toBeTruthy();
        expect(wrapper.find(NotFound).exists()).toBeFalsy();
    });

    it('should display <NotFound /> when visiting other urls.', () => {
        wrapper.history.push('/test');
        wrapper.update();

        expect(wrapper.find(Welcome).exists()).toBeFalsy();
        expect(wrapper.find(SignIn).exists()).toBeFalsy();
        expect(wrapper.find(SignUp).exists()).toBeFalsy();
        expect(wrapper.find(NotFound).exists()).toBeTruthy();
    });
});
