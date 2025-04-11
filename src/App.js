import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Index from './components/pages/firstpage';
import Error from './components/pages/err';
import Logger from './components/pages/bdlogger'
import GlobalStyles from './components/globalStyles';

import FirebaseInit from './components/modules/firebaseInit';

function App (){
  FirebaseInit();
  
  return (
    <Router>
      <div className = "App">
        <GlobalStyles />
        <div className ="content">
          <Switch>   
            <Route exact path="/" component= {Index}/>
            <Route exact path="/index" component= {Index}/>
            <Route exact path="/bd/:guild/:user" component= {Logger}/>
            <Route path="*" component= {Error}  />
          </Switch>
        </div>
      </div>
    </Router>
  );
}



export default App;