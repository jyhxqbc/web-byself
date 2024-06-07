import axios from "axios"
async function getgoodlist(obj) {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/goods/list', {
        params: {
            categoryId: obj.categoryId,
            goodsName: obj.goodsName,
            page: obj.page,
        }
    }, {
        headers: {
            'platform': 'H5'
        }
    })
    return rou
}
export { getgoodlist }