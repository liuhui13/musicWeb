const singer = {
    state:{
        numSinger:'', //歌手数量（我的音乐-我的歌手数量）
        
    },
    getters: {
        numSinger: state => {
            let numSinger = state.numSinger;
            if(!numSinger.length){
                numSinger = JSON.parse(window.sessionStorage.getItem('numSinger')||null); 
            }
            return numSinger;
        },
    },
    mutations: {
        setNumSinger: (state,numSinger) => {
            state.numSinger = numSinger;
            window.sessionStorage.setItem('numSinger',JSON.stringify(numSinger));
        },    
    }
}

export default singer