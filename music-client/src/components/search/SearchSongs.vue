<template>
    <div class="search-songs">
       <album-content :songList="listOfSongs"></album-content>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
import {mixin} from "../../mixins";
import AlbumContent from "../AlbumContent";

export default {
    name: 'search-songs',
    components:{
        AlbumContent
    },
    mixins: [mixin],
    computed:{
        ...mapGetters([
            'listOfSongs'
        ])
    },
    // watch:{
    //     keyword(){
    //     console.log('this.keyword',this.keyword);
    //     this.songList=this.keyword?this.listOfSongs.filter(item => item.name.includes(this.keyword)):this.listOfSongs
    //     }
        
    // },
    // 搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着它的内容发生变化
    //     watch:{
    //     select_word: function(){
    //         if(this.select_word == ''){
    //             this.tableData = this.tempData;
    //         }else{
    //             this.tableData = [];
    //             for(let item of this.tempData){
    //                 if(item.name.includes(this.select_word)){
    //                     this.tableData.push(item);
    //                 }
    //             }
    //         }
    //     }
    //     },
    mounted() {
        this.getSong();
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-songs.scss';
</style>