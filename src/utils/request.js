import axios from "axios"


async function getPicCode() {
    const res = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/captcha/image')
    console.log(res.data.data)
        // console.log(res.data.data.key);
        // const picUrl = res.data.data.base64
        // const picKey = res.data.data.key
    return { picUrl: res.data.data.base64, picKey: res.data.data.key }
}
export { getPicCode }