import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './navBar/Navbar'
import { makeStyles, Toolbar, Grid, Typography,Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    align: 'center',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Grid container>
          <Grid item lg={4}>
            {sections.map((section) => (
              <Button key={section.title} variant='contained' href={section.url}>{section.title}</Button>
            ))}
          </Grid>
          <Grid item lg={4}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}>
              {title}
            </Typography>
          </Grid>
          <Grid item lg={4} />
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};