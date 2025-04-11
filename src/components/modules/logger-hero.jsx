import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        minHeight: 150,
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    }
}))


const Hero = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
                <AppBar position="relative">
                <Toolbar className={classes.toolbar}>
                    <p className="title is-2 has-text-white" title-color='$white'>生日登記系統</p>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Hero
