import React, {Component} from 'react';
// import './Home.css';
import { Header } from 'semantic-ui-react'

class Guide extends Component {

    render() {
        return (
            <div className="home-container" style={{paddingTop: '75px'}}>
                <Header as='h2'>How to Play</Header>
                <p>Directions on how to play</p>
                <Header as='h3'>Game Rules</Header>
            </div>
        );
    }
}

export default Guide;
