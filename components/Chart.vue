<template>
  <div class="chart">
    <!-- x axis -->
    <div
      class="x axis"
      style="top: 100%; width: 100%; border-top: 1px solid black"
    >
      <span
        v-for="(axis, index) in getYAxisLabels"
        :key="index"
        :style="{ left: axis.left }"
        class="x-title"
        >{{ axis.value }}</span
      >
    </div>

    <!-- y axis -->
    <div class="y axis" style="height: 100%; border-left: 1px solid black">
      <span v-for="axis in getXAxisLabels" :style="{ top: axis.top }">{{
        axis.value
      }}</span>
    </div>

    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        style="stroke: red; stroke-width: 2"
        :points="points"
      ></polyline>
    </svg>
    <div
      :style="{ left: tooltipScale.x, top: tooltipScale.y }"
      class="tooltip-place"
    >
      Aš esu čia.
    </div>
    <div
      :style="{ left: tooltipScale.x, top: tooltipScale.y }"
      class="tooltip-place--dot"
    />
    <img
      :style="{ left: tooltipScale.x, top: tooltipScale.y }"
      src="~/static/arrow.svg"
      alt=""
      class="tooltip-arrow"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    tooltipIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      points: null,
      tooltipScale: { x: null, y: null },
    }
  },
  computed: {
    getXAxisLabels() {
      const oneThirdOfDataIndex = Math.round(this.data.length / 2)
      return [
        { top: '100%', value: 0 },
        { top: '50%', value: this.data[oneThirdOfDataIndex].x },
        {
          top: '0%',
          value: this.data[this.data.length - 1].x,
        },
      ]
    },
    getYAxisLabels() {
      const oneThirdOfDataIndex = Math.round(this.data.length / 2)
      return [
        { left: '0%', value: this.data[0].date },
        { left: '50%', value: this.data[oneThirdOfDataIndex].date },
        {
          left: '100%',
          value: this.data[this.data.length - 1].date,
        },
      ]
    },
  },
  created() {
    if (!this.data.length) {
      return
    }

    function scale(domain, range) {
      const m = (range[1] - range[0]) / (domain[1] - domain[0])
      return (num) => range[0] + m * (num - domain[0])
    }

    const x = scale([0, Math.max(...this.data.map((d) => d.x))], [0, 100])
    const y = scale([0, Math.max(...this.data.map((d) => d.y))], [100, 0])

    this.points = this.data.map((d) => `${x(d.x)},${y(d.y)}`).join(' ')
    const datasetPoints = this.data.map((d) => ({ x: x(d.x), y: y(d.y) }))

    if (!datasetPoints) {
      return;
    }
    
    this.tooltipScale = {
      x: `calc(${datasetPoints[this.tooltipIndex].x}% - 4px)`,
      y: `calc(${datasetPoints[this.tooltipIndex].y}% - 4px)`,
    }
  },
}
</script>

<style lang="scss" scoped>
.chart {
  position: relative;
  width: 100%;
  height: 100%;
}

svg {
  position: absolute;
  overflow: visible;
  width: 100%;
  height: 100%;
  left: 0;
}

svg * {
  vector-effect: non-scaling-stroke;
}

line,
polyline {
  fill: none;
  stroke: black;
}

.axis {
  position: absolute;
}

span {
  font-size: 10px;
}

.axis span {
  position: absolute;
  line-height: 1;
}

.x.axis span {
  top: 0.5em;
  transform: translate(-50%, 0);
}

.y.axis span {
  left: -0.5em;
  transform: translate(-100%, -50%);
}

.tooltip-place {
  position: absolute;
  background: transparent;
  width: fit-content;
  margin: 12px;
  font-size: 11px;

  &--dot {
    background: $primary;
    width: 1px;
    height: 1px;
    position: absolute;
  }
}

.tooltip-arrow {
  position: absolute;
  width: 20px;
  height: 20px;
}

.x-title {
  min-width: 70px;
}

@media (max-width: 600px) {
  * {
    font-size: 6px !important;
  }
}
</style>
