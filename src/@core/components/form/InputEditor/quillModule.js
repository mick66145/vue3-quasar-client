import Quill from 'quill'
import * as QuillTableUI from 'quill-table-ui'
import ImageUploader from 'quill-image-uploader'
import ImageResize from 'quill-image-resize-module--fix-imports-error'
import LoadingImage from 'quill-image-uploader/src/blots/image'
import './img-alt.css'

const EmbedBlot = Quill.import('blots/embed')

const ATTRIBUTES = ['src', 'alt', 'height', 'width']

class ImageBlotAlt extends EmbedBlot {
  static create (data) {
    const node = super.create()
    // node.setAttribute('src', data.src)
    // node.setAttribute('alt', data.alt)
    ATTRIBUTES.forEach(attribute => {
      if (data[attribute]) {
        node.setAttribute(attribute, data[attribute])
      }
    })
    node.setAttribute('data-caption', data.caption)
    return node
  }

  // insert
  static value (node) {
    const { caption } = node.dataset
    // const src = node.getAttribute('src')
    // const alt = node.getAttribute('alt')
    const res = ATTRIBUTES.reduce((values, attribute) => {
      values[attribute] = node.getAttribute(attribute)
      return values
    }, { caption })
    return res
    // return { src, alt, caption }
  }

  // attributes
  static formats (node) {
    // const format = { }
    const { caption } = node.dataset

    const res = ATTRIBUTES.reduce((values, attribute) => {
      if (node.hasAttribute(attribute)) {
        values[attribute] = node.getAttribute(attribute)
      }
      return values
    }, { caption })
    return res
    // return format
  }

  format (name, value) {
    // Handle unregistered embed formats

    if (ATTRIBUTES.includes(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

ImageBlotAlt.blotName = 'imageBlotAlt'
ImageBlotAlt.className = 'image-blot'
ImageBlotAlt.tagName = 'img'

Quill.register(ImageBlotAlt)

class MyImageUploader extends ImageUploader {
  insertToEditor (options = { alt: '', caption: '' }) {
    const { url, alt = '', caption = '' } = options
    const range = this.range
    // Delete the placeholder image
    this.quill.deleteText(range.index, 3, Quill.sources.USER)
    // Insert the server saved image
    this.quill.insertEmbed(range.index, ImageBlotAlt.blotName, { src: `${url}`, alt, caption }, Quill.sources.USER)
    // this.quill.insertEmbed(range.index, 'image', url, Quill.sources.USER)

    range.index++
    this.quill.setSelection(range, Quill.sources.USER)
  }
}

Quill.register({ 'modules/tableUI': QuillTableUI.default })
Quill.register({ 'modules/myImageUploader': MyImageUploader })
Quill.register({ 'modules/imageResize': ImageResize })

export {
  Quill,
}
