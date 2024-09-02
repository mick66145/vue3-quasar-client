<template>
  <q-markup-table>
    <thead>
      <tr>
        <th v-for="n in 5" :key="n" class="text-right">
          <q-skeleton animation="blink" type="text" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="n in 5" :key="n">
        <td v-for="n in 5" :key="n" class="text-left">
          <q-skeleton animation="blink" type="text" width="85px" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {},
  setup () {
    return {
    }
  },
})
</script>
<style lang="postcss" scoped>
</style>
