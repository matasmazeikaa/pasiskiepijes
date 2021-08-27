export { default as Button } from '../../components/Button.vue'
export { default as Certificate } from '../../components/Certificate.vue'
export { default as Chart } from '../../components/Chart.vue'
export { default as Input } from '../../components/Input.vue'
export { default as Loader } from '../../components/Loader.vue'
export { default as MainPage } from '../../components/MainPage.vue'
export { default as Select } from '../../components/Select.vue'
export { default as UserInput } from '../../components/UserInput.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
