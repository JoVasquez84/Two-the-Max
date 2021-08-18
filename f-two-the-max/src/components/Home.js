import React from 'react';
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

const sections = [
  { title: 'Issued Tools', url: '#' },
  { title: 'Unissued Tools', url: '#' },
  { title: 'Personnel', url: '#' }
];

const Home = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Two The Max" sections={sections} />
        <main>
          <IssuedTools />
          <UnissuedTools />
          <Personnel />
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