import { getinfo, setinfo, delinfo } from "@/utils/storage"
export default {
    namespaced: true,
    state () {
        return { //个人权证
            userinfo: getinfo()
        }
    },
    getters: {},
    mutations: {
        getuser (state, obj) {
            state.userinfo = obj
            delinfo()
            setinfo(obj)
        }
    },
    actions: {},
    modules: {}
}