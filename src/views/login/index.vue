<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" left-text="返回"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="phone" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msg" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getcode">{{ totalsecond===second? '获取验证码' :second+'秒后重新发送'}}</button>
        </div>
      </div>

      <div @click="denglu" class="login-btn">登录</div>
      <div>{{ userinfo }}</div>
      
    </div>
  </div>
</template>


<script>
// import request from '@/utils/request'
import axios from "axios"
import { getmsg ,getPicCode,login} from "@/api/login";
import { mapMutations, mapState } from "vuex"
export default {
  data () {
  return {
    picCode:'',
    picUrl: '',
    picKey: '',
    phone:'',
    totalsecond:20,
    second:20,
    timer:null,
    msg:'',
    rcode:'',
    // uid:'',
    // token:'',


  }
  },
  computed:{
    ...mapState('user',['userinfo'])
  },

  name: 'LoginPage',
  async created(){
    // this.getPicCode()
    const a = await getPicCode()
    this.picUrl= a.picUrl
    this.picKey=a.picKey
    // this.$toast.success('ninin');


  },
  methods: {
    ...mapMutations('user',['getuser']),
  // 获取图形验证码
      async getPicCode() {
        // const res = await axios.get('http://smart-shop.itheima.net/index.php?s=/api/captcha/image')
        // console.log(res.data.data)
        // // console.log(res.data.data.key);
        // this.picUrl = res.data.data.base64
        // this.picKey = res.data.data.key

    },
    async getcode(){
      if(this.yanzheng()){
        //开始获取验证码
        if (!this.timer && this.totalsecond===this.second){
          const mes=await getmsg(this.picCode,this.picKey,this.phone)
          // console.log(mes.data.message.slice(-6));
          if(mes.status===200){
            this.$toast('短信验证码发送成功')
            this.rcode=mes.data.message.slice(-6)
          }else{
            this.$toast('验证码输入错误')
          }
          
          this.timer=setInterval(() => {
          this.second--
          if (this.second===0){
          clearInterval(this.timer)
          this.timer=null
          this.second=this.totalsecond
          }
          }, 1000);
        } 
      }
    },

    yanzheng(){
      if (!/^1[3-9]\d{9}$/.test(this.phone)){
        this.$toast('请输入正确手机号码')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
      this.$toast('请输入正确的图形验证码')
      return false
    }
    return true
    },
    //登录
    async denglu(){
      if (!this.yanzheng() || this.msg!=this.rcode){
        this.$toast('手机验证码错误')
        return 
      }else{
          const res=await login({code:this.msg,phone:this.phone})  
          this.$toast(`${res.data.message}`)
          const url=this.$route.query.backUrl || '/'
          // this.uid=res.data.data.userId
          // this.token=res.data.data.token
          this.$store.commit('user/getuser',{userId:res.data.data.userId,token:res.data.data.token})
          console.log(res.data.data);
          // this.$router.push('/my')
          this.getuser({userId:res.data.data.userId,token:res.data.data.token})
          this.$router.push(url)

      }

    }

},
destroyed(){
  clearInterval(this.timer)
}
}


</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>