import React, {Component} from 'react';
// import './Home.css';
import { Header, List } from 'semantic-ui-react'

class Guide extends Component {

    render() {
        return (
            <div className="home-container" style={{paddingTop: '75px'}}>
                <Header as='h2'>How to Play</Header>
                <p>Directions on how to play</p>
                <Header as='h3'>Game Rules</Header>
                <List as='ul'>
                    <List.Item as='li'>Singles</List.Item>
                    <List.Item as='li'>Doubles</List.Item>
                    <List.Item as='li'>Triples</List.Item>
                    <List.Item as='li'>Straight 3</List.Item>
                    <List.Item as='li'>Straight 4</List.Item>
                    <List.Item as='li'>Straight 5</List.Item>
                    <List.Item as='li'>Straight 6</List.Item>
                    <List.Item as='li'>Straight 7</List.Item>
                    <List.Item as='li'>Straight 8</List.Item>
                    <List.Item as='li'>Straight 9</List.Item>
                    <List.Item as='li'>Straight 10</List.Item>
                    <List.Item as='li'>Straight 11</List.Item>
                    <List.Item as='li'>Straight 12</List.Item>
                    <List.Item as='li'>Straight 13</List.Item>
                    <List.Item as='li'>Bomb</List.Item>
                    <List.Item as='li'>- Four of a kind</List.Item>
                    <List.Item as='li'>- Pair sequence</List.Item>
                    <List.Item as='li'>Instant Wins</List.Item>
                    <List.Item as='li'>- Four 2s</List.Item>
                    <List.Item as='li'>- Six pair sequence</List.Item>
                    <List.Item as='li'>- There Triples</List.Item>
                </List>
            </div>
        );
    }
}

export default Guide;
