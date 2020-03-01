import React from 'react';
import {Row, Col, Button, Statistic, Radio, Icon} from 'antd';

const DisplayPanel = (props) => {
    let {score, gameStart, isButtonDisabled, handleSpeed} = props;
    return(
        <div className = 'displayPanel-wrap'>
            <Row>
                <Col span = {4}></Col>
                <Col className = 'btn-lay' span = {4}>
                    <Button type = 'primary' size = 'large' onClick = {gameStart} disabled = {isButtonDisabled} ><Icon type="play-circle" />START</Button>
                </Col>
                <Col className = 'radio-lay' span = {6}>
                    <Radio.Group defaultValue = 'n' size = 'large' buttonStyle = 'solid' disabled = {isButtonDisabled}>
                        <Radio.Button value = 's' onClick = {() => {handleSpeed(80)}}>蜗牛蛇</Radio.Button>
                        <Radio.Button value = 'n' onClick = {() => {handleSpeed(50)}}>草蛇</Radio.Button>
                        <Radio.Button value = 'f' onClick = {() => {handleSpeed(20)}}>闪电蛇</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col className = 'score-lay' span = {8}>
                    <Statistic title = '你吃了' value = {`${score}坨`} />
                </Col>
            </Row> 
        </div>
    )
}

export default DisplayPanel;