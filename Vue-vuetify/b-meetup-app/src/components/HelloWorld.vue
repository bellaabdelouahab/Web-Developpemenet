<template>
  <div style="max-width: 50vw;margin-left:25vw;" >
    <v-carousel hide-delimiters pt-3>
    <v-carousel-item
      v-for="(item,i) in ms"
      :key="i"
      :src="item.src"
      cover
    >
    </v-carousel-item>
  </v-carousel>
  </div>
</template>
<script>
export default {
  setup() {
    
  },
  data: ()=> ({
    ms:[{
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          }]
  })
}
</script>