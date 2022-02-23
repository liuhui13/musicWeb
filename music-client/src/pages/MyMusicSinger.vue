<template>
  <div class="singer">  
        <div>
            <content-list :contentList="data"></content-list>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                        :current-page="currentPage" :page-size="pageSize" :total="albumDatas.length">
                </el-pagination>
            </div>
        </div>
    </div>
        
</template>

<script>
import {mapGetters} from 'vuex';
import ContentList from '../components/ContentList2';
import {getCollectOfSinger} from '../api/index';
export default {
name:'the-musicCont',
 components:{
        ContentList,
 },
 data(){
        return{
            albumDatas: [],      //歌手数据
            pageSize: 15,        //页面大小，一页有15条数据
            currentPage: 1,      //当前页，默认第一页
           
            
        }
    },
    computed:{
        //计算当前表格中的数据
        data(){
            return this.albumDatas.slice((this.currentPage - 1)*this.pageSize,this.currentPage*this.pageSize)
        },
        ...mapGetters([ 
            'userId',               //当前登录用户的id
            'numSinger',           //当前收藏的歌手数量
        ])
    },
    mounted(){
        
        this.getSingerList();
    },

    methods:{
        
        getSingerList(){     
            console.log('用户id',this.userId)        
            getCollectOfSinger(this.userId)
                .then(res =>{
                    this.currentPage = 1;
                    this.albumDatas = res;
                    this.$store.commit('setNumSinger',this.albumDatas);
                    console.log(this.numSinger)
                })           
        },
        //获取当前页
        handleCurrentChange(val){
            this.currentPage = val;
        },
        

    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/singer.scss';
</style>