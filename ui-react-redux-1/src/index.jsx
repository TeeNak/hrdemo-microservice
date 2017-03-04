import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

import 'bootstrap/dist/css/bootstrap.css';
import 'expose?$!expose?jQuery!jquery'; // using expose-loader plugin due to bootstrap requires jQuery to be global variable.
import 'bootstrap/dist/js/bootstrap.js';

import 'react-bootstrap-table/css/react-bootstrap-table-all.css';

import './css/main.css';


render(
  <Root />,
  document.getElementById('root')
)
