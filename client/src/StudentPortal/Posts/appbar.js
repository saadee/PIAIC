import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100vw"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    letterSpacing: "1.5rem"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundImage: "-webkit-linear-gradient(right,#08383d,#01645f)",
          backgroundImage: "linear-gradient(270deg,#08383d,#01645f)"
        }}
      >
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            Articles
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
