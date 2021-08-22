<template>
  <button class='button' :class="{'button--disabled': isDisabled}" :disabled='isDisabled' @click="$emit('click')">
    <div class='button__border-left'/>
    <div class='button__border-top'/>
    <div class='button__border-bottom'/>
    {{ title }}
    <Loader v-if='isLoading' class='button__icon-right'/>
    <div v-if='!isLoading' class='button__icon-right button__icon-right--arrow'/>
  </button>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components: { Loader },
  props: {
    title: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
.button {
  $this: &;

  border: none;
  text-transform: uppercase;
  background: transparent;
  font-size: 1.6rem;
  font-weight: 700;
  color: $white;
  cursor: pointer;
  position: relative;
  padding-right: 4rem;

  &:hover {
    #{$this}__border-left {
      transform:scaleY(1);
    }
    #{$this}__border-top {
      transform:scaleX(1);
    }
    #{$this}__border-bottom {
      transform:scaleX(1);
    }
  }

  &--disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &__border-left {
    height: 100%;
    width: 3px;
    background-color: $white;
    position: absolute;
    left: -10px;
    transition:transform 0.3s ease-out;
    transform:scaleY(0);
  }
  &__border-top {
    height: 3px;
    width: 100%;
    background-color: $white;
    position: absolute;
    left: 0;
    top: -10px;
    transform-origin: left;
    transition:transform 0.3s ease-out;
    transform:scaleX(0);
  }

  &__border-bottom {
    height: 3px;
    width: 100%;
    background-color: $white;
    position: absolute;
    left: 0;
    bottom: -10px;
    transform-origin: left;
    transition:transform 0.3s ease-out;
    transform:scaleX(0);
  }

  &__icon-right {
    width: 24px;
    height: 24px;
    position: absolute;
    margin-left: 8px;
    right: 0;
    top: 0;

    &--arrow {
      background: url(~static/arrow-right.svg) center center no-repeat;
    }
  }
}
</style>
