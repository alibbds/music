<template>
  <div>
    <canvas ref="mycanvas"></canvas>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ctx:null,
      dataArray:null
    }
  },
  props:['width','height','analyser','isInit'],
  methods:{
    initCanvas(){
      this.$refs.mycanvas.width = this.width
      this.$refs.mycanvas.height = this.height
      this.ctx = this.$refs.mycanvas.getContext("2d")
      this.dataArry = new Uint8Array(this.analyser.frequencyBinCount);
    },
    draw(){
      requestAnimationFrame(this.draw);
      const { width, height} = this.$refs.mycanvas;
      this.ctx.clearRect(0,0,width,height);
      if(!this.isInit){
        return
      }
      this.analyser.getByteFrequencyData(this.dataArry)
      let len = this.dataArry.length / 2;
      let barWidth = width / len / 2;
      // if(zhenshu % 12 === 0){
      //   ctx.fillStyle = rangeColor();
      // }
      // zhenshu = zhenshu +1;
      let max = this.dataArry[0];
      
      for(let i = 0;i<len;i++){
        if(max < this.dataArry[i]){
          max = this.dataArry[i]
        }
        let barHeight = this.dataArry[i] / 255 * height /2;
        let x1 = i * barWidth + width / 2;
        let x2 = width / 2 - (i+1)*barWidth
        let y1 = height / 2 - barHeight;
        let y2 = height /2
        this.ctx.fillRect(x1,y1,barWidth - 2,barHeight);
        this.ctx.fillRect(x1, y2, barWidth - 2, barHeight);
        this.ctx.fillRect(x2, y1, barWidth - 2, barHeight);
        this.ctx.fillRect(x2, y2, barWidth - 2, barHeight);
      }
      this.ctx.fillStyle = "#00bf" + max.toString(16);
    }
  },
  mounted() {
     let pMountedTimer = window.setInterval(() => {
      if (window.parentMounted) {
        window.clearInterval(pMountedTimer);
        // 下面就可以写子组件想在mounted时执行代码（此时父组件的mounted已经执行完毕）

        this.initCanvas(),
        this.draw()
      }
    }, 500);
  },
}
</script>

<style>

</style>