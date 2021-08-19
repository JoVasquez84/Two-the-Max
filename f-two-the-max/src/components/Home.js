import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import BrokenTools from './tools/BrokenTools';
import Hardware from './hardware/Hardware';
import Footer from './Footer';

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