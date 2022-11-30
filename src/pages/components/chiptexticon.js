import React from "react";
import {
    Grid,
} from '@mui/material';
import {Chip} from "@mui/material";
import styled from "styled-components";

const ChipButton = styled(Chip)`
font-family: Roboto, Helvetica Neue, sans-serif;
align-items: center;
cursor: pointer;
`;

export default function ChipTextIcon(props) {
    return (
        <ChipButton
        style={{background:props.theme.light}}
        onClick ={() =>props.onClick()}
        label={
            <Grid
                container
                directon="column"
                alignItems="center"
            >
                <Grid item>
                    <label style={{ color: props.theme.main,cursor:"pointer" }}>{props.text}</label>
                </Grid>
                <Grid item>
                    <props.icon style={{ color: props.theme.main, paddingTop:".2em" }} />
                </Grid>
            </Grid>
        }
      />
    );
}