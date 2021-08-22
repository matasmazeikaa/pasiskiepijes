<template>
  <div class='user-input'>
    <div class='user-input__title-container'><h1 class='user-input__title'>Pėtys už laisvę!</h1> <img
      src='~/static/covid-shot-icon.svg' alt='' class='user-input__title-icon' /></div>
    <h2 class='user-input__subtitle'>Įamžink šią istorinę akimirką su <span
      class='user-input__subtitle user-input__subtitle--bold'>SKIEPO DIPLOMU.</span></h2>
    <div class='user-input__inputs'>
      <Input v-model='userData.nameSurname' class='user-input__input' placeholder='Vardas Pavardė' />
      <Select v-model='userData.vaccine' class='user-input__input' placeholder='Pasirink ką išovei'
              :options='$options.COVID_VACCINES' />
      <Input v-model='userData.date' class='mb-48' placeholder='Kada išovei?' type='date' />
      <Button title='Generuoti diplomą' :is-disabled='!isSubmitAllowed' @click='submitUserData' />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Input from '~/components/Input.vue'
import Select from '~/components/Select.vue'
import Button from '~/components/Button.vue'

const COVID_VACCINES = [
  { label: 'Pfizer', vaccine: 'pfizer' },
  { label: 'Moderna', vaccine: 'moderna' },
  { label: 'AstraZenece', vaccine: 'astra-zenece' },
  { label: 'Janssen', vaccine: 'janssen' },
  { label: 'Sputnik V', vaccine: 'sputnik-v' }
]

export default Vue.extend({
  COVID_VACCINES,
  components: { Button, Select, Input },
  data() {
    return {
      userData: {
        nameSurname: '',
        vaccine: '',
        date: ''
      }
    }
  },
  computed: {
    isSubmitAllowed() {
      return this.userData.nameSurname !== '' && this.userData.vaccine !== '' && this.userData.date !== ''
    }
  },
  methods: {
    submitUserData() {
      if (!this.isSubmitAllowed) {
        return
      }

      this.$emit('submitUserData', this.userData)
    }
  }
})
</script>

<style scoped lang='scss'>
.user-input {
  position: relative;
  z-index: 5;

  &__title {
    text-transform: uppercase;
    position: relative;
    width: fit-content;

    &::after {
      content: 'ačiū';
      position: absolute;
      right: -2rem;
      font-size: 1.6rem;
      bottom: -3rem;
      text-transform: none;
    }
  }

  &__title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 7rem;
  }

  &__title-icon {
    width: 64px;
    height: 64px;
    margin-left: 1.8rem;
  }

  &__subtitle {
    margin-bottom: 7rem;

    &--bold {
      font-weight: 700;
    }
  }

  &__inputs {
    max-width: 37rem;
    margin: 0 auto;
  }

  &__input {
    margin-bottom: 2.4rem;
  }

  @media only screen and (max-width: 766px) {
    padding: 4rem 6.5%;

    &__title {
      font-size: 4.4rem;
    }

    &__title-container {
      margin-bottom: 5rem;
    }

    &__subtitle {
      font-size: 2.2rem;
      margin-bottom: 5rem;
    }
  }
}


.mb-48 {
  margin-bottom: 48px;
}
</style>
