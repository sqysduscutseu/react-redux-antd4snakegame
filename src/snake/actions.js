import {SNAKE_MOVE, RAT_GENERATE, CHANGE_DIRECTION, MODAL_VISIBLE, BUTTON_DISABLED, DIFFICULTY_GRADE} from './actionType';

export const snakeMove = (snakeBody) => ({
    type: SNAKE_MOVE,
    snakeBody: snakeBody
})

export const ratGenerate = (ratTop, ratLeft, backgroundColor) => ({
    type: RAT_GENERATE,
    ratTop: ratTop,
    ratLeft: ratLeft,
    backgroundColor: backgroundColor
})

export const changeDirection = (currentDirection) => ({
    type: CHANGE_DIRECTION,
    currentDirection: currentDirection
})

export const changeModalVisible = () => ({
    type: MODAL_VISIBLE
})

export const changeButton = () => ({
    type: BUTTON_DISABLED
})

export const changeDifficulty = (difficultyGrade) => ({
    type: DIFFICULTY_GRADE,
    difficultyGrade: difficultyGrade
})