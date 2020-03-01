import React from 'react';
import { Modal } from 'antd';

const ScoreConfirm = (props) => {
    let {score, visible, handleModal} = props;
    if(score === 0){
        return(
            <div>
                <Modal
                    title = '歪去？'
                    visible = {visible}
                    onOk = {handleModal}
                    onCancel = {handleModal} >
                        <h2>哥们儿，</h2><br />
                        <p>你倒是吃上一坨呀~~~</p>
                </Modal>
            </div>
        )
    }else if(score < 10 && score > 0){
        return(
            <div>
                <Modal
                    title = '你瞎呀？'
                    visible = {visible}
                    onOk = {handleModal}
                    onCancel = {handleModal} >
                        <h2>弱鸡，</h2><br />
                        <p>才吃了{score}坨~~~</p>
                </Modal>
            </div>
        )
    }else if(score >= 10 && score < 30){
        return(
            <div>
                <Modal
                    title = '眼花了？'
                    visible = {visible}
                    onOk = {handleModal}
                    onCancel = {handleModal} >
                        <h2>哎呦，不错</h2><br />
                        <p>小伙子吃了{score}坨~~~</p>
                </Modal>
            </div>
        )
    }else if(score >= 30 && score < 50){
        return(
            <div>
                <Modal
                    title = '手残了？'
                    visible = {visible}
                    onOk = {handleModal}
                    onCancel = {handleModal} >
                        <h2>少侠，高手</h2><br />
                        <p>竟然吃了{score}坨~~~</p>
                </Modal>
            </div>
        )
    }else{
        return(
            <div>
                <Modal
                    title = '撑着了？'
                    visible = {visible}
                    onOk = {handleModal}
                    onCancel = {handleModal} >
                        <h2>大神，佩服</h2><br />
                        <p>你已吃了{score}坨~~~</p>
                </Modal>
            </div>
        )
    }
}

export default ScoreConfirm;