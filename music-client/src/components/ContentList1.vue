<template>
    <div class="content-list">
        <ul class="section-content">
            <li class="content-item" v-for="(item,index) in contentList" :key="index">
                <div class="kuo" @click="toplay(item.id,item.url,item.pic,index,item.name,item.lyric)">
                    <img class="item-img" :src="attachImageUrl(item.pic)">
                    <div class="mask">
                        <svg class="icon">
                            <use xlink:href="#icon-liuhui-bofang"></use>
                        </svg>
                    </div>
                </div> 
                <p class="item-name">{{item.name||item.title}}</p>               
            </li>
        </ul>
    </div>
</template>
<script>
import {mixin} from '../mixins';
export default {
    name: 'content-list1',
    mixins: [mixin],
    props: ['contentList'],
   
}
</script>
<style lang="scss" scoped>
@import '../assets/css/content-list.scss';
</style>