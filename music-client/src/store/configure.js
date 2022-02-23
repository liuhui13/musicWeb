const configure = {
    state:{
        HOST: 'http://127.0.0.1:8083',  //后台访问地址根目录
        activeName: '',                  //当前选中的菜单名
        showAside: false,               //是否显示播放中的歌曲列表
        loginIn: false,                 //用户是否已登录
        isActive: false,                //当前歌曲是否已收藏
        shoucangUrl:'#icon-liuhui-shoucang',//当前歌曲收藏的图标
    },
    getters: {
        activeName: state => {
            let activeName = state.activeName
            if(!activeName){
                activeName = JSON.parse(window.sessionStorage.getItem('activeName')) 
            }
            return activeName
        },
        showAside: state => {
            let showAside = state.showAside
            if(!showAside){
                showAside = JSON.parse(window.sessionStorage.getItem('showAside')) 
            }
            return showAside
        },
        loginIn: state => {
            let loginIn = state.loginIn
            if(!loginIn){
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn')) 
            }
            return loginIn
        },
        isActive: state => {
            let isActive = state.isActive
            if(!isActive){
                isActive = JSON.parse(window.sessionStorage.getItem('isActive')) 
            }
            return isActive
        },  
        shoucangUrl: state => {
            let shoucangUrl = state.shoucangUrl
            if(!shoucangUrl){
                shoucangUrl = JSON.parse(window.sessionStorage.getItem('shoucangUrl')) 
            }
            return shoucangUrl
        },             
},
    mutations: {
        setActiveName: (state,activeName) => {
            state.activeName = activeName
            window.sessionStorage.setItem('activeName',JSON.stringify(activeName))
        },
        setShowAside: (state,showAside) => {
            state.showAside = showAside
            window.sessionStorage.setItem('showAside',JSON.stringify(showAside))
        },
        setLoginIn: (state,loginIn) => {
            state.loginIn = loginIn
            window.sessionStorage.setItem('loginIn',JSON.stringify(loginIn))
        },
        setIsActive: (state,isActive) => {
            state.isActive = isActive
            window.sessionStorage.setItem('isActive',JSON.stringify(isActive))
        },
        setShoucangUrl:(state,shoucangUrl) => {
            state.shoucangUrl = shoucangUrl
            window.sessionStorage.setItem('shoucangUrl',JSON.stringify(shoucangUrl))
        },
        
    }
}

export default configure