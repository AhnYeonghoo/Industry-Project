import { configureStore , createSlice} from '@reduxjs/toolkit'

let user_info = createSlice({
    name : 'user_info',
    initialState : {name : '이준석', score : 185, rank : 11}
})

//게임 상태 관리 gametype : 게임 종류, type1은 단어고르기 4번, 2는 직접하기 2번  / score : 현재점수  / heart : 남은목숨
let game_state = createSlice({
    name : 'game_state',
    initialState : {gametype : 1, score : 0, heart : 3, num : 6},
    reducers : {
        changetype1(state){
            state.gametype = 1
        },
        changetype2(state){
            state.gametype = 2
        },
        changeheart(state){
            state.heart -= 1
        },
        // fullheart(state){
        //     state.heart = 3
        // },
        // zeroscore(state){
        //     state.score = 0
        // },
        reset(state){
            state.heart = 3
            state.score = 0
            state.num = 6
            state.gametype = 1
        },
        correct(state){
            state.num -= 1
            state.score += 20
        },
        wrong(state){
            state.num -= 1
            state.score -= 10
            state.heart -= 1
        }
    }
})


let quiz_type1 = createSlice({
    name : 'quiz_type1',
    initialState : { num : 1,  answer : '나무', }
})

export let { changetype1, changetype2 , changeheart , correct, wrong, reset} = game_state.actions

export default configureStore({
  reducer: { 
    user_info : user_info.reducer,
    game_state : game_state.reducer,
    quiz_type1 : quiz_type1.reducer
  }
}) 