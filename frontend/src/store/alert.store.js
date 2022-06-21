export default {
    state: {
        alerts: [], 
        lastId: 0
    }, 
    mutations: {
        addAlert(state, {message, type}){
            const id = state.lastId++
            state.alerts.push({message, id, type})
            setTimeout(() => {
                state.alerts = state.alerts.filter(alert => id !== alert.id)
            }, 2000)
        }
    }, 
    actions: {
        alert({commit}, {message, type}){
            commit('addAlert', {message, type})
        }
    }, 
    getters: {
        alerts(state){
            return state.alerts
        }
    }
}