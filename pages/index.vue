<template>
    <Component
      :is='currentStep'
      :user-data='userData'
      @submitUserData='handleUserDataSubmit'
    />
</template>

<script lang='ts'>
import Vue from 'vue'
import UserInput from '~/components/UserInput.vue'
import Certificate from '~/components/Certificate.vue'
import Chart from '../components/Chart.vue'

export default Vue.extend({
  components: { Chart, Certificate, UserInput },
  data() {
    return {
      currentStep: 'UserInput',
      userData: null
    }
  },
  methods: {
    handleUserDataSubmit(data) {
      this.userData = data;
      this.currentStep = 'Certificate'
    },
  }
})
</script>
