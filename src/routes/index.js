import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import PdfGen from '../pages/pdfGen';
import RandomNumGen from '../pages/randomNumGen';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/pdf-gen">
                    <PdfGen />
                </Route>
                <Route path="/">
                    <RandomNumGen />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
