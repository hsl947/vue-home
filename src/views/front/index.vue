<template>
  <div>
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="open = !open">
        <i class="iconfont icon-caidan"></i>
      </mu-button>
      <span>Shaoli's Blog</span>
    </mu-appbar>
    <mu-load-more class="pt70" :loading="loading" @load="load" :loaded-all="finished">
      <mu-paper :z-depth="1" class="demo-list-wrap" ref="container">
        <mu-list textline="three-line" v-for="item in testData" :key="item._id">
          <mu-sub-header>{{item.time | formatTime}}</mu-sub-header>
          <mu-list-item button @click="toDetail(item._id)">
            <mu-list-item-content>
              <mu-list-item-title v-text="item.title"></mu-list-item-title>
              <mu-list-item-sub-title v-text="item.description"></mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <p class="no-data" v-if="finished">- 我也是有底线的 -</p>
      </mu-paper>
    </mu-load-more>
    <mu-drawer :open.sync="open" :docked="false" :left="true">
      <mu-list>
        <mu-list-item button :to="'/'">
          <mu-list-item-title>首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button :to="'/admin'">
          <mu-list-item-title>Admin后台首页</mu-list-item-title>
        </mu-list-item>
        <!-- <mu-list-item button :to="'/chat_login'">
          <mu-list-item-title>测试聊天</mu-list-item-title>
        </mu-list-item> -->
        <mu-list-item button target="_blank" href="https://www.hongshaoli.cn/">
          <mu-list-item-title>关于我</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-button id="toTop" button class="mu-button mu-fab-button mu-inverse">
      <div class="mu-button-wrapper">
        <div class="mu-ripple-wrapper"></div>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </mu-button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      open: false,
      testData: [],
      loading: false,
      finished: false,
      formData: {
        page: 1,
        limit: 20
      }
    }
  },
  components: {

  },
  methods: {
    getData() {
      this.$axios.post('/list', this.formData).then((_data)=> {
          if(_data.data.length == 0){
            this.finished = true;
            return;
          }
          this.testData = this.testData.concat(_data.data);
          this.loading = false;
          console.log(this.testData);
      });
    },
    load () {
      this.formData.page++,
      this.loading = true;
      this.getData();
    },
    toDetail(id) {
      this.$router.push({
        path: `/detail`,
        query: {_id: id},
      });
    },
    initTimer() {
      var timer1, timer2, timer3;
      var toTop = document.getElementById("toTop");
      window.onscroll = function () { 
        if (timer1) clearTimeout(timer1);
        timer1 = setTimeout(function() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 300) { 
              toTop.style.bottom = "16px"; 
            }else { 
              toTop.style.bottom = "-80px"; 
            } 
            if(scrollTop > 0){
              sessionStorage.setItem('scrollY', scrollTop);
            }
        }, 300);
      }
      toTop.onclick = function(){
        if (timer2) clearTimeout(timer2);
        timer2 = setTimeout(function() {
            window.scrollTo(0, 0);
            clearInterval(timer1);
        }, 50);
      }

      let initTop = sessionStorage.getItem('scrollY');
      timer3 = setTimeout(()=>{
        window.scroll(0, initTop);
        clearInterval(timer3);
      }, 500)
    },
    initWebsocket() {
      const ws = new WebSocket("ws://localhost:8888");
      ws.onopen = ()=> {
          console.log("Opened");
          ws.send("I'm client");
      };
      ws.onmessage = (evt)=> {
          console.log('----------------');
          console.log(evt.data);
      };
      ws.onclose = ()=> {
          console.log("Closed");
      };
      ws.onerror = (err)=> {
          console.log(err);
      };
      function isGt10(v){
        return v<10?'0'+v:v;
      }
      setInterval(()=>{
          let now = new Date();
          ws.send('该消息发送于--'+isGt10(now.getHours()) + ':'+isGt10(now.getMinutes())+ ':'+isGt10(now.getSeconds()));
      }, 5000)
    }
  },
  created() {

  },
  mounted() {
    this.getData();

    this.initTimer();

    //this.initWebsocket();
  }
};
</script>

<style scoped>
  .mu-paper{
    background: none;
  }
  .mu-drawer{
    background: #fff;
  }
  .mu-list{
    padding-bottom: 0;
    margin-bottom: 8px;
    background: #fff;
  }
  .mu-list>li{
    border-bottom: solid 1px rgba(0,0,0,.12);
  }
  .no-data{
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
  }
  #toTop{
    user-select: none;
    outline: none;
    -webkit-appearance: none;
    background-color: #2196f3;
    position: fixed;
    right: 16px;
    bottom: -80px;
    z-index: 101;
    min-width:56px;
    transition: all .3s;
  }
</style>
