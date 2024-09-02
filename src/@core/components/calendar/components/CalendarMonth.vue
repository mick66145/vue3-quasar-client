<template>
  <q-calendar-month
    ref="calendar"
    v-model="observeValue"
    mode="month"
    :day-min-height="90"
    :min-weekday-length="2"
    animated
    bordered
    locale="zh-TW"
    focusable
    hoverable
    no-active-date
    @change="onChange"
    @moved="onMoved"
    @click-date="onClickDate"
    @click-day="onClickDay"
    @click-workweek="onClickWorkweek"
    @click-head-workweek="onClickHeadWorkweek"
    @click-head-day="onClickHeadDay"
  >
    <template #day="{ scope: { timestamp } }">
      <template v-for="event in eventsMap[timestamp.date]" :key="event.id">
        <div :class="badgeClasses(event, 'day')" class="my-event">
          <abbr :title="event.title" class="tooltip">
            <span class="title q-calendar__ellipsis">
              {{ event.days > 1 ?`${event.title}` : `${event.title} - ${event.start_time}` }}
            </span>
          </abbr>
        </div>
      </template>
    </template>
  </q-calendar-month>
</template>

<script>
import { QCalendarMonth, addToDate, parseTimestamp } from '@quasar/quasar-ui-qcalendar/src/index.js'
import { defineComponent, ref, computed, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'
export default defineComponent({
  components: {
    QCalendarMonth,
  },
  props: {
    modelValue: { type: [String, Number] },
    event: {
      type: Array,
      default () {
        return []
      },
    },
  },
  setup (props, { emit }) {
    // data
    const calendar = ref()
    const observeValue = useVModel(props, 'modelValue', emit)
    const { event } = toRefs(props)

    // computed
    const eventsMap = computed(() => {
      const map = {}
      if (event.value.length > 0) {
        event.value.forEach((eventItem) => {
          (map[eventItem.date] = map[eventItem.date] || []).push(eventItem)
          if (eventItem.days !== undefined) {
            let timestamp = parseTimestamp(eventItem.date)
            let days = eventItem.days
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[timestamp.date]) {
                map[timestamp.date] = []
              }
              map[timestamp.date].push(eventItem)
            } while (--days > 1)
          }
        })
      }
      return map
    })

    const badgeClasses = (event, type) => {
      return {
        [`text-white bg-${event.bgcolor}`]: true,
        'rounded-border': true,
      }
    }

    const onChange = (data) => {
      // startDate.value = data.start
      // endDate.value = data.end
    }

    const moveToToday = () => {
      calendar.value.moveToToday()
    }
    const prev = () => {
      calendar.value.prev()
    }
    const next = () => {
      calendar.value.next()
    }

    // 點擊執行
    const onMoved = (data) => {}
    const onClickDate = (data) => {}
    const onClickDay = (data) => {}
    const onClickWorkweek = (data) => {}
    const onClickHeadDay = (data) => {}
    const onClickHeadWorkweek = (data) => {}

    return {
      calendar,
      observeValue,
      eventsMap,
      onChange,
      onMoved,
      onClickDate,
      onClickDay,
      onClickWorkweek,
      onClickHeadDay,
      onClickHeadWorkweek,
      badgeClasses,
      moveToToday,
      prev,
      next,
    }
  },
})
</script>

<style lang="postcss" scoped>
.my-event {
  @apply mt-[1px] relative;
  @apply w-full;
  @apply justify-center;
  @apply cursor-pointer;
  @apply text-sm overflow-ellipsis;

  overflow: hidden;
  abbr {
    &.tooltip {
      @apply no-underline;
    }
    .title {
      @apply flex relative justify-center items-center;
      @apply relative;
      @apply h-full;
    }
  }
}
.rounded-border {
  @apply rounded-sm;
}
</style>
