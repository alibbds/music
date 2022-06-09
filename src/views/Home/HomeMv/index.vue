<template>
  <div class="HomeMv">
    <h2>最新MV</h2>
    <MvList :newMvInfo='newMvInfo'></MvList>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MvList from '@/components/MvList'
export default {
  name: "HomeMv",
  components: { MvList },
  computed: {
      ...mapState({newMvInfo:state=>state.home.newMvInfo})
  },
  created() {
      this.$store.dispatch('home/getNewMv')
  },
  
};
</script>

<style scoped>
.HomeMv {
  width: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 15px;
  margin-top: 20px;
}
</style>