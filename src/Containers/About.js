import React, {Component} from 'react';
import './About.css';
import { Card, Header } from 'semantic-ui-react'

class About extends Component {

    render() {
        return (
            <div className="about-container" style={{paddingTop: '75px'}}>
                <Header as='h2'>About</Header>
                <p>jThirteen is a project started late night(~1am) on January 4th, 2018.</p>
                <p>It is a remake of a popular Vietnamese card game called 'Tien Len' or 'Thirteen' in English.</p>
                <Header as='h3'>Developers</Header>
                <Card.Group>
                    <Card>
                        <Card.Content>
                            <Card.Header>Sungjae Kim</Card.Header>
                            <Card.Meta>Developer</Card.Meta>
                            <Card.Description as='a' href='http://sungjkim.com'>sungjkim.com</Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
                <Header as='h3'>Source/Contribute</Header>
                <Card.Group>
                    <Card href='https://github.com/sungjkim34/jthirteenclient'>
                        <Card.Content>
                            <Card.Header>Client Code</Card.Header>
                            <Card.Description>jthirteenclient</Card.Description>
                        </Card.Content>
                    </Card>
                    <Card href='https://github.com/sungjkim34/jthirteenserver'>
                        <Card.Content>
                            <Card.Header>Server Code</Card.Header>
                            <Card.Description>jthirteenserver</Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        );
    }
}

export default About;
