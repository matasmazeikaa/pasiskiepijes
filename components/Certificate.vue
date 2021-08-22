<template>
  <div v-if='datacollection !== null' class='certificate-wrapper'>
    <div ref='certificate' class='certificate-frame' data-tilt>
      <div ref='certificateImage' class='certificate'>
        <div class='logo'>
          <img src='~/static/vaccine.svg' alt='' />
        </div>
        <p class='author'>LIETUVOS RESBUPLIKOS ANTI-COVID ASIOCIAJA</p>
        <h2 class='title'>DIPLOMAS</h2>
        <h3 class='name'>{{ userData.nameSurname }}</h3>
        <p class='reason'>Pasiskiepijus <strong>"{{ userData.vaccine.label }}"</strong> vakcina {{ userData.date }}</p>
        <div class='graph'>
          <LineChart :chart-data='datacollection' :options='$options.CHART_OPTIONS' />
        </div>
        <p class='year'>2021</p>
      </div>
    </div>
    <div class='order-container'>
      <p class='order-text'>Nori įamžinti jį ant sienos?</p>
      <Button title='Užsisakyk' :is-loading='isLoadingOrder' @click='handleOrderButtonClick' />
    </div>
  </div>
</template>

<script>
import VanillaTilt from 'vanilla-tilt'
import html2canvas from 'html2canvas'
import LineChart from '~/components/LineChart'
import { getAllCovidVaccinationData } from '~/api/getAllCovidVaccinationData'
import Button from '~/components/Button'
import { createPaymentSessionApi } from '~/api/createPaymenSessionApi'

const CHART_OPTIONS = {
  legend: { display: false }, scales: {
    xAxes: [{
      display: false
    }]
  },
  maintainAspectRatio: false,
  showAllTooltips: true
}

export default {
  CHART_OPTIONS,
  components: { Button, LineChart },
  props: {
    name: {
      type: String,
      default: ''
    },
    reason: {
      type: String,
      default: ''
    },
    userData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      datacollection: null,
      isLoadingOrder: false
    }
  },
  mounted() {
    this.getVaccinationData()
  },
  methods: {
    async getVaccinationData() {
      try {
        const { data } = await getAllCovidVaccinationData()

        console.log(data.features)
        const sortedDataSet = data.features.sort((a, b) => {

          return a.attributes.value - b.attributes.value
        })

        console.log(sortedDataSet)

        const dataset = sortedDataSet.map((feature) => feature.attributes.value)
        const labels = sortedDataSet.map((feature) => feature.attributes.EXPR_1)
        this.datacollection = this.fillData(dataset, labels)
        this.$nextTick(() => {
          VanillaTilt.init(this.$refs.certificate, {
            glare: true,
            'full-page-listening': true
          })
        })
      } catch (error) {
        console.error(error.response)
      }
    },
    fillData(data, labels) {
      return {
        labels,
        datasets: [{
          backgroundColor: 'transparent',
          borderColor: 'rgb(255, 99, 132)',
          data
        }],
        options: {
          showAllTooltips: true
        }
      }
    },
    async handleOrderButtonClick() {
      this.isLoadingOrder = true

      const image = await this.covertCertificateToBase64();

      try {
        const { data } = await createPaymentSessionApi({
          ...this.userData,
          vaccine: this.userData.vaccine.label,
          image
        })
        location.href = data.redirectUrl
      } catch (error) {
        this.isLoadingOrder = false
      }
    },
    covertCertificateToBase64() {
      const elem = this.$refs.certificateImage
      return html2canvas(elem).then((canvas) => canvas.toDataURL())
    }
  }
}
</script>

<style scoped lang='scss'>
.certificate-frame {
  border: 14px solid;
  border-color: #b89465 #a18157 #a18157 #b89465;
  margin: 0 auto;
  width: 210px;
  height: 297px;
}

.certificate-wrapper {
  position: relative;
  z-index: 5;
}

.certificate {
  height: 100%;
  font-family: "Tinos", serif;
  font-size: 8px;
  padding: 19px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url("~static/certifikatas.jpg");
  background-size: cover;
  background-position: center;
}

.certificate .logo {
  width: 15px;
  margin-top: 15px;
}

.certificate .author {
  font-size: 6px;
  max-width: 100px;
  margin: 5px auto 0;
}

.certificate .title {
  font-weight: 400;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 0;
  color: $dark;
}

.certificate .name {
  margin-top: 5px 0 0;
  font-size: 16px;
  font-family: Signato, serif;
  color: #16264c;
}

.certificate .reason {
  margin-top: 10px;
  margin-bottom: 5px;
  max-width: 120px;
  font-size: 8px;
}

.certificate .graph {
  & > div {
    width: 120px;
    height: 50px !important;
  }

  canvas {
    height: 100px !important;
  }
}

.certificate .year {
  font-size: 6px;
  margin: 5px 0;
}

.order-text {
  color: white;
  font-size: 1.6rem;
  display: inline-block;
  margin-right: 2rem;
}

.order-container {
  margin-top: 3rem;
}

@media (min-width: 600px) {
  .certificate-frame {
    border-width: 28px;
    width: 420px;
    height: 594px;
  }
  .certificate {
    padding: 36px;
    font-size: 16px;
  }
  .certificate .logo {
    width: 30px;
    margin-top: 30px;
  }
  .certificate .author {
    font-size: 12px;
    max-width: 200px;
    margin: 10px auto 0;
  }
  .certificate .title {
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .certificate .name {
    margin: 10px 0;
    font-size: 36px;
  }
  .certificate .reason {
    margin-top: 20px;
    max-width: 240px;
    font-size: 13px;
    margin-bottom: -20px;
  }
  .certificate .graph {
    margin: 20px 20px 0;

    & > div {
      width: 250px;
      height: 100px !important;
    }

    canvas {
      height: 100px !important;
    }
  }
  .certificate .year {
    font-size: 12px;
    margin: 10px 0;
  }
}
</style>
