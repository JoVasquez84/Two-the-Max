import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid, Container } from '@material-ui/core'
import HeaderMobile from './HeaderMobile'
import HeaderDesktop from './HeaderDesktop'
import BrokenTools from './tools/BrokenTools'
import Hardware from './hardware/Hardware'

const sections = [
  { title: 'Issued Tools', url: '/IssuedTools/' },
  { title: 'All Tools', url: '/AllTools/' },
  { title: 'Personnel', url: '/Personnel/' }
];

const Home = ({ MainTable }) => {
  const [isMobileView, setIsMobileView] = useState(false)
  const [isServStatusChanged, setIsServStatusChanged] = useState(false)

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1280
        ? setIsMobileView(true)
        : setIsMobileView(false)
    };
    

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness())

    return () => {
      window.removeEventListener("resize", () => setResponsiveness())
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {isMobileView
          ? <HeaderMobile title="Two The Max" sections={sections} />
          : <HeaderDesktop title="Two The Max" sections={sections} />}
        <main>
          <MainTable setIsServStatusChanged={setIsServStatusChanged} />
          <Grid container spacing={4}>
            <Hardware />
            <BrokenTools isServStatusChanged={isServStatusChanged} setIsServStatusChanged={setIsServStatusChanged} />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

export default Home