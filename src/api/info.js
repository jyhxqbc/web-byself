import axios from "axios"
async function getinfo(id) {
    const rou = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/goods/detail', {
        params: {
            goodsId: id
        },
    }, {
        headers: {
            'platform': 'H5'
        }
    })
    return rou
}

//获取评论

async function getcom(id) {
    const rou = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/comment/listRows', {
        params: {
            goodsId: id,
            limit: 3
        },
    }, {
        headers: {
            'platform': 'H5'
        }
    })
    return rou
}

async function getsever(id) {
    const rou = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/goods.service/list', {
        params: {
            goodsId: id,
        },
    }, {
        headers: {
            'platform': 'H5'
        }
    })
    return rou
}
export { getinfo, getcom, getsever }