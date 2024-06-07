import { chelist, update, del } from "@/api/jiacar";
import { Toast } from "vant"
export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        setlist(state, x) {
            state.cartList = x
        },
        xuan(state, x) {
            const goods = state.cartList.find(y => y.goods_id === x)
            goods.ischecked = !goods.ischecked
        },
        quan(state, all) {
            state.cartList.map(x => x.ischecked = all)
        },
        // gai(state, { goodsId, value }) {
        //     const obj = state.cartList.find(item => item.goods_id === goodsId)
        //     obj.goods_num = value
        // }
    },
    actions: {
        async getcarlist(state) {
            const res = await chelist()
                // console.log(res.data.data.list);
                // const list = res.data.data.list
            res.data.data.list.forEach(x => {
                x.ischecked = false
            });
            state.commit('setlist', res.data.data.list);
        },
        async up(state, obj) {
            // const { goodsId, value, skuId } = obj
            // state.commit('gai', {
            //     goodsId,
            //     value
            // })
            const res = await update(obj)
        },
        async shan(state) {
            const list = state.getters.selCartList
            const cartid = list.map(x => x.goods_id)
            console.log(cartid);
            const res = await del(cartid)
            console.log(res);
            Toast(res.data.message)
            state.dispatch('getcarlist')
        }
    },
    getters: {
        // 求所有的商品累加总数
        cartTotal(state) {
            return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
        },
        // 选中的商品项
        selCartList(state) {
            return state.cartList.filter(item => item.ischecked)
        },
        // 选中的总数
        selCount(state, getters) {
            return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
        },
        // 选中的总价
        selPrice(state, getters) {
            return getters.selCartList.reduce((sum, item) => {
                return sum + item.goods_num * item.goods.goods_price_min
            }, 0).toFixed(2)
        },
        //全选
        all(state) {
            return state.cartList.every(x => x.ischecked)
        }
    }
}