<template>
  <div class="row py-2 justify-center">
    <div class="col-12">
      <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />
      <div class="flex-nowrap flex justify-center items-center">
        <div class="text-xl">{{ formattedMonth }}</div>
      </div>
      <!-- <div class="row q-ma-sm q-gutter-sm justify-center">
        <input-select
          v-model="selectedCalendar"
          class="<sm:w-full"
          label="月曆模式"
          dense
          option-value="value"
          option-label="label"
          :options="calendarOptions"
        />
        <input-select
          v-model="selectedView"
          class="<sm:w-full"
          label="月曆顯示"
          dense
          option-value="value"
          option-label="label"
          :disable="selectedCalendar.value === 'month'"
          :options="calendarViewOptions"
        />
      </div> -->
    </div>
    <!--  -->
    <div class="col-11">
      <calendar-month
        ref="calendar"
        v-model="selectedDate"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import CalendarMonth from './components/CalendarMonth.vue'
import { defineComponent, ref, computed } from 'vue'
import { today } from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendar.sass'

export default defineComponent({
  components: {
    NavigationBar,
    CalendarMonth,
  },
  props: {
    modelValue: { type: [String, Number] },
    event: {
      type: Array,
      default () {
        // { id,title,details,date,time,duration,bgcolor,icon,days}
        return []
      },
    },
  },
  setup () {
    // data
    const calendar = ref(null)
    const selectedCalendar = ref('month')
    const selectedView = ref('day')
    const selectedDate = ref(today())
    // const calendarOptions = ref([
    //   { label: '日', value: 'day' },
    //   { label: '月', value: 'month' },
    // ])
    // const calendarViewOptions = ref([
    //   { label: '日', value: 'day' },
    //   { label: '週', value: 'week' },
    //   { label: '月', value: 'month' },
    // ])

    // computed
    const formattedMonth = computed(() => {
      const date = new Date(selectedDate.value)
      const monthFormatter = () => {
        return new Intl.DateTimeFormat('zh-TW', {
          month: 'long',
          timeZone: 'UTC',
        })
      }
      return date.getFullYear() + ' ' + monthFormatter().format(date)
    })
    const selectedCalendarValue = computed(() => {
      return selectedCalendar.value.value
    })
    const selectedViewValue = computed(() => {
      return selectedView.value.value
    })
    // 頁數按鈕
    const onToday = () => { calendar.value.moveToToday() }
    const onPrev = () => { calendar.value.prev() }
    const onNext = (data) => { calendar.value.next() }

    return {
      calendar,
      selectedCalendar,
      selectedView,
      selectedDate,
      // calendarOptions,
      // calendarViewOptions,
      formattedMonth,
      selectedCalendarValue,
      selectedViewValue,
      onToday,
      onPrev,
      onNext,
    }
  },
})
</script>
