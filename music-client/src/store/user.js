const user = {
    state:{
        userId: '',                 //用户id
        name: '',               //用户账号
        avator: '',               //用户头像
    },
    getters: {
        userId: state => {
            let userId = state.userId
            if(!userId){
                userId = JSON.parse(window.sessionStorage.getItem('userId')) 
            }
            return userId
        },
        name: state => {
            let name = state.name
            if(!name){
                name = JSON.parse(window.sessionStorage.getItem('name')) 
            }
            return name
        },
        avator: state => {
            let avator = state.avator
            if(!avator){
                avator = JSON.parse(window.sessionStorage.getItem('avator')) 
            }
            return avator
        }
        
    },
    mutations: {
        setUserId: (state,userId) => {
            state.userId = userId
            window.sessionStorage.setItem('userId',JSON.stringify(userId))
        },
        setUsername: (state,name) => {
            state.name = name
            window.sessionStorage.setItem('name',JSON.stringify(name))
        },
        setAvator: (state,avator) => {
            state.avator = avator
            window.sessionStorage.setItem('avator',JSON.stringify(avator))
        }
    }
}

export default user