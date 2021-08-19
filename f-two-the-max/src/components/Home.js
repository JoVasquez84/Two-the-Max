import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import BrokenTools from './brokenTools/BrokenTools';
import Hardware from './hardware/Hardware';
import IssuedTools from './tools/IssuedTools';
import UnissuedTools from './tools/UnissuedTools';
import Personnel from './personnel/Personnel';
import Footer from './Footer';
import { Route } from 'react-router-dom';

const sections = [
  { title: 'Issued Tools', url: '/IssuedTools/' },
  { title: 'All Tools', url: '/AllTools/' },
  { title: 'Personnel', url: '/Personnel/' }
];

const Home = ({ MainTable }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Two The Max" sections={sections} />
        <ButtonGroup>
          <Button variant='contained' href='/IssuedTools/'>Issued Tools</Button>
          <Button variant='contained' href='/AllTools/'>All Tools</Button>
          <Button variant='contained' href='/Personnel/'>Personnel</Button>
        </ButtonGroup>
        <main>
          <MainTable />
          <Grid container spacing={4}>
            <Hardware />
            <BrokenTools />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}

export default Home