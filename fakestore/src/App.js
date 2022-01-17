import './App.css';
import React, { useState, useEffect } from 'react';
import FakeStore from './components/FakeStore';


const App = () => {

  const [store, setStore] = useState([])
  useEffect(() => {
    data();
  }, [])

  const data = async () => {
    const responce = await fetch("https://fakestoreapi.com/products");
    const jsonData = await responce.json();
    setStore(jsonData);
  }
  return (
    <div>
      <FakeStore product={store} />
    </div>
  );
}

export default App;
