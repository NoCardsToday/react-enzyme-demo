import React from 'react';
import NotFound from 'app/Router/NotFound';
import { mountWithHistory } from 'utils/test_utils';


describe('<NotFound />', () => {
    const wrapper = mountWithHistory(<NotFound />, {
        routerConfig: { initialEntries: ['/not-found'] }
    });

    it('should have an icon, a title and a "back home" button.', () => {
        expect(wrapper.find('#not-found-icon').length).toEqual(1);
        expect(wrapper.find('#not-found-title').text()).toEqual('Sorry, the page you visited does not exist.');
        expect(wrapper.find('button#not-found-back-home-btn').text()).toEqual('Back home');
    });

    it('should jump to homepage when click "back home" button.', () => {
        const btn = wrapper.find('button#not-found-back-home-btn');
        expect(wrapper.history.location.pathname).toEqual('/not-found');
        btn.simulate('click');
        expect(wrapper.history.location.pathname).toEqual('/');
    });
});
