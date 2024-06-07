import axios from "axios"
async function getclass() {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/category/list', {
        headers: {
            'platform': 'H5'
        }
    })
    return rou
}
export { getclass }