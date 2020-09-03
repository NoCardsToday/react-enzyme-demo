import React from 'react';
import useUserModel from 'models/userModel';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            textAlign: 'center',
            padding: theme.spacing(4, 0),
        },
    })
);

export default () => {
    const classes = useStyle();
    const { user } = useUserModel();

    return (
        <div className={classes.root}>
            <div id='welcome-title'>
                {`Welcome, ${user ? user.getName() : 'please sign in/up'}.`}
            </div>
        </div>
    );
};
