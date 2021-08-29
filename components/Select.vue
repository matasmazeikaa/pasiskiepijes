<template>
  <VueSelect
    :options="options"
    :value="value.label"
    :class="{ inputVisible: value.label }"
    @input="handleInput"
  />
</template>

<script>
import VueSelect from 'vue-select'

export default {
  components: {
    VueSelect,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [Object, String],
      default: () => ({ label: '', vaccine: '' }),
    },
  },
  methods: {
    handleInput(e) {
      const value = e !== null ? e : { label: '', vaccine: '' }

      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';

.vs {
  &__dropdown-toggle {
    max-width: 37rem;
    border: 0.2rem solid $dark;
    margin: 0 auto;
    padding: 1.7rem 2.8rem;
    height: 70px;
  }

  &--open {
    &__dropdown-toggle {
      max-width: 37rem;
      border: 0.2rem solid $dark;
      margin: 0 auto;
      padding: 1.8rem 2.8rem;
    }
  }

  &__selected {
    color: $white;
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
  }

  &__selected-options {
    padding: 0;
    position: relative;

    &::before {
      content: 'Pasirink ką išovei';
      position: absolute;
      left: 0;
      color: $white;
      font-size: 1.6rem;
      transition: 0.2s ease all;
      top: 0.5rem;
    }
  }

  &__open-indicator {
    fill: $dark;
  }

  &__clear {
    fill: $dark;
  }

  &__search,
  &__search:focus {
    color: $white;
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
    border: none;
  }

  &__dropdown-toggle[aria-expanded='true'] {
    .vs__selected-options::before {
      transform: translateY(-3rem);
      font-weight: bold;
      font-size: 1.2rem;
      padding: 0 1.5rem;
      background-color: $primary;
    }
  }

  &__dropdown-menu {
    li {
      font-size: 1.6rem !important;
    }
  }
}

.inputVisible {
  .vs__dropdown-toggle {
    .vs__selected-options::before {
      transform: translateY(-3rem);
      font-weight: bold;
      font-size: 1.2rem;
      padding: 0 1.5rem;
      background-color: $primary;
    }
  }
}

#vs1__listbox {
  max-width: 37rem;
  margin: 0 auto;
}
</style>

<style lang="scss">
.select {
  position: relative;

  &__placeholder {
    position: absolute;
    left: 2.8rem;
    top: 1.8rem;
    color: $white;
    font-size: 1.6rem;
  }
}
</style>
