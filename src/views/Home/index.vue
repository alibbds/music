<template>
  <div class="home">
    <Banner></Banner>
    <HomeHot></HomeHot>
    <HomeAlbum></HomeAlbum>
    <HomeMv></HomeMv>
    <HomeArtist></HomeArtist>
  </div>
</template>

<script>
import Banner from './Banner';
import HomeHot from './HomeHot';
import HomeAlbum from './HomeAlbum';
import HomeMv from './HomeMv';
import HomeArtist from './HomeArtist';
export default {
    name:'Home',
    components: { Banner ,HomeHot,HomeAlbum,HomeMv,HomeArtist },
}
</script>

<style>
.home{
  width: 1080px;
}
</style>