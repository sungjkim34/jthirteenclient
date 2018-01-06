import React, {Component} from 'react';
import './App.css';
import Home from './Containers/Home';
import About from './Containers/About';
import Play from './Containers/Play';
import Guide from './Containers/Guide';
import { Container, Menu } from 'semantic-ui-react'
import { Switch, Route, Link } from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div className="App">

                <Menu borderless fixed={'top'}
                    style={{ backgroundColor: '#fff', border: '1px solid #ddd', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',}}>
                    <Container text>
                        {/*<Menu.Item>Logo</Menu.Item>*/}
                        <Menu.Item header as={Link} to='/'>jThirteen</Menu.Item>
                        <Menu.Item as={Link} to='/play'>Play</Menu.Item>
                        <Menu.Item as={Link} to='/guide'>Guide</Menu.Item>
                        <Menu.Item as={Link} to='/about'>About</Menu.Item>
                    </Container>
                </Menu>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/play' component={Play}/>
                    <Route path='/guide' component={Guide}/>
                    <Route path='/about' component={About}/>
                </Switch>

            </div>
        );
    }
}

export default App;
