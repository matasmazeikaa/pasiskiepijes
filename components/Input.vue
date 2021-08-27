<template>
  <div class='input-container' :class='{inputVisible: value}'>
    <input class='input-container__input' :name='name' :type='type' :value='value' @input='handleInput'/>
    <span class='input-container__placeholder'>{{ placeholder }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dataValue: ''
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped lang='scss'>
/* stylelint-disable no-descending-specificity */
.inputVisible .input-container__placeholder {
    top: -1.2rem;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0 1.5rem;
}

.input-container {
  $this: &;

  position: relative;

  &__input {
    border: 2px solid $dark;
    color: $white;
    padding: 1.8rem 2.8rem;
    background-color: transparent;
    outline: none;
    transition: border 0.5s ease-out;
    border-radius: 0.5rem;
    font-family: $secondary-font;
    display: inline-block;
    width: 100%;

    &:focus {
      & ~ #{$this}__placeholder {
        top: -1.2rem;
        font-weight: bold;
        font-size: 1.2rem;
        padding: 0 1.5rem;
      }
    }
  }

  &__placeholder {
    position: absolute;
    pointer-events: none;
    transition: 0.2s ease all;
    font-family: $secondary-font;
    font-size: 1.6rem;
    color: $white;
    left: 2.8rem;
    top: 1.8rem;
    background-color: $primary;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }

  input[type="date"]::after {
    content: '';
    background: url(~/static/calendar-icon.svg) center center no-repeat;
    position: absolute;
    right: 8px;
    width: 24px;
    height: 24px;
  }
}
</style>
