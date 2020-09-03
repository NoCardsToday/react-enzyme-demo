import React from 'react';
import NotFoundIcon from 'app/Router/NotFoundIcon';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useRouter from 'use-react-router';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(24),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            padding: theme.spacing(2, 0),
            color: 'darkgrey',
        },
    })
);

export default () => {
    const classes = useStyles();
    const { history } = useRouter();

    return (
        <div className={classes.root}>
            <div id='not-found-icon'>
                <NotFoundIcon />
            </div>
            <span className={classes.title} id='not-found-title'>
                Sorry, the page you visited does not exist.
            </span>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/')}
                id='not-found-back-home-btn'
            >
                Back home
            </Button>
        </div>
    );
};
