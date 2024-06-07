<template>
    <div class="prodetail">
      <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />
  
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
        </van-swipe-item>
  
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
        </template>
      </van-swipe>
  
      <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售 {{ detail.goods_sales }} 件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>
  
        <div class="service">
          <div class="left-words">
            <span><van-icon name="passed" />七天无理由退货</span>
            <span><van-icon name="passed" />48小时发货</span>
          </div>
          <div class="right-icon">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
  
      <!-- 商品评价 -->
      <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ com.length }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in com" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>
  
      <!-- 商品描述 -->
      <div class="desc">
        <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/kHgx21fZMWwqirkMhawkAw.jpg" alt="">
        <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/0rRMmncfF0kGjuK5cvLolg.jpg" alt="">
        <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/2P04A4Jn0HKxbKYSHc17kw.jpg" alt="">
        <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/MT4k-mPd0veQXWPPO5yTIw.jpg" alt="">
      </div>
  
      <!-- 底部 -->
      <div class="footer">
        <div class="icon-home" @click="$router.push('/home')">
          <van-icon name="wap-home-o" />
          <span>首页</span>
        </div>
        <div class="icon-cart">
          <span v-if="biao > 0" class="num">{{ biao }}</span>
          <van-icon name="shopping-cart-o" />
          <span @click="$router.push('/shopcar')">购物车</span>
        </div>
        <div class="btn-add" @click="jia">加入购物车</div>
        <div class="btn-buy" @click="mai">立刻购买</div>
      </div>
          <!-- 加入购物车弹层 -->
    <van-action-sheet v-model="show" :title="mode==='che'? '加入购物车':'立刻购买'">
        <div class="product">
    <div class="product-title">
      <div class="left">
        <img :src="detail.goods_image" alt="">
      </div>
      <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
    </div>
    <div class="num-box">
      <span>数量</span>
      <CountBox v-model="addCount"></CountBox>
    </div>
    <div class="showbtn" v-if="true">
      <div class="btn" v-if="mode==='che'" @click="gouwuche">加入购物车</div>
      <div class="btn now" v-else @click="buy">立刻购买</div>
    </div>
    <div class="btn-none" v-else>该商品已抢完</div>
  </div>
    </van-action-sheet>
    </div>


  </template>
  
  <script>
  import { getinfo ,getcom,getsever} from "@/api/info";
import { jiacar } from "@/api/jiacar"
  import defaultImg from '@/assets/default-avatar.png'
  import CountBox from "@/components/CountBox.vue";
 
  export default {
    name: 'ProDetail',
    data () {
      return {
        images: [],
        current: 0,
        detail:{},
        com:'',
        defaultImg,
        show:false,
        mode:'',
        addCount:1,
        // gou:false
        // num:''
        id:'',
        biao:''

      }
    },
    components:{
        CountBox
    },
    computed:{

    },
    async created(){
        const res =await getinfo(this.$route.params.id)
        console.log(res.data.data.detail);
        // console.log(this.$route.params.id);
        this.detail=res.data.data.detail
        this.images = this.detail.goods_images
        const res1 =await getcom(this.$route.params.id)
        console.log(res1.data.data.list);
        this.com=res1.data.data.list
        const res2 =await getsever(this.$route.params.id)
        console.log(res2.data.data.list);
        console.log(this.num);
        this.id=this.$route.params.id
    },
    methods: {
      onChange (index) {
        this.current = index
      },
      jia(){
        this.mode='che'
        this.show=true
      },
      mai(){
        this.mode='mai'
        this.show=true
      },
      async gouwuche(){
        if (!this.$store.getters.token){
            this.$dialog.confirm({
                title: '提示',
                message: '需要登录才能进行此操作',
                confirmButtonText:'去登陆',

                })
                .then(() => {
                    this.$router.replace({
                        path:'/login',
                        query:{
                            backUrl:this.$route.fullPath
                        }
                    })
                    
                })
                .catch(() => {
                    
                });
                
        }else{
            // this.$router.push('/shopcar')
            this.show=false
            console.log(this.id);
            const obj={
              goodsId: this.id,
              goodsNum: this.addCount,
              goodsSkuId:this.detail.skuList[0].goods_sku_id
            }
            const res=await jiacar(obj)
            console.log(res);
            this.biao=res.data.data.cartTotal
        }

      },
      buy(){
        if (!this.$store.getters.token){
            this.$dialog.confirm({
                title: '提示',
                message: '需要登录才能进行此操作',
                confirmButtonText:'去登陆',

                })
                .then(() => {
                    this.$router.replace({
                        path:'/login',
                        query:{
                            backUrl:this.$route.fullPath
                        }
                    })
                })
                .catch(() => {
                    
                });
        }
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .prodetail {
    padding-top: 46px;
    ::v-deep .van-icon-arrow-left {
      color: #333;
    }
    img {
      display: block;
      width: 100%;
    }
    .custom-indicator {
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding: 5px 10px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 15px;
    }
    .desc {
      width: 100%;
      overflow: scroll;
      ::v-deep img {
        display: block;
        width: 100%!important;
      }
    }
    .info {
      padding: 10px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      .now {
        color: #fa2209;
        font-size: 20px;
      }
      .oldprice {
        color: #959595;
        font-size: 16px;
        text-decoration: line-through;
        margin-left: 5px;
      }
      .sellcount {
        color: #959595;
        font-size: 16px;
        position: relative;
        top: 4px;
      }
    }
    .msg {
      font-size: 16px;
      line-height: 24px;
      margin-top: 5px;
    }
    .service {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      margin-top: 10px;
      font-size: 16px;
      background-color: #fafafa;
      .left-words {
        span {
          margin-right: 10px;
        }
        .van-icon {
          margin-right: 4px;
          color: #fa2209;
        }
      }
    }
  
    .comment {
      padding: 10px;
    }
    .comment-title {
      display: flex;
      justify-content: space-between;
      .right {
        color: #959595;
      }
    }
  
    .comment-item {
      font-size: 16px;
      line-height: 30px;
      .top {
        height: 30px;
        display: flex;
        align-items: center;
        margin-top: 20px;
        img {
          width: 20px;
          height: 20px;
        }
        .name {
          margin: 0 10px;
        }
      }
      .time {
        color: #999;
      }
    }
  
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 55px;
      background-color: #fff;
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .icon-home, .icon-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        .van-icon {
          font-size: 24px;
        }
      }
      .btn-add,
      .btn-buy {
        height: 36px;
        line-height: 36px;
        width: 120px;
        border-radius: 18px;
        background-color: #ffa900;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
      .btn-buy {
        background-color: #fe5630;
      }
    }
    .product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

        .num-box {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            align-items: center;
        }

        .btn, .btn-none {
        height: 40px;
            line-height: 40px;
            margin: 20px;
            border-radius: 20px;
            text-align: center;
            color: rgb(255, 255, 255);
            background-color: rgb(255, 148, 2);
        }
        .btn.now {
            background-color: #fe5630;
        }
        .btn-none {
            background-color: #cccccc;
        }
}
  }
      
  .tips {
    padding: 10px;
  }
  .footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
  </style>