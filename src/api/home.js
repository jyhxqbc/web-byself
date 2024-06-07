import axios from "axios"


async function gethome() {
    const res = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/page/detail', {
            params: {
                pageId: 0
            }
        })
        // console.log(res.data.data)
        // console.log(res.data.data.key);
        // const picUrl = res.data.data.base64
        // const picKey = res.data.data.key
        // Toast('成功获取验证码')
    return res.data.data
}

export { gethome }