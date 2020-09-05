import React from 'react';
import useUserModel from 'models/user/userModel';
import { mount } from 'enzyme';
import Welcome from 'app/Welcome';
import IUser from 'models/user';


const SignInWelcome = () => {
    const { setUser } = useUserModel();
    React.useEffect(() => setUser(new IUser('sdg89fsdf', 'zx5', '123@abc.com', '', '25jsgh8s9g')), []);
    return <Welcome />;
}

const LogoutWelcome = () => {
    const { setUser } = useUserModel();
    React.useEffect(() => setUser(null), []);
    return <Welcome />;
}

describe('<Welcome />', () => {
    it('should guide user to sign in/up without user signing in.', () => {
        const wrapper = mount(<LogoutWelcome />);
        expect(wrapper.find('#welcome-title').text()).toEqual('Welcome, please sign in/up.');
    });

    it('should display user name after signing in.', () => {
        const wrapper = mount(<SignInWelcome />);
        expect(wrapper.find('#welcome-title').text()).toEqual('Welcome, zx5.');
    });
});
