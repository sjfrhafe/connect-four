export default {
    state: {
        me: {name: ''}
    }, 
    mutations: {
        setMe(state, me){
            state.me = me
        }
    }, 
    actions: {
        fetchMe({commit}){
            fetch('/api/player/me')
                .then(data => data.json())
                .then(data => commit('setMe', data))
                .catch(console.error)
        }
    }, 
    getters: {
        me(state){
            return state.me
        }
    }
}