<script>
import { Line, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    const keepTooltipOpenPlugin = {
      beforeRender(chart) {
        // We are looking for bubble which owns "keepTooltipOpen" parameter.
        const datasets = chart.data.datasets
        chart.pluginTooltips = []
        for (let i = 0; i < datasets.length; i++) {
          for (let j = 0; j < datasets[i].data.length; j++) {
            if (datasets[i].data[j].keepTooltipOpen && !chart.getDatasetMeta(i).hidden) {
              // When we find one, we are pushing all informations to create the tooltip.
              chart.pluginTooltips.push(new Chart.Tooltip({
                _chart: chart.chart,
                _chartInstance: chart,
                _data: chart.data,
                _options: chart.options.tooltips,
                _active: [chart.getDatasetMeta(i).data[j]]
              }, chart))
            }
          }
        }
      }, // end beforeRender

      afterDatasetsDraw(chart, easing) {

        // Draw tooltips
        Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
          tooltip.initialize()
          tooltip.update()
          tooltip.pivot()
          tooltip.transition(easing).draw()
        })
      }
    }


    this.addPlugin(keepTooltipOpenPlugin)
    this.renderChart(this.chartData, this.options)
  }
}
</script>
