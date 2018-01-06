import React, {Component} from 'react';
import './Home.css';
import { Header, List } from 'semantic-ui-react'

class Home extends Component {

    render() {
        return (
            <div className="home-container" style={{paddingTop: '75px'}}>
                <Header as='h2'>jThirteen</Header>
                <p>Welcome to jThirteen!</p>
                <Header as='h3'>Features</Header>
                <List as='ul'>
                    <List.Item as='li'>Auto Sorting</List.Item>
                    <List.Item as='li'>Card Selection</List.Item>
                    <List.Item as='li'>Chat</List.Item>
                    <List.Item as='li'>Connect & Disconnect</List.Item>
                    <List.Item as='li'>Drag & Drop Sorting</List.Item>
                    <List.Item as='li'>First Connection Host</List.Item>
                    <List.Item as='li'>Lowest Card FIrst Player</List.Item>
                    <List.Item as='li'>Online Multi-player</List.Item>
                    <List.Item as='li'>Skip Turn</List.Item>
                    <List.Item as='li'>Partial support for play cards button disabled logic</List.Item>
                </List>
                <Header as='h3'>Todo List</Header>
                <List as='ul'>
                    <List.Item as='li'>Ability to gain points</List.Item>
                    <List.Item as='li'>Creation of custom game rooms</List.Item>
                    <List.Item as='li'>Customization of cards and profile</List.Item>
                    <List.Item as='li'>Find and fix defects & bugs</List.Item>
                    <List.Item as='li'>Guide page</List.Item>
                    <List.Item as='li'>Improve business & game logics</List.Item>
                    <List.Item as='li'>Improve conditionals for selected cards</List.Item>
                    <List.Item as='li'>Improve home page</List.Item>
                    <List.Item as='li'>Improve UI design and UX</List.Item>
                    <List.Item as='li'>Mobile Responsiveness</List.Item>
                    <List.Item as='li'>Score keeping</List.Item>
                    <List.Item as='li'>Unit testing</List.Item>
                    <List.Item as='li'>User registration</List.Item>
                    <List.Item as='li'>User Profile</List.Item>
                    <List.Item as='li'>QA Testing</List.Item>
                </List>
                <Header as='h3'>Stack Used</Header>
                <List as='ul'>
                    <List.Item as='li'>Express</List.Item>
                    <List.Item as='li'>Lodash</List.Item>
                    <List.Item as='li'>Moment.js</List.Item>
                    <List.Item as='li'>Node.js</List.Item>
                    <List.Item as='li'>React.js</List.Item>
                    <List.Item as='li'>React DnD</List.Item>
                    <List.Item as='li'>React Router</List.Item>
                    <List.Item as='li'>Semantic UI</List.Item>
                    <List.Item as='li'>Socket.io</List.Item>
                </List>
            </div>
        );
    }
}

export default Home;
