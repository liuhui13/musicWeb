<template>
    <div class="content">
       <h1 class="title">
           <slot name="title"></slot>
           <hr/>
       </h1>
       <ul>
           <li>
               <div class="song-item">
                   <span class="item-index"></span>
                   <span class="item-title">歌曲名</span>
                   <span class="item-title">时长</span>
                   <span class="item-name">歌手</span>
                   <span class="item-intro">专辑</span>
               </div>
           </li>
           <li v-for="(item,index) in songList" :key="index">
               <div class="song-item" @click="toplay(item.id,item.url,item.pic,index,item.name,item.lyric)">
                   <span class="item-index">
                       {{index + 1}}
                   </span>
                   <span class="item-title">{{replaceFName(item.name)}}</span>
                   <span class="item-title">{{formatSeconds(item.songTime)}}</span>
                   
                   <span class="item-name">{{replaceLName(item.name)}}</span>
                   <span class="item-intro">{{item.introduction}}</span>
               </div>
           </li>
       </ul>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
import {getmusicTime} from '../api/index';
import {mixin} from "../mixins";
export default {
    name: 'album-content',
    mixins: [mixin],
    props:[
        'songList'
    ],
    computed:{
        ...mapGetters([
        'duration',               //音乐时长
        ])
    },
    data() {
        return {
            songTime: '00:00', //歌曲时长
        }
    },
    watch:{
        curTime(){//歌曲时长    
            this.songTime = this.formatSeconds(this.duration);         
        },
    },
    methods:{
        //获取歌曲时长
        // musicTime(str){
        // //    console.log(str)
               
        //      getmusicTime(str).then(res =>{
        //      this.$store.commit('setDuration',res);
             
             
        //          })
        //    this.songTime = this.formatSeconds(this.duration); 
        
        
            
        //     return this.songTime;
        // },
       
        //解析时间
        formatSeconds(value){
            let theTime = parseInt(value);
            let result = '';    //返回值
            let hour = parseInt(theTime / 3600);    //小时
            let minute = parseInt((theTime / 60) % 60); //分钟
            let second = parseInt(theTime % 60);        //秒
            if(hour > 0){
                if(hour < 10){
                    result = '0' + hour + ":";
                }else{
                    result = hour + ":";
                }
            }
            if(minute > 0){
                if(minute < 10){
                    result += "0" + minute + ":";
                }else{
                    result += minute + ":";
                }
            }else{
                result += "00:";
            }
            if(second > 0){
                if(second < 10){
                    result += "0" + second;
                }else{
                    result += second;
                }
            }else{
                result += "00";
            }
            return result;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/album-content.scss';
</style>