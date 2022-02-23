<template>
  <!--collapse 是否水平折叠收起菜单-->
  <div class="sidebar">
  <el-menu    
    :default-active="$route.path"
    router
    @open="handleOpen"
    @close="handleClose"
    unique-opened    
    class="el-menu-vertical-demo"
    mode="vertical"
    text-color="#000000"
  >
    
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
 //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面）
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    // isCollapse() {
    //   // 这里的数据就是从vuex取得
    //   return this.$store.state.tab.isCollapse
    // }
     ...mapGetters([
            'numSinger',           //当前收藏的歌手数量
        ]),
  },
  data() {
    return {
      menu: [
        {
          path: '/my-music-singer',
          name: 'my-music-singer',
          label: '我的歌手'+'('+this.numSinger+')',
          icon: '',
        },
        {
          label: '创建的歌单',
          icon: '',
          children: [
            {
              path: '/my-music-collect',
              name: 'my-music-collect',
              label: '我的收藏',
              icon: '',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page1',
              label: '设备类别',
              icon: '',
              url: 'Other/PageTwo'
            },
             {
              path: '/page3',
              name: 'page3',
              label: '测试',
              icon: '',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      // this.$router.push({ name: item.name })
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style>


.sidebar{
  position: absolute;
  padding-top:20px ;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 0px;
  margin-top: 90px;
  width: 210px;
  height: 100%;
  /* background-color: white; */
  /* border: 1px solid gray;
  border-top:none;border-bottom:none; */
}
 ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
</style>