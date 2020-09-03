import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'app/Router';
import Navigator from 'app/Navigator';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            padding: theme.spacing(0, 20),
        }
    })
)

export default () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Navigator />
            <div className={classes.content}>
                <Router />
            </div>
        </BrowserRouter>
    );
};
