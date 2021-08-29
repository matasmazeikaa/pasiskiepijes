<template>
  <main class="main">
    <img src="~/static/vaccine.svg" class="main__vaccine-icon-1" alt="" />
    <img src="~/static/vaccine.svg" class="main__vaccine-icon-2" alt="" />
    <img src="~/static/vaccine.svg" class="main__vaccine-icon-3" alt="" />

    <Nuxt />
  </main>
</template>

<style scoped lang="scss">
.main {
  background-color: $primary;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  position: relative;

  &__vaccine-icon-1 {
    width: 256px;
    height: 256px;
    position: fixed;
    left: 0;
    top: -4rem;
  }

  &__vaccine-icon-2 {
    width: 420px;
    height: 420px;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  &__vaccine-icon-3 {
    width: 256px;
    height: 256px;
    position: fixed;
    right: -2rem;
  }

  @media only screen and (max-width: 766px) {
    &__vaccine-icon-2 {
      width: 18rem;
      height: 21rem;
    }

    &__vaccine-icon-3 {
      top: 21rem;
      width: 20rem;
      height: 20rem;
    }
  }
}

.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
