import {SNAKE_MOVE, RAT_GENERATE, CHANGE_DIRECTION, BUTTON_DISABLED, MODAL_VISIBLE, DIFFICULTY_GRADE} from './actionType';

const initialState = {
    snakeBody: [{
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
            }],
    currentDirection: '',
    ratTop: 74,
    ratLeft: 74,
    backgroundColor: 'rgb(0,0,0)',
    difficultyGrade: 50,
    isButtonDisabled: false,
    isModalVisible: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SNAKE_MOVE: {
            /*
                *不新返回一个数组或者说引用类型数据，redux认为状态没有变化，不会派发dispatch.
                *这可能是react-redux中shouldComponentUpdata对Props的浅比较引起的。
            */
            let snakeBody = action.snakeBody.filter(() => {return true});
            return {...state, snakeBody}
        }
        case RAT_GENERATE: {
            let ratTop = action.ratTop;
            let ratLeft = action.ratLeft;
            let backgroundColor = action.backgroundColor
            return {...state, ratTop, ratLeft, backgroundColor};
        }
        case CHANGE_DIRECTION: {
            let currentDirection = action.currentDirection;
            return {...state, currentDirection};
        }
        case BUTTON_DISABLED: {
            let isButtonDisabled = !state.isButtonDisabled;
            return {...state, isButtonDisabled};
        }
        case MODAL_VISIBLE: {
            let isModalVisible = !state.isModalVisible;
            return {...state, isModalVisible};
        }
        case DIFFICULTY_GRADE: {
            let difficultyGrade = action.difficultyGrade;
            return {...state, difficultyGrade};
        }
        default: {
            return state;
        }
    }
}