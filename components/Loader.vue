<template>
  <div class="lds-dual-ring" />
</template>

<style lang='scss' scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring::after {
  content: " ";
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 50%;
  border: 1px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
