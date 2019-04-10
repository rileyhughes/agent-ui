import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Global} from "./Global"

import {BrowserRouter, Route} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={Global}/>
        </div>
    </BrowserRouter>, document.getElementById('root')
);

