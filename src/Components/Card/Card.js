import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { rankMap } from '../../Constants';
import './Card.css';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
};

const cardTarget = {
    hover(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) return;
        props.moveCard(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};

class Card extends Component {

    rankMap = rankMap;

    selectCard = () => {
        if(this.props.handleSelectCard) {
            this.props.handleSelectCard(this.props.card);
        }
    };

    render() {

        const {
            connectDragSource,
            connectDropTarget,
            isSelected,
            backCard,
            card
        } = this.props;
        const imagePath = !backCard && require(`./assets/card${card.suit}${this.rankMap[card.rank]}.png`);

        return connectDragSource(
            connectDropTarget(<span className={isSelected ? 'selected-card' : 'unselected-card'} onClick={() => this.selectCard()}>
                {backCard ? <img src={require('./assets/cardBack_blue1.png')} alt=''/> : <img src={imagePath} alt=''/>}
            </span>
        ),);
    }
}

export default DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Card));

Card.propTypes = {
    backCard: PropTypes.bool,
    isSelected: PropTypes.bool,
    card: PropTypes.object,
    handleSelectCard: PropTypes.func,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func
};