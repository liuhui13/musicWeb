import Vue from 'vue'
import Vuex from 'vuex'
import configure from './configure'
import user from './user'
import song from './song'
import singer from './singer'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        configure,
        user,
        song,
        singer
    }
})

export default store