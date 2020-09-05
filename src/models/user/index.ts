export default class IUser {
    private userId: string;
    private userName: string;
    private userEmail: string;
    private userAvatar: string;
    private userToken: string;

    public constructor(userId: string = '', userName: string = '', userEmail = '', userAvatar: string = '', userToken = '') {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userAvatar = userAvatar;
        this.userToken = userToken;
    }

    public getId() {
        return this.userId;
    }

    public getName() {
        return this.userName;
    }

    public getEmail() {
        return this.userEmail;
    }

    public getAvatar() {
        return this.userAvatar;
    }

    public getToken() {
        return this.userToken;
    }
};
