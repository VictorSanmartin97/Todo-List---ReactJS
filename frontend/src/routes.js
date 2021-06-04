import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './components/TodoLista';
import ChangeForm from './components/ChangeForm';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Home} />
                <Route path="/task" component={ChangeForm} />

            </Switch>
        </BrowserRouter>
    )
}