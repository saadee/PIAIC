import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "99vw"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: "35px",
    fontWeight: "bold",
    letterSpacing: "10px",
    color: "black",
    fontFamily: "Lobster Two",
    marginTop: "-15px"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        className="animated bounceInDown"
        position="static"
        style={{
          height: "50px",
          // marginLeft:'-10px',
          // backgroundColor:'white'
          // backgroundImage: "-webkit-linear-gradient(right,#08383d,#01645f)",
          // backgroundImage: "linear-gradient(270deg,#08383d,#01645f)"
          // backgroundColor: "white"
          background:'radial-gradient(circle, rgba(241,239,240,0.4822303921568627) 0%, rgba(15,15,15,0.6166841736694677) 100%)'
          //   " linear-gradient(90deg, rgba(99,180,58,1) 0%, rgba(253,194,29,0.8211659663865546) 50%, rgba(247,63,22,0.6474964985994398) 100%)"
        }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            style={
              {
                // fontFamily: "Luminari, fantasy"
              }
            }
            className={classes.title}
          >
            Articles by Saadee
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
