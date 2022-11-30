import React from "react";
import {
    Grid,
} from '@mui/material';

export default function IconText(props) {
    return (
        <Grid
            container
            directon={props.direction}
            alignItems="center"
            justifyContent="flex-start"
        >
            <Grid item>
                <props.icon style={{ color: props.color, paddingTop:'.2em' }} />
            </Grid>
            <Grid item>
                <label style={{ color: props.color }}>{props.text}</label>
            </Grid>
        </Grid>
    );
}