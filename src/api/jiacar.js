import axios from "axios"
import store from "@/store"
async function jiacar(obj) {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/cart/add', {
            goodsId: obj.goodsId,
            goodsNum: obj.goodsNum,
            goodsSkuId: obj.goodsSkuId,
        }, {
            headers: {
                'platform': 'H5',
                'Access-Token': store.getters.token,
            }
        })
        // console.log(store.getters.token)
    return rou
}
//购物车列表
async function chelist(obj) {
    const rou = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/cart/list', {
            headers: {
                'platform': 'H5',
                'Access-Token': store.getters.token,
            }
        })
        // console.log(store.getters.token)
    return rou
}
//加减数字
async function update(obj) {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/cart/update', {
            goodsId: obj.goodsId,
            goodsNum: obj.goodsNum,
            goodsSkuId: obj.goodsSkuId,
        }, {
            headers: {
                'platform': 'H5',
                'Access-Token': store.getters.token,
            }
        })
        // console.log(store.getters.token)
    return rou
}

async function del(x) {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/cart/clear', { cartIds: x }, {
            headers: {
                'platform': 'H5',
                'Access-Token': store.getters.token,
            }
        })
        // console.log(store.getters.token)
    return rou
}

async function jiesuan(obj) {
    const rou = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/checkout/order', {
            params: {
                delivery: 10,
                mode,
            }
        }, {
            headers: {
                'platform': 'H5',
                'Access-Token': store.getters.token,
            }
        })
        // console.log(store.getters.token)
    return rou
}
export { jiacar, chelist, update, del }