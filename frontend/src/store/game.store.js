import router from './../router/index'
import { io } from 'socket.io-client'

export default {
    state: {
        gameState: {}, 
        socket: null, 
        jointoken: null
    }, 
    mutations: {
        updateGameState(state, gameState){
            state.gameState = gameState
        }, 
        setSocket(state, socket){
            
            state.socket = socket
        }, 
        closeSocket(state){
            if(state.socket?.connected){
                state.socket.onclose = f => f
                state.socket.disconnect()
            }
        }, 
        setJoinToken(state, joinToken){
            state.joinToken = joinToken
        }
    }, 
    actions: {
        connectWs({commit, dispatch, state}){
            commit('closeSocket')
            const socket = io('games.simplyfred.de', {
                transports: ['websocket'], 
                path: '/gamews', 
                auth: {token: state.joinToken}
            })

            socket.on('set-state', state => {
                commit('updateGameState', JSON.parse(state))
            })

            socket.onclose = () => {
                router.push({name: 'GetStarted'})
                dispatch('alert', {message: 'An error occured', type: 'danger'})
            }

            commit('setSocket', socket)
        }, 
        emit({state}, {method, params}){
            state.socket.emit(method, JSON.stringify(params))
        }
    },
    getters: {
        gameState(state){
            return state.gameState
        }, 
        key(state){
            return state.gameState?.key || ''
        }, 
        playerList(state){
            return state.gameState.playerlist || []
        }
    }
}