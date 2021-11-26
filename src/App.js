import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import './App.css';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News } from './Components';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            {/* Switch is changes to Routes in version 6 and above  */}
            <Routes>
              <Route exact path='/' element={<Homepage />}></Route>
              <Route exact path='/exchanges' element={<Exchanges />}></Route>
              <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />}></Route>
              <Route exact path='/crypto/:coinID' element={<CryptoDetails />}></Route>
              <Route exact path='/news' element={<News />}></Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer" >
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
          Made by <a href="https://rahul27012000.github.io/PortFolio/#/about" target="_blank">
          Rahul Maheshwari</a> ❤<br />
          All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
