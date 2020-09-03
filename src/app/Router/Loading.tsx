import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '93.2vh',
        },
        loading: {
            lineHeight: '93.2vh',
            width: '100%',
            textAlign: 'center',
        }
    }),
);

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.loading}>
                <CircularProgress />
            </div>
        </div>
    );
};
