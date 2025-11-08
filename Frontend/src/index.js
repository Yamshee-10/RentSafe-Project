import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'
import HowItWorks from './components/how-it-works'
import BrowseItems from './components/browse'
import SearchResults from './components/SearchResults'
import ItemDetail from './components/item-details';






const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/how-it-works" component={HowItWorks} />
        <Route exact path="/browse-items" component={BrowseItems} />
        <Route exact path="/search" component={SearchResults} />
        <Route exact path="/item/:id" component={ItemDetail} />
        <Route exact path="/not-found" component={NotFound} />
        <Route path="*" component={NotFound} />
        <Redirect to="/not-found" />





        {/* <Route exact path="/" component={Home} />
        <Route exact path="/not-found" component={NotFound} />
        <Route path="*" component={NotFound} />
        <Route exact path="/how-it-works" component={HowItWorks} />
        <Redirect to="/not-found" /> */}

      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))



// import React from 'react'
// import ReactDOM from 'react-dom'
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from 'react-router-dom'

// import './style.css'
// import Home from './views/home'
// import NotFound1, { NotFound } from './views/not-found'

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route component={Home} exact path="/" />
//         <Route component={NotFound1} exact path="/not-found" />
//         <Route component={NotFound} path="**" />
//         <Redirect to="**" />
//       </Switch>
//     </Router>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('app'))
