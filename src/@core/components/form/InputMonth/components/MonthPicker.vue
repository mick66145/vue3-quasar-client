<template>
  <div class="q-date q-date--portrait q-date--portrait-standard">
    <div class="q-date__header">
      <!-- <div class="relative-position">
        <div
          class="cursor-pointer q-date__header-subtitle q-date__header-link"
          tabindex="-1"
        >
          2023
        </div>
      </div> -->
      <div class="flex q-date__header-title relative-position no-wrap">
        <div class="col relative-position">
          <div
            class="q-date__header-title-label q-date__header-link q-date__header-link--active"
            tabindex="-1"
          >
            {{ observeValue }}
          </div>
        </div>
      </div>
    </div>
    <div class="col q-date__main column" tabindex="-1">
      <div class="col q-date__content relative-position">
        <div class="q-date__view q-date__calendar">
          <div class="monthpicker-header">
            <q-btn
              dense
              :disable="minClean && minClean.getFullYear() === selectedMonth.getFullYear()"
              flat
              icon="navigate_before"
              round
              @click.stop="changeYear(false)"
            />
            {{ selectedMonth.getFullYear() }}
            <q-btn
              dense
              :disable="maxClean && maxClean.getFullYear() === selectedMonth.getFullYear()"
              flat
              icon="navigate_next"
              round
              @click.stop="changeYear(true)"
            />
          </div>
          <div class="monthpicker-months">
            <q-btn
              v-for="month in displayedMonths"
              :key="month.getTime()"
              :class="{ 'monthpicker-current': isCurrentMonth(month) }"
              :color="isSelectedMonth(month) ? color : ''"
              :disable="isDisabled(month)"
              :flat="!isSelectedMonth(month)"
              :label="month.toLocaleDateString(localeArray, {month: 'short',})"
              no-caps
              no-outline
              no-ripple
              rounded
              :text-color="isCurrentMonth(month) && !isSelectedMonth(month) ? color : ''"
              @click.stop="selectMonth(month)"
            />
          </div>
        </div>
      </div>
      <div class="q-date__actions">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: [String, Number, Date, null] },
    label: { type: String },
    color: { type: String },
    locale: { type: String },
    min: { type: String },
    max: { type: String },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const { locale, min, max } = toRefs(props)
    const interval = ref(null)
    const selectedMonth = ref(null)

    // computed
    const observeValue = computed(() => {
      const date = cleanDate(props.modelValue)
      return props.modelValue ? `${date.getFullYear()}, ${date.getMonth() + 1}月` : ''
    })
    const displayedMonths = computed(() => {
      const months = []
      for (let i = 0; i < 12; i++) {
        months.push(new Date(selectedMonth.value.getFullYear(), i))
      }
      return months
    })
    const localeArray = computed(() => {
      return locale.value ? [locale.value] : []
    })
    const maxClean = computed(() => {
      return max.value ? cleanDate(max.value) : null
    })
    const minClean = computed(() => {
      return min.value ? cleanDate(min.value) : null
    })

    // methods
    const changeYear = (up) => {
      if (up) {
        let d = new Date(selectedMonth.value)
        d.setMonth(d.getMonth() + 12)

        if (maxClean.value && d > maxClean.value) {
          d = maxClean.value
        }
        selectedMonth.value = d
      } else {
        let d = new Date(selectedMonth.value)
        d.setMonth(d.getMonth() - 12)
        if (minClean.value && d < minClean.value) {
          d = minClean.value
        }
        selectedMonth.value = d
      }
    }
    const cleanDate = (date) => {
      const d = date ? new Date(date) : new Date()
      d.setDate(1)
      d.setHours(0, 0, 0, 0)
      return isNaN(d) ? new Date() : d
    }
    const currentMonth = () => {
      return cleanDate()
    }
    const isCurrentMonth = (month) => {
      return currentMonth().getTime() === month.getTime()
    }
    const isDisabled = (month) => {
      return false
    }
    const isSelectedMonth = (month) => {
      return selectedMonth.value
        ? selectedMonth.value.getTime() === month.getTime()
        : false
    }
    const selectMonth = (date) => {
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      emit('update:modelValue', `${date.getFullYear()}-${month}`)
    }

    // watch
    watch(() => props.modelValue, (newValue) => {
      selectedMonth.value = newValue ? cleanDate(newValue) : currentMonth()
    }, { immediate: true })

    return {
      observeValue,
      displayedMonths,
      localeArray,
      maxClean,
      minClean,
      interval,
      selectedMonth,
      changeYear,
      isCurrentMonth,
      isSelectedMonth,
      isDisabled,
      selectMonth,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-date__header {
  @apply h-[60px];
}
.q-date__view {
  @apply min-h-[260px];
}
.monthpicker-current {
  font-weight: bold;
}
.monthpicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.monthpicker-months {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.monthpicker-months .q-btn {
  margin: 4px 0;
  width: 30%;
  box-shadow: none;
}

</style>
