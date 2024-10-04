<template>
  <div
    :ref="setRef"
    :style="{ opacity }"
    class="input-image"
  >
    <div class="h-[202px]">
      <base-image
        class="object-cover w-full transform scale-98"
        :src="imgSrc"
      />
      <div class="flex-center row input-image-upload-actions">
        <q-icon
          class="q-mr-md"
          name="fas fa-light fa-magnifying-glass-plus"
          size="1.75rem"
          @click="onPreview(index)"
        />
        <q-icon
          v-if="showEdit"
          class="q-mr-md"
          name="edit"
          size="1.75rem"
          @click="onEdit(index)"
        />
        <q-icon
          v-if="showDelete"
          name="fas fa-solid fa-trash-can"
          size="1.75rem"
          @click="onDelete(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed, toRefs } from 'vue-demi'
import useMessageDialog from '@/hooks/useMessageDialog'
import { useDrag, useDrop } from 'vue3-dnd'

export default defineComponent({
  components: {},
  props: {
    imgSrc: { type: String },
    index: { type: Number },
    showEdit: { type: Boolean, default: true },
    showDelete: { type: Boolean, default: true },
  },
  emits: ['preview', 'edit', 'delete', 'move'],
  setup (props, { emit }) {
    // use
    const { messageDelete } = useMessageDialog()
    const [dropCollect, drop] = useDrop({
      accept: 'card',
      collect (monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover (item, monitor) {
        if (!card.value) { return }
        const dragIndex = item.index
        const hoverIndex = props.index
        if (dragIndex === hoverIndex) { return }
        const hoverBoundingRect = card.value?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top
        if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) { return }
        item.index = hoverIndex
        emit('move', { dragIndex, hoverIndex })
      },
    })
    const [collect, drag] = useDrag({
      type: 'card',
      item: () => {
        return { id: props.id, index: props.index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    // data
    const card = ref()
    const { handlerId } = toRefs(dropCollect)
    const { isDragging } = toRefs(collect)

    // computed
    const opacity = computed(() => (unref(isDragging) ? 0 : 1))

    // methods
    const onPreview = (index) => {
      emit('preview', index)
    }
    const onEdit = (index) => {
      emit('edit', index)
    }
    const onDelete = async (index) => {
      const res = await messageDelete({ title: '刪除', message: '確認刪除？' })
      if (!res) return
      emit('delete', index)
    }
    const setRef = (el) => {
      card.value = drag(drop(el))
    }

    return {
      opacity,
      setRef,
      onPreview,
      onEdit,
      onDelete,
    }
  },
})
</script>

<style lang="postcss" scoped>
.input-image {
  @apply relative;
  @apply border border-solid border-gray-500;
  .input-image-upload-actions {
    @apply h-full w-full;
    @apply top-0 left-0 absolute;
    @apply text-white text-opacity-0;
    &:hover {
      @apply bg-gray-800 bg-opacity-50;
      @apply text-opacity-100;
    }
    &::after {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
