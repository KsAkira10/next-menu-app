import { Container } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import Promotion from '../src/components/Promotion';

export type HomeProps = {};

type HomeComponent = React.FC<HomeProps>;

type HomePage = NextPage<HomeComponent>;

const Home: HomePage = () => (
  <Container fixed maxWidth={false}>
    <Promotion cuponCode="RCHLO649863" />
  </Container>
);

export default Home;
