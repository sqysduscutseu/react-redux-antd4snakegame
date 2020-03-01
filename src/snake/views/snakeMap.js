import React, { Component } from 'react';

import './index.css';

import Snake from './snake';
import Rat from './rat';
import { snakeMove, ratGenerate, changeDirection, changeModalVisible, changeButton, changeDifficulty } from '../actions';
import { connect } from 'react-redux';
import DisplayPanel from './displayPanel';
import ScoreConfirm from './scoreConfirm';


class SnakeMap extends Component {

    timer = null;
    
    initializeGame = () => {
        let snakeBody = [{
            top: 0,
            left: 0
        },
        {
            top: 0,
            left: 1
        },
        {
            top: 0,
            left: 2
        }];
        let currentDirection = '';
        let ratTop = 74;
        let ratLeft = 74;
        let backgroundColor ='rgb(0,0,0)';
        this.props.onSnakeMove(snakeBody);
        this.props.onRatGenerate(ratTop, ratLeft, backgroundColor);
        this.props.onChangeDirection(currentDirection);
    }

    gameStart = () => {
        document.addEventListener("keydown", this.changePosition, false);
        let top = Math.floor(Math.random()*72);
        let left = Math.floor(Math.random()*72);
        let snakeBody = [
            {
                top,
                left
            },
            {
                top,
                left: left + 1
            },
            {
                top,
                left: left + 2
            },
        ]
        this.props.onSnakeMove(snakeBody);
        this.props.onChangeButton();
        this.generateRat();
    }

    changePosition = (e) => {
        let {currentDirection, difficultyGrade} = this.props,
        nextDirection = '';
        switch(e.keyCode){
            case 37:
                nextDirection = 'LEFT';
                break;
            case 38:
                nextDirection = 'UP';
                break;
            case 39:
                nextDirection = 'RIGHT';
                break;
            case 40:
                nextDirection = 'DOWN';
                break;
            default:
                return;
        }
        if(nextDirection){
            if( (nextDirection === 'LEFT' && currentDirection === 'RIGHT') ||
                (nextDirection === 'RIGHT' && currentDirection === 'LEFT') ||
                (nextDirection === 'UP' && currentDirection === 'DOWN') || 
                (nextDirection === 'DOWN' && currentDirection === 'UP')
            ){
                return;
            }else{
                clearInterval(this.timer);
                currentDirection = nextDirection;
                this.timer = setInterval(() => {
                    this.snakeGoForward(nextDirection);
                }, difficultyGrade);
                this.props.onChangeDirection(currentDirection);
            }
        }
    }

    // snakeGoForward = () => {
    //     let {snakeBody, currentDirection, ratTop ,ratLeft} = this.props;
    //     let {top, left} = snakeBody[0];
    //     let sankeHead = {};
    //     clearInterval(this.timer);
    //     this.timer = setInterval(() => {
    //         if(currentDirection === 'LEFT'){
    //             left = left - 1;
    //         }else if(currentDirection === 'RIGHT'){
    //             left = left + 1;
    //         }else if(currentDirection === 'UP'){
    //             top = top - 1;
    //         }else if(currentDirection === 'DOWN'){
    //             top = top + 1;
    //         } 
    //         sankeHead = {top, left};
    //         snakeBody.unshift(sankeHead);
    //         snakeBody.pop();
    //         if(snakeBody[0].top === ratTop && snakeBody[0].left === ratLeft){
    //             if(currentDirection === 'LEFT'){
    //                 left -= 1;
    //             }else if(currentDirection === 'RIGHT'){
    //                 left += 1;
    //             }else if(currentDirection === 'UP'){
    //                 top -= 1;
    //             }else if(currentDirection === 'DOWN'){
    //                 top += 1;
    //             }
    //             let snakeNewhead = {top, left};
    //             snakeBody.unshift(snakeNewhead);
    //             this.generateRat();
    //         }
    //         if(snakeBody[0].top < 0 || snakeBody[0].top > 74 || snakeBody[0].left < 0 || snakeBody[0].left > 74){
    //             this.snakeDie();
    //         }
    //         for(let i = 4; i < snakeBody.length - 1; i ++ ){
    //             if(snakeBody[0].top === snakeBody[i].top  && snakeBody[0].left === snakeBody[i].left){
    //                 this.snakeDie();
    //             }
    //         }
    //         /**
    //          * 此处必须完成改变蛇数组的所有操作之后才能调用onSnakeMove，不能把蛇运动功能和蛇吃鼠功能分开操作，这样两次调用onSnakeMove会冲突；
    //          * 如果试图用两个reducer操作一个store节点，更是不可取的，因为redux的原则就是一个reducer只能操作一个数据节点。
    //          */
    //         this.props.onSnakeMove(snakeBody);
    //     }, 50)
    // }

    snakeGoForward = (nextDirection) => {
        let {snakeBody, ratTop ,ratLeft} = this.props;
        let {top, left} = snakeBody[0];
        let sankeHead = {};
        if(nextDirection === 'LEFT'){
            left = left - 1;
        }else if(nextDirection === 'RIGHT'){
            left = left + 1;
        }else if(nextDirection === 'UP'){
            top = top - 1;
        }else if(nextDirection === 'DOWN'){
            top = top + 1;
        } 
        sankeHead = {top, left};
        snakeBody.unshift(sankeHead);
        snakeBody.pop();
        if(snakeBody[0].top === ratTop && snakeBody[0].left === ratLeft){
            if(nextDirection === 'LEFT'){
                left -= 1;
            }else if(nextDirection === 'RIGHT'){
                left += 1;
            }else if(nextDirection === 'UP'){
                top -= 1;
            }else if(nextDirection === 'DOWN'){
                top += 1;
            }
            let snakeNewhead = {top, left};
            snakeBody.unshift(snakeNewhead);
            this.generateRat();
        }
        if(snakeBody[0].top < 0 || snakeBody[0].top > 74 || snakeBody[0].left < 0 || snakeBody[0].left > 74){
            this.snakeDie();
        }
        for(let i = 4; i < snakeBody.length - 1; i ++ ){
            if(snakeBody[0].top === snakeBody[i].top  && snakeBody[0].left === snakeBody[i].left){
                this.snakeDie();
            }
        }
        /**
         * 此处必须完成改变蛇数组的所有操作之后才能调用onSnakeMove，不能把蛇运动功能和蛇吃鼠功能分开操作，这样两次调用onSnakeMove会冲突；
         * 如果试图用两个reducer操作一个store节点，更是不可取的，因为redux的原则就是一个reducer只能操作一个数据节点。
         */
        this.props.onSnakeMove(snakeBody);
    }
    
    snakeDie = () => {
        document.removeEventListener("keydown", this.changePosition, false);
       clearInterval(this.timer);
       this.showModal();
    }

    generateRat = () => {
        let {snakeBody, backgroundColor} = this.props;
        let r = Math.floor(Math.random()*222);
        let g = Math.floor(Math.random()*222);
        let b = Math.floor(Math.random()*222);
        backgroundColor = `rgb(${r},${g},${b})`;
        let ratTop = Math.floor(Math.random()*70);
        let ratLeft = Math.floor(Math.random()*70);
        for(let i in snakeBody){
            if(snakeBody[i].top === ratTop && snakeBody[i].left === ratLeft){
                let ratPositionIncrement = Math.floor(Math.random()*4);
                ratTop += ratPositionIncrement;
            }
        }
        this.props.onRatGenerate(ratTop, ratLeft, backgroundColor);
    }



    showModal = () => {
        this.props.onChangeModalVisible();
    }

    handleModal = () => {
        this.props.onChangeModalVisible();
        /**
         * 这里最初无法修改button的状态，后来发现是调用了gameStart，该函数内包含了修改button状态的操作，
         * 将状态又改回去了，修改了两次表现为没有变化~
         */
        this.props.onChangeButton();
        this.initializeGame();
        // this.gameStart();
    }

    render(){
        let {ratTop, ratLeft, backgroundColor, snakeBody, isModalVisible, isButtonDisabled} = this.props;
        return(
            <div className = 'map-wrap'>
                <ScoreConfirm score = {snakeBody.length - 3} visible = {isModalVisible} handleModal = {this.handleModal} />
                <DisplayPanel score = {snakeBody.length - 3} gameStart = {this.gameStart} isButtonDisabled = {isButtonDisabled} handleSpeed = {this.props.onChangeDifficulty} />
                <div className = 'map'>
                    <Snake snakeBody = {snakeBody} />
                    <Rat top = {ratTop * 8} left = {ratLeft * 8} backgroundColor = {backgroundColor} />
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        ...state.snake
    };
}

const mapDispatchToProp =  {
    
    onSnakeMove: snakeMove,
    onRatGenerate: ratGenerate,
    onChangeDirection: changeDirection,
    onChangeDifficulty: changeDifficulty,
    onChangeButton: changeButton,
    onChangeModalVisible: changeModalVisible
    
}

const SnakeMapContainer = connect(mapStateToProp, mapDispatchToProp)(SnakeMap);

export default SnakeMapContainer;