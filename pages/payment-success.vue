<template>
  <div>
    <h1>Ačiū! Diplomas jus pasieks per 1 savaitę.</h1>
  </div>
</template>

<script>
export default {
  created() {
    this.$gtag.event('payment_completed')
  },
}
</script>

<style lang="scss" scoped>
h1 {
  position: relative;
  z-index: 1;
}
</style>
