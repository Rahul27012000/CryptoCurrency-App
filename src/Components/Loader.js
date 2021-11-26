import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <>
  <div className="loader">
    <Spin tip="Loading..."/>
  </div>
  
  </>
);

export default Loader;