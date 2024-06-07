<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请在此输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img :src=res.items[1].data[0].imgUrl alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img :src=res.items[1].data[1].imgUrl alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img :src=res.items[1].data[2].imgUrl alt="" />
      </van-swipe-item>
    </van-swipe>

    <!-- 导航 -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        v-for="(item,index) in res.items[3].data"
        :key="index"
        :icon=item.imgUrl
        :text=item.text
        @click="$router.push('/fenlei')"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img :src=res.items[4].data[0].imgUrl alt="" />
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <!-- <NiHao></NiHao> -->
        <GoodsItem v-for="(item) in res.items[6].data" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>
  

  


<script>
import GoodsItem from "@/components/GoodsItem.vue"
import { gethome } from '@/api/home'
import Vue from 'vue'
Vue.component('GoodsItem', GoodsItem)
export default {
  name: 'HomePage',
  data () {
    return {
      res: ''
    }
  },
  components: {
    GoodsItem,
    // NiHao
  },
  async created () {
    const res = await gethome()
    console.log(res)
    this.res = res.pageData
  },
  mounted () {

  },
  methods: {

  },
  components: {

  }
};
</script>

<style scoped lang="less">
// 主题 padding
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
.goods-item {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
</style>
