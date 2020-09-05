import React from 'react';
import { createModel } from 'hox';
import IUser from 'models/user';
import axios from 'axios'

export default createModel(() => {
    const [user, setUser] = React.useState<IUser | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [errCode, setCode] = React.useState(-1);

    const signIn = (email: string, pw: string) => {
        setLoading(true);
        setCode(-1);
        axios.post("URL").then((response) => {
            console.log(response.data)
            setUser(new IUser('sdfu8sj3259dufs', 'zx5', '123@abc.com', '', 'df89e4dfs89'));
        }).catch((error) => {
            console.log('error')
        });
        // setTimeout(() => {
        //     if (email === '123@abc.com' && pw === '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92') {
        //         setUser(new IUser('sdfu8sj3259dufs', 'zx5', '123@abc.com', '', 'df89e4dfs89'));
        //     } else if (email !== '123@abc.com') {
        //         setCode(101);
        //     } else if (pw !== '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92') {
        //         setCode(102);
        //     } else {
        //         setCode(100);
        //     }
        //     setLoading(false);
        // }, 1000);
    };

    const signUp = (userName: string, email: string, pw: string) => {

    }

    const logout = () => {
        setUser(null);
    }

    return { user, signIn, signUp, logout, errCode, loading, setUser };
});
