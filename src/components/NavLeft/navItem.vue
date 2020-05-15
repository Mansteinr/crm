<template>
  <div >
    <template v-if="!item.children">
        <el-menu-item :index="item.href" @click="selectItem(item)">
          <i :class="`icon iconfont ${ item.icon || ''}`"></i>
          <span :class="item.icon ? '' : 'no-icon'" slot="title"> {{item.label}}</span>
        </el-menu-item>
    </template>

    <el-submenu v-else :index="item.href">
      <template slot="title" >
        <i :class="`icon iconfont ${ item.icon || ''}`"></i>
        <span :class="item.icon ? '' : 'no-icon'" slot="title"> {{item.label}} </span>
      </template>

      <template v-for="child in item.children">
        <nav-item
          v-if="child.children && child.children.length>0"
          :item="child"
          :key="child.href"/>
        <el-menu-item v-else :key="child.href" :index="child.href" @click="selectItem(child)">
          <i :class="`icon iconfont ${ child.icon || ''}`" ></i>
          <span :class="child.icon ? '' : 'no-icon'" slot="title"> {{child.label}} </span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'navItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectItem (value) { // 点击左侧菜单
      this.$emit('selectedMeun', value)
    }
  }
}
</script>