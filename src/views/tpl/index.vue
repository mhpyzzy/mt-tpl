<script setup>
import { useMedia } from '@/hooks/useMedia.js';
const isMobile = useMedia()
import PC from './pc.vue';
import H5 from './h5.vue';
</script>

<template>
<!--  <PC></PC>-->
<!--  <H5></H5>-->
  <component :is="isMobile ? H5 : PC" />
</template>

<style scoped>

</style>