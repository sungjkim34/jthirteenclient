import React, {Component} from 'react';
import './Play.css';
import openSocket from 'socket.io-client';
import update from 'immutability-helper';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from '../Components/Card/Card';
import { Button, Comment, Form, Header, Icon} from 'semantic-ui-react'
import { serverURL } from '../Constants';
import moment from 'moment';
import { isEqual } from 'lodash';

class Play extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfPlayers: 0,
            hostPlayer: false,
            socket: openSocket(serverURL),
            cards: [],
            selectedCards: [],
            opponentPlayedCards: [],
            lastPlayedCards: [],
            gameInProgress: false,
            isMyTurn: false,
            playerWon: false,
            opponentPlayerWon: false,
            messageText: '',
            playerName: '',
            messages: []
        };

        this.state.socket.on('hostPlayer', () => {
            console.log('you are the host');
            this.setState({hostPlayer: true});
        });

        this.state.socket.on('firstPlayer', () => {
            console.log('you are first player');
            this.setState({isMyTurn: true});
        });

        this.state.socket.on('numberOfPlayersChanged', numOfPlayers => {
            this.setState({numOfPlayers});
        });

        this.state.socket.on('dealCards', cards => {
            // if its first round must play with 3 of spade
            cards.map((card, i) => card['id'] = i);
            console.log(cards);
            this.setState({
                gameInProgress: true,
                playerWon: false,
                opponentPlayerWon: false,
                lastPlayedCards: [],
                opponentPlayedCards: [],
                selectedCards: [],
                cards
            });
        });

        this.state.socket.on('opponentPlayedCards', opponentPlayedCards => {
            console.log('opponentPlayedCards: ' + opponentPlayedCards);
            this.setState({
                isMyTurn: true,
                lastPlayedCards: opponentPlayedCards,
                opponentPlayedCards
            });
        });

        this.state.socket.on('opponentSkippedTurn', () => {
            console.log('opponentSkippedTurn');
            this.setState({isMyTurn: true});
        });

        this.state.socket.on('opponentPlayerWon', () => {
            console.log('Opponent player won');
            this.setState({
                gameInProgress: false,
                playerWon: false,
                opponentPlayerWon: true,
                isMyTurn: false
            });
        });

        this.state.socket.on('sendMessage', message => {
            this.setState({messages: [...this.state.messages, message]});
        });
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
        this.state.socket.off();
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    };

    startGame = () => {
        if (this.state.hostPlayer) {
            this.state.socket.emit('startGame');
        } else {
            console.log('ERROR - You are not the room host');
        }
    };

    selectCard = (selectedCard) => {
        const { suit, rank, value } = selectedCard;
        if (this.state.selectedCards.some(card => card.suit === suit && card.rank === rank)) {
            this.setState({selectedCards: this.state.selectedCards.filter(card => !(card.rank === rank && card.suit === suit))});
        } else {
            this.setState({selectedCards: [...this.state.selectedCards, {suit, rank, value}]});
        }
    };

    playCards = () => {
        this.state.socket.emit('playCards', this.state.selectedCards);
        const newCards = this.state.cards.filter(card => !this.state.selectedCards.some(selectedCard => card.suit === selectedCard.suit && card.rank === selectedCard.rank));
        this.setState({lastPlayedCards: this.state.selectedCards});
        this.setState({cards: newCards, isMyTurn: false, selectedCards: []});

        console.log(newCards);
        if (newCards.length === 0) {
            console.log('winner!!');
            this.state.socket.emit('playerWon');
            this.setState({
                gameInProgress: false,
                playerWon: true,
                opponentPlayerWon: false,
                isMyTurn: false
            });
        }
    };

    skipTurn = () => {
        this.state.socket.emit('skipTurn');
        this.setState({isMyTurn: false, selectedCards: []});
    };

    sortCards = () => {
        const sortedCards = this.state.cards.slice().sort((a, b) => a.firstCardValue - b.firstCardValue);
        this.setState({cards: sortedCards});
    };

    sendMessage = () => {
        this.state.socket.emit('sendMessage', this.state.messageText, this.state.playerName, Date.now());
        this.setState({messageText: ''});
    };

    isPlayCardsBtnDisabled = () => {
        if (!this.state.isMyTurn) {
            return true;
        }
        if (this.state.selectedCards.length === 0) {
            return true;
        }
        if (this.state.selectedCards.length === 2) {
            if (this.state.selectedCards[0].rank !== this.state.selectedCards[1].rank) {
                return true;
            }
        }
        if (this.state.selectedCards.length === 3) {
            const sortedSelectedCards = this.state.selectedCards.sort((a, b) => a.value - b.value);
            console.log(sortedSelectedCards);
            if (
                !(this.state.selectedCards[0].rank === this.state.selectedCards[1].rank && this.state.selectedCards[0].rank === this.state.selectedCards[2].rank) &&
                !(sortedSelectedCards[0].value + 1 === sortedSelectedCards[1].value && sortedSelectedCards[0].value + 2 === sortedSelectedCards[2].value)
            ) {
                return true;
            }
        }
        else {
            return false;
        }
    };

    render() {
        return (
            <div className="play-container" style={{paddingTop: '75px'}}>
                <div className="header-container">
                    {this.state.playerWon && <h1>Congrats you won!!!!</h1>}
                    {this.state.opponentPlayerWon && <h1>Sorry you lost!!!!</h1>}
                    <div>Number of Players: {this.state.numOfPlayers}</div>
                    <div>{this.state.hostPlayer ? 'Please press the button to start the game.' : 'Please wait for the host to start the game.'}</div>
                    <Button disabled={!this.state.hostPlayer || this.state.numOfPlayers > 4} onClick={() => this.startGame()}>Start</Button>
                    {this.state.numOfPlayers > 4 && <div style={{color:'red'}}>Cannot exceed 4 players to start game.</div>}
                </div>
                {
                    this.state.gameInProgress &&
                    <div className="game-field">
                        <div className="last-played-cards">
                            <h5>Last played cards:</h5>
                            {this.state.lastPlayedCards.map(card => <Card key={`${card.suit}${card.rank}`}
                                                                          card={card}/>)}
                        </div>
                        <div className="my-hand">
                            <h5>My hand: {this.state.isMyTurn ? '[Your Turn]' : '[Opponent Turn]'}</h5>
                            {this.state.cards.map((card, i) => <Card key={`${card.suit}${card.rank}`} index={i}
                                                                     id={card.id} card={card}
                                                                     isSelected={this.state.selectedCards.some(selectedCard => card.suit === selectedCard.suit && card.rank === selectedCard.rank)}
                                                                     moveCard={(dragIndex, hoverIndex) => this.moveCard(dragIndex, hoverIndex)}
                                                                     handleSelectCard={(card) => this.selectCard(card)}/>)}
                        </div>
                        <Button disabled={this.isPlayCardsBtnDisabled()} onClick={() => this.playCards()}>Play
                            Cards</Button>
                        <Button disabled={!this.state.isMyTurn} onClick={() => this.skipTurn()}>Skip Turn</Button>
                        <Button disabled={isEqual(this.state.cards, this.state.cards.slice().sort((a, b) => a.firstCardValue - b.firstCardValue))} onClick={() => this.sortCards()}>Sort Cards</Button>
                    </div>
                }
                <div className='comment-section'>
                    <Comment.Group>
                        <Header as='h3' dividing>Comments</Header>
                        <Form>
                            <Form.Group>
                                <Form.Input placeholder='Name' value={this.state.playerName} onChange={(event, data) => this.setState({playerName: data.value})} width={2}/>
                                <Form.Input placeholder='Enter Message' value={this.state.messageText} onChange={(event, data) => this.setState({messageText: data.value})} width={8}/>
                                <Button disabled={!this.state.messageText || !this.state.playerName} onClick={() => this.sendMessage()} icon='send' content='Send'/>
                            </Form.Group>
                        </Form>
                    {
                        this.state.messages.sort((a, b) => b.date - a.date).map((message, i) =>
                            <Comment key={i}>
                                <Comment.Content>
                                    <Comment.Author as='span'>{message.playerName}</Comment.Author>
                                    <Comment.Metadata>
                                        {i === 0 && <Icon name='alarm'/>}
                                        <div>{moment(message.date).format('MMM DD, YYYY [at] hh:mma')}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{message.text}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )
                    }
                    </Comment.Group>
                </div>

                {/*<div style={{margin: '0em 3em 1em 0em', position: 'fixed', top: '80px', zIndex: 10,}}>*/}
                    {/*<Menu icon='labeled' vertical*/}
                          {/*style={{position: 'relative', left: '90vw',}}>*/}
                        {/*<Menu.Item><Icon name='twitter'/>Twitter</Menu.Item>*/}
                        {/*<Menu.Item><Icon name='facebook'/>Share</Menu.Item>*/}
                        {/*<Menu.Item><Icon name='mail'/>Email</Menu.Item>*/}
                    {/*</Menu>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Play);
