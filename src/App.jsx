import { useState } from 'react'
import data from './card-image.json';
import Header from './components/Header';
import Footer from './components/Footer';
import CardGame from './components/CardGame';
import './index.css'

function App() {
  

  return (
  <div id='wrapper'>
      <Header />
      <CardGame />
      <Footer />
  </div>)
}

export default App
