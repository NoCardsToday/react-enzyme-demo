import IUser from 'models/user';


describe('IUser', () => {
    it('should have 5 properties.', () => {
        const user = new IUser(
            'k5j34nk3j5',
            'zx55',
            '123@abc.com',
            'img.test.com/123456.jpg',
            '3mnof04k23'
        );

        expect(user.getId()).toEqual('k5j34nk3j5');
        expect(user.getName()).toEqual('zx55');
        expect(user.getEmail()).toEqual('123@abc.com');
        expect(user.getAvatar()).toEqual('img.test.com/123456.jpg');
        expect(user.getToken()).toEqual('3mnof04k23');
    });
});
