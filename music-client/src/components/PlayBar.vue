<template>
    <div class="play-bar" :class="{show:toggle}">
        <div @click="toggle=!toggle" class="item-up" :class="{turn: toggle}">
            <svg class="icon">
                <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
            </svg>
        </div>
        <div class="kongjian">
           
            <!-- 歌曲图片 -->
            <div class="item-img" @click="toLyric">
                <img :src="picUrl"/>
            </div>
             <div class="item-song-title" style="color:#5d5f6f;width:100px;margin-left:10px;" >
                        <div>{{this.title}}</div>
                        <div style="color:#a9a8cb;">{{this.artist}}</div>
             </div>
            <!-- 当前播放的歌曲列表 -->
                <div class="item" @click="changeAside" style="margin-left:-30px;">
                    <svg class="icon">
                        <use xlink:href="#icon-liuhui-liebiao"></use>
                    </svg>
                </div>
             
            <!-- 上一首 -->
            <div class="item" @click="prev">
                <svg class="icon">
                    <use xlink:href="#icon-liuhui-playLast"></use>
                </svg>
            </div>
            <!-- 播放 -->
            <div class="item" @click="togglePlay">
                <svg class="icon">
                    <use :xlink:href="playButtonUrl"></use>
                </svg>
            </div>
            <!-- 下一首 -->
            <div class="item" @click="next">
                <svg class="icon">
                    <use xlink:href="#icon-liuhui-playNext"></use>
                </svg>
            </div>
            <!-- 播放进度 -->
            <div class="playing-speed">
                <!-- 播放开始时间 -->
                <div class="current-time">{{nowTime}}</div>
                <div class="progress-box">
                   
                    <div ref="progress" class="progress" @mousemove="mousemove">
                        <!-- 进度条 -->
                        <div ref="bg" class="bg" @click="updatemove">
                            <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}"></div>
                        </div>
                        <!-- 拖动的点 -->
                        <div ref="idot" class="idot" :style="{left:curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
                    </div>
                </div>
                <!-- 播放结束时间 -->
                <div class="left-time">{{songTime}}</div>
                <!-- 音量 -->
                <div class="item item-volume">
                    <svg v-if="volume == 0" class="icon">
                        <use xlink:href="#icon-liuhui-jingyin"></use>
                    </svg>
                    <svg v-else class="icon">
                        <use xlink:href="#icon-liuhui-yinliang"></use>
                    </svg>
                    <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
                </div>
                <!-- 收藏 -->
                <div class="item" @click="collection">
                    <!-- <svg :class="{active:isActive}" class="icon"> -->
                    <svg  class="icon">
                        <!-- <use xlink:href="#icon-xihuan-shi"></use> -->
                        <use :xlink:href="shoucangUrl"></use>
                    </svg>
                </div>
                <!-- 播放顺序 -->
            <div class="item" @click="shunxu">
               <svg class="icon">
                    <use :xlink:href="playOrderUrl"></use>      
                </svg>
            </div>
                <!-- 下载 -->
                <div class="item" @click="download">
                    <svg class="icon">
                        <use xlink:href="#icon-liuhui-xiazai"></use>
                    </svg>
                </div>
                
                
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import { download,setCollect,getCollectOfUserId,deteleCollect,setDegree,setDegree2} from '../api/index';


export default {
    name: 'play-bar',
    data(){
        return {
            nowTime: '00:00',        //当前播放进度的时间
            songTime: '00:00',        //当前歌曲总时间
            curLength: 0,            //进度条的位置
            progressLength: 0,      //进度条的总长度
            mouseStartX:    0,      //拖拽开始位置
            tag: false,             //拖拽开始结束的标志，当开始拖拽，它的值才会变成true
            volume: 50,             //音量，默认一半
            toggle: false            //显示隐藏播放器页面
        }
    },
    computed: {
        ...mapGetters([
            'id',               //歌曲id
            'url',              //歌曲地址
            'isPlay',           //播放状态
            'playButtonUrl',   //播放状态的图标
            'picUrl',            //正在播放的音乐的图片
            'title',                  //歌名
            'artist',                 //歌手名
            'duration',                //音乐时长
            'curTime',                //当前音乐的播放位置
            'showAside',            //是否显示播放中的歌曲列表
            'listIndex',            //当前歌曲在歌单中的位置
            'listOfSongs',          //当前歌单列表
            'autoNext',             //自动播放下一首
            'loginIn',              //用户是否已登录
            'userId',               //当前登录用户的id
            'isActive',             //当前播放的歌曲是否已收藏
            'shoucangUrl',             //收藏状态的图标
            'playOrderUrl',          //当前歌曲播放顺序图标
            'playOrder',            //当前歌曲播放顺序
            'numPlay',              //当前播放量
        ])
    },
    watch:{
        //切换播放状态的图标
        isPlay() {
             if(this.isPlay){
                this.$store.commit('setPlayButtonUrl', '#icon-liuhui-zanting');
            }else{
                this.$store.commit('setPlayButtonUrl', '#icon-liuhui-bofang');
            }
        },
        //切换收藏状态的图标
        isActive() {
             if(this.isActive){
                this.$store.commit('setShoucangUrl', '#icon-liuhui-yishoucang');
            }else{
                this.$store.commit('setShoucangUrl', '#icon-liuhui-shoucang');
            }
        },
        //切换播放顺序状态的图标
        playOrder() {
             if(this.playOrder == 1){
                this.$store.commit('setPlayOrderUrl', '#icon-liuhui-shunxu');
                this.notify('顺序播放！！！','success');
            }if(this.playOrder == 2){
                this.$store.commit('setPlayOrderUrl', '#icon-liuhui-suiji');
                this.notify('随机播放！！！','success');
            }if(this.playOrder == 0){
                this.$store.commit('setPlayOrderUrl', '#icon-liuhui-danqu');
                this.notify('单曲循环播放！！！','success');
            }
        },
        curTime(){
            this.nowTime = this.formatSeconds(this.curTime);
            this.songTime = this.formatSeconds(this.duration);
            this.curLength = (this.curTime / this.duration) *100;
        },
        //音量变化
        volume(){
            this.$store.commit('setVolume',this.volume / 100);
        },
        //自动播放下一首
        autoNext(){
            if(this.playOrder == 0){
                this.togglePlay();//下一首歌还是这首歌
            }
            if(this.playOrder == 1){
                this.next();//下一首歌是下一首歌
            }
            if(this.playOrder == 2){
                this.randomRange();//下一首歌随机
            }

        }
    },
    mounted(){
        this.progressLength = this.$refs.progress.getBoundingClientRect().width;
        document.querySelector('.item-volume').addEventListener('click',function(e){
            document.querySelector('.volume').classList.add('show-volume');
            e.stopPropagation();
        },false);
        document.querySelector('.volume').addEventListener('click',function(e){
            e.stopPropagation();
        },false);
        document.addEventListener('click',function(){
            document.querySelector('.volume').classList.remove('show-volume');
        },false);
    },
    methods: {
        //提示信息
        notify(title,type) {
            this.$notify({
                title: title,
                type: type
            })
        },
        //控制音乐播放、暂停
        togglePlay() {
            if(this.isPlay){
                this.$store.commit('setIsPlay', false);
            }else{
                this.$store.commit('setIsPlay', true);
            }
        },
        //控制音乐播放顺序（顺序，随机和单曲播放）
        shunxu() {
           let i = this.playOrder
            i++
            if(i == 1){//顺序播放
                console.log('顺序播放')
                
            }if(i == 2){//随机播放
                console.log('随机播放')
                 
            }if(i == 3){//单曲循环播放
                console.log('单曲循环播放')
                i = 0
            }
            this.$store.commit('setPlayOrder', i);
            console.log('playOrder：'+this.playOrder)
        },
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
        //拖拽开始
        mousedown(e){
            this.mouseStartX = e.clientX;
            this.tag = true;
        },
        //拖拽结束
        mouseup(){
            this.tag = false;
        },
        //拖拽中
        mousemove(e){
            if(!this.duration){
                return false;
            }
            if(this.tag){
                let movementX = e.clientX - this.mouseStartX;       //点点移动的距离
                let curLength = this.$refs.curProgress.getBoundingClientRect().width;
                let newPercent = ((movementX+curLength)/this.progressLength)*100;
                if(newPercent>100){
                    newPercent = 100;
                }
                this.curLength = newPercent;
                this.mouseStartX = e.clientX;
                this.changeTime(newPercent);
            }
        },
        //更改歌曲进度
        changeTime(percent){
            let newCurTime = (percent*0.01)* this.duration;
            this.$store.commit('setChangeTime',newCurTime);
        },
        //点击播放条切换播放进度
        updatemove(e){
            if(!this.tag){
                //进度条的左侧坐标
                let curLength = this.$refs.bg.offsetLeft;
                let newPercent = ((e.clientX - curLength) / this.progressLength) * 100;
                if(newPercent>100){
                    newPercent = 100;
                }else if(newPercent<0){
                    newPercent = 0;
                }
                this.curLength = newPercent;
                this.changeTime(newPercent);
            }
        },
        //显示播放中的歌曲列表
        changeAside(){
            this.$store.commit('setShowAside',true);
        },
        //上一首
        prev(){
            if(this.playOrder == 1){//顺序播放
            if(this.listIndex != -1 && this.listOfSongs.length > 1){    //当前处于不可能状态或者只有只有一首音乐的时候不执行）
                if(this.listIndex > 0){                                 //不是第一首音乐
                    this.$store.commit('setListIndex',this.listIndex - 1);  //直接返回上一首
                }else{                                                  //当前是第一首音乐
                    this.$store.commit('setListIndex',this.listOfSongs.length - 1);  //切换到倒数第一首
                }
                this.toplay(this.listOfSongs[this.listIndex].url);
            }
            }
            if(this.playOrder == 2){//随机播放
                this.randomRange();
            }
        },
        //下一首
        next(){
           let params = new URLSearchParams(); 
            params.append('userId',this.userId);
            params.append('songId',this.id);
            //跳过这首歌-1分
            setDegree2(params).then(res =>{})

            if(this.playOrder == 1){//顺序播放
                if(this.listIndex != -1 && this.listOfSongs.length > 1){    //当前处于不可能状态或者只有只有一首音乐的时候不执行）
                if(this.listIndex < this.listOfSongs.length - 1){                                 //不是最后一首音乐
                    this.$store.commit('setListIndex',this.listIndex + 1);  //直接返回下一首
                }else{                                                      //当前是最后一首音乐
                    this.$store.commit('setListIndex',0);  //切换到第一首
                }
                this.toplay(this.listOfSongs[this.listIndex].url);
            }
            }
            if(this.playOrder == 2){//随机播放
                this.randomRange();
            }
        },
        //下一首随机
        randomRange(){ 
            let r =Math.floor(Math.random()*this.listOfSongs.length);//生成随机数（包含0，不包括this.listOfSongs.length）
            console.log(r+'：随机数')
            if(this.listIndex == r){
                r++;
            }if(r == this.listOfSongs.length){
                r = 0;
            }
            this.$store.commit('setListIndex',r);
            this.toplay(this.listOfSongs[this.listIndex].url);
        },
        //播放音乐
        toplay: function(url){
            if(url && url != this.url){
                this.$store.commit('setId',this.listOfSongs[this.listIndex].id);
                this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
                this.$store.commit('setPicUrl',this.$store.state.configure.HOST+this.listOfSongs[this.listIndex].pic);
                this.$store.commit('setTitle',this.replaceFName(this.listOfSongs[this.listIndex].name));
                this.$store.commit('setArtist',this.replaceLName(this.listOfSongs[this.listIndex].name));
                this.$store.commit('setLyric',this.parseLyric(this.listOfSongs[this.listIndex].lyric));
                this.$store.commit('setIsActive',false);
                if(this.loginIn){
                    getCollectOfUserId(this.userId)
                        .then(res =>{
                            for(let item of res){
                                if(item.songId == this.id){
                                    this.$store.commit('setIsActive',true);
                                    break;
                                }
                            }
                        })
                }
            }
        },
         //获取名字前半部分--歌手名
        replaceLName(str){
            if(str){
            let arr = str.split('-');
            return arr[0];      
            }
        },
        //获取名字后半部分--歌名
        replaceFName(str){
            if(str){
            let arr = str.split('-');
            return arr[1];
            }
        },
        //解析歌词
        parseLyric(text){
            let lines = text.split("\n");                   //将歌词按行分解成数组
            let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
            let result = [];                                //返回值
            //对于歌词格式不对的直接返回
            if(!(/\[.+\]/.test(text))){
                return [[0,text]]
            }        
            //去掉前面格式不正确的行
            while(!pattern.test(lines[0])){
                lines = lines.slice(1);
            }
            //遍历每一行，形成一个每行带着俩元素的数组，第一个元素是以秒为计算单位的时间，第二个元素是歌词
            for(let item of lines){
                let time = item.match(pattern);  //存前面的时间段
                let value = item.replace(pattern,'');//存后面的歌词
                for(let item1 of time){
                    let t = item1.slice(1,-1).split(":");   //取出时间，换算成数组
                    if(value!=''){
                        result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value]);
                    }                    
                }                
            }
            //按照第一个元素--时间--排序
            result.sort(function(a,b){
                return a[0] - b[0];
            });
            return result;
        },
        //转向歌词页面
        toLyric(){
             if(this.openLyric == false){
                this.$router.push({path: `/lyric`});
                 this.openLyric = true;
             }else{
                 this.$router.go(-1);
                 this.openLyric = false;
             }
        },
        //下载音乐
        download() {
            download(this.url)
            .then(res=>{
                let content = res.data;
                let eleLink = document.createElement('a');
                eleLink.download = `${this.artist}-${this.title}.mp3`;
                eleLink.style.display = 'none';
                //把字符内容转换成blob地址
                let blob = new Blob([content]);
                eleLink.href = URL.createObjectURL(blob);
                //把链接地址加到document里
                document.body.appendChild(eleLink);
                //触发点击
                eleLink.click();
                //然后移除掉这个新加的控件
                document.body.removeChild(eleLink);
            })
            .catch(err =>{
                console.log(err);
            })
        },
        //收藏
        collection() {
            if(this.loginIn){
                if(this.isActive==false){
                var params = new URLSearchParams();
                params.append('userId',this.userId);
                params.append('type',0);
                params.append('songId',this.id);
                params.append('songListId',0);
                //添加收藏
                setCollect(params)
                    .then(res =>{
                        if(res){
                            this.$store.commit('setIsActive',true);
                            this.notify('收藏成功','success');
                            console.log('用户id:'+this.userId+'，收藏了歌曲id:'+this.id)
                            let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;//刷新
                            this.$router.push(NewPage);
                            this.$router.go(-1);
                        }else{
                            this.notify('收藏失败','error');
                        }
                    })
                }else{
                    //取消收藏              
                    deteleCollect(this.userId,this.id,0)
                    .then(res =>{
                        if(res){
                            this.$store.commit('setIsActive',false);
                            this.notify('收藏取消','success');
                            console.log('用户id:'+this.userId+'，取消了歌曲id:'+this.id+'的收藏！')
                            let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;//刷新
                            this.$router.push(NewPage);
                            this.$router.go(-1);
                        }else{
                            this.notify('收藏取消失败','error');
                        }
                    })
                   
                }
                var params = new URLSearchParams();
                params.append('userId',this.userId);
                params.append('songId',this.id);
                setDegree(params).then(res =>{})
            }else{
                this.notify('请先登录','warning');
            }
        }
    }
}
</script>
<style  lang="scss" scoped>
@import '../assets/css/play-bar.scss';
</style>
