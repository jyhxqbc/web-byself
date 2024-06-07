import axios from "axios"
// import { Toast } from "@/utils/vant-ui";
import { Toast } from 'vant';


//获取图形验证码
async function getPicCode() {
    const res = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/captcha/image')
        // console.log(res.data.data)
        // console.log(res.data.data.key);
        // const picUrl = res.data.data.base64
        // const picKey = res.data.data.key
        // Toast('成功获取验证码')
    return { picUrl: res.data.data.base64, picKey: res.data.data.key }

}
export { getPicCode }
//获取短信验证码
async function getmsg(a, b, c) {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/captcha/sendSmsCaptcha', {
        from: {
            captchaCode: a,
            captchaKey: b,
            mobile: c
        }
    })
    return rou
}
export { getmsg }
//登录接口

async function login(obj) {
    const rou = await axios.post('http://smart-shop.itheima.net/index.php?s=/api/passport/login', {
        "form": {
            "smsCode": obj.code,
            "mobile": obj.phone,
            "isParty": false,
            "partyData": {}
        }
    }, {
        headers: {
            'platform': 'H5'
        }
    })
    return rou
}
export { login }