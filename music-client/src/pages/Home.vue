<template>
  <div class="home">
    <swiper />

    <div class="section" v-for="(item,index) in song" :key="'info-'+ index"><!-- 防止key相同 -->
      <div   class="section-title">{{item.name}} </div>
      <content-list1  :contentList="item.list"></content-list1>
    </div>

    <div class="section" v-for="(item,index) in songsList" :key="index">
      <div class="section-title">{{item.name}}</div>
      <content-list :contentList="item.list"></content-list>
    </div>
    
  </div>
</template>

<script>
import Swiper from "../components/Swiper";
import contentList from '../components/ContentList';
import contentList1 from '../components/ContentList1';
import {getAllSinger,getAllSongList,getAllSong,SongOfUserTJ,getTopSong} from '../api/index';
export default {
  name: 'home',
  components: {
    Swiper,
    contentList,
    contentList1,
  },
  data () {
    return {
      songsList: [
        {name:"歌单",list: []},
        {name:"歌手",list: []}
      ],
      song:
        [
          {name:"推荐歌曲",list: []},
        ],
    }
  },
  created () {
   this.getSongList();
   this.getSinger();
   this.getAllSong();
  },
  methods: {
    getSongList(){                      //获取前十条歌单
      getAllSongList().then((res) => {
        this.songsList[0].list = res.slice(0,10);
      }).catch((err) => {
        console.log(err);
      })
    },
    getSinger(){                      //获取前十名歌手
      getAllSinger().then((res) => {
        this.songsList[1].list = res.slice(0,10);
      }).catch((err) => {
        console.log(err);
      })
    },
    getAllSong(){                     //获取播放量前十或者推荐的歌曲
     let userid=this.$store.state.user.userId;
      console.log(userid)
      if(userid==""){
     getTopSong().then((res)=>{//展示播放量最大的十首歌曲
       this.song[0].list=res.slice(0,10);
     }).catch((err) => {
        console.log(err);
    })
    }
    else{
      SongOfUserTJ(userid).then((res)=>{
       this.song[0].list=res.slice(0,5);
       }    
      ).catch((err) => {
        console.log(err);
      })
  }}
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
