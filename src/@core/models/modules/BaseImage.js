import BaseMedia from './BaseMedia'

const BaseImageViewModel = (item = null) =>
  BaseMedia(
    {
      key: 'image',
      extraFields: ['title', 'alt'],
    },
    item,
  )

export default BaseImageViewModel
