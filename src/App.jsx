import { useState } from 'react'
import data from './card-image.json';
import Header from './components/Header';
import Footer from './components/Footer';
import CardGame from './components/CardGame';

function App() {
  

  return (<>
    <Header />
    <CardGame />
    <Footer />
  </>)
}

export default App
