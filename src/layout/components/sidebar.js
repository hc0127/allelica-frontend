//import useState hook to create menu collapse state
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
} from '@mui/material';
import {
  PlaylistAdd,
  AirportShuttle,
  Person,
  Settings,
  Logout,
  Group,
  ExpandLess,
  ExpandMore
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  sidebar: {
    width: 250,
    background: theme.palette.primary.main,
    height: "100%",
    position:'fixed',
    top:0,
    bottom:0
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  label: {
    color:"white",
    textAlign:'left',
  },
  logo:{
    display: 'block',
    maxWidth: '80%',
    maxHeight: '100%',
    margin:'auto',
    marginTop:'30px'
  },
  link: {
    textDecoration:'none',
    color: "white",
    textColor: "white",
  }
}));

const listItems = [
  {
    listIcon: <PlaylistAdd style={{color:"white"}}/>,
    listText: "Register New Test to CSV",
    path: "/register_csv",
  },
  {
    listIcon: <PlaylistAdd style={{color:"white"}}/>,
    listText: "Register New Test to Fill",
    path: "/register_fill",
  },
  {
    listIcon: <Person style={{color:"white"}} />,
    listText: "Patients",
    path: "/patients",
  },
  {
    listIcon: <AirportShuttle style={{color:"white"}} />,
    listText: "Tracking",
    path: "/tracking",
  },
];

export default function Sidebar(){
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const { logout } = useAuth0();

  const handleClick = () => {
    setOpen(!open);
  };

  const { user } = useSelector((state) => {
    return {
      user: state.auth.user,
    };
  });

  return (
    <>
      <Box className={classes.sidebar} component="div">
        <img alt="allelica" className={classes.logo} src="../logo-white.png"/>
        <Grid
          container
          directon={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
          spacing={2}
        >
          <Grid item>
            <Avatar />
          </Grid>
          <Grid item>
            <label className={classes.label}>{user && user.username}</label>
          </Grid>
        </Grid>
        <Grid 
          container
          directon={"column"}
          justifyContent={"space-between"}
          style={{bottom:"0"}}
        >
          <Grid item alignItems={"center"}>
            <List style={{position:"absolute",width:"100%"}}>
              <ListItem className={classes.link} button onClick={handleClick}>
                  <ListItemIcon>
                    <Group style={{color:'white'}}/>
                  </ListItemIcon>
                  <ListItemText primary="Predict" className={classes.link}/>
                  {open ? <ExpandLess  style={{color:'white'}}/> : <ExpandMore  style={{color:'white'}}/>}
              </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List>
                      {listItems.map((listItem, index) => (
                        <ListItem className={classes.link} button key={index}>
                          <ListItemIcon>
                            {listItem.listIcon}
                          </ListItemIcon>
                          <Link to={listItem.path} className={classes.link}>
                            {listItem.listText}
                          </Link>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </List>
          </Grid>
          <Grid item alignItems={"center"} style={{bottom:'10px',position:'absolute',width:'100%'}}>
            <List>
              <ListItem className={classes.link} button>
                  <ListItemIcon>
                    <Settings  className={classes.link}/>
                  </ListItemIcon>
                  <Link to="settings" className={classes.link}>
                    Account settings
                  </Link>
              </ListItem>
              <ListItem
                className={classes.link}
                button
                onClick={() => logout({ returnTo: window.location.origin })}>
                  <ListItemIcon>
                    <Logout className={classes.link}/>
                  </ListItemIcon>
                  <Link className={classes.link}>
                    LOG OUT
                  </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}