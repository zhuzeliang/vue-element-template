<template>
  <div
    class="bili-image"
  >
    <slot v-if="loading" name="placeholder">
      <div class="bili-image-placeholder">
        <img :src="imagePlaceholder">
      </div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="bili-image-error">
        <img :src="imageError">
      </div>
    </slot>
    <img
      v-else
      class="bili-image-inner"
      v-bind="$attrs"
      :src="src"
      :style="imageStyle"
      :class="{ 'bili-image-inner-center': alignCenter }"
      v-on="$listeners"
    >
  </div>
</template>

<script>
import { getScrollContainer, isInContainer, isString, isHtmlElement, isDef, addUnit, supportWebp } from './utils'
import throttle from 'throttle-debounce/throttle'

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined
// avatar.replace(/^http(s)?:/g, '');

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
}

export default {
  name: 'BiliImage',
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    fit: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    radius: {
      type: [Number, String],
      default: null
    },
    size: {
      type: Object,
      default() {
        return {}
      }
    },
    scrollContainer: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      imagePlaceholder: require('./img/img-placeholder.svg'),
      imageError: require('./img/img-failed.svg'),
      loading: true,
      error: false,
      show: !this.lazy,
      imageWidth: 0,
      imageHeight: 0,
      isBfs: '.hdslb.com/bfs',
      supportWebp
    }
  },

  computed: {
    imageStyle() {
      const { fit } = this
      if (fit) {
        return isSupportObjectFit() ? { 'object-fit': fit } : this.getImageStyle(fit)
      }

      return {}
    },
    imageContainerStyle() {
      const style = {}
      if (isDef(this.width)) {
        style.width = addUnit(this.width)
      }
      if (isDef(this.height)) {
        style.height = addUnit(this.height)
      }

      if (isDef(this.radius)) {
        style.overflow = 'hidden'
        style.borderRadius = addUnit(this.radius)
      }
      return style
    },
    alignCenter() {
      return !isSupportObjectFit() && this.fit !== ObjectFit.FILL
    }
  },

  watch: {
    src() {
      this.show && this.loadImage()
    },
    show(val) {
      val && this.loadImage()
    }
  },

  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener()
    } else {
      this.loadImage()
    }
  },

  beforeDestroy() {
    this.lazy && this.removeLazyLoadListener()
  },

  methods: {
    loadImage() {
      // reset status
      this.loading = true
      this.error = false

      const img = new Image()
      img.onload = (e) => this.handleLoad(e, img)
      img.onerror = this.handleError.bind(this)

      // bind html attrs
      Object.keys(this.$attrs).forEach((key) => {
        const value = this.$attrs[key]
        img.setAttribute(key, value)
      })
      img.src = this.src
    },
    handleLoad(_e, img) {
      this.imageWidth = img.width
      this.imageHeight = img.height
      this.loading = false
      this.error = false
    },
    handleError(e) {
      this.loading = false
      this.error = true
      this.$emit('error', e)
    },
    handleLazyLoad() {
      if (isInContainer(this.$el, this._scrollContainer)) {
        this.show = true
        this.removeLazyLoadListener()
      }
    },
    addLazyLoadListener() {
      const { scrollContainer } = this
      let _scrollContainer = null

      if (isHtmlElement(scrollContainer)) {
        _scrollContainer = scrollContainer
      } else if (isString(scrollContainer)) {
        _scrollContainer = document.querySelector(scrollContainer)
      } else {
        _scrollContainer = getScrollContainer(this.$el)
      }

      if (_scrollContainer) {
        this._scrollContainer = _scrollContainer
        this._lazyLoadHandler = throttle(200, this.handleLazyLoad)
        _scrollContainer.addEventListener('scroll', this._lazyLoadHandler)

        this.handleLazyLoad()
      }
    },
    removeLazyLoadListener() {
      const { _scrollContainer, _lazyLoadHandler } = this

      if (!_scrollContainer || !_lazyLoadHandler) return
      _scrollContainer.removeEventListener('scroll', this._lazyLoadHandler)

      this._scrollContainer = null
      this._lazyLoadHandler = null
    },
    getImageStyle(fit) {
      const { imageWidth, imageHeight } = this
      const { clientWidth: containerWidth, clientHeight: containerHeight } = this.$el

      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

      const vertical = imageWidth / imageHeight < 1

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
      }

      switch (fit) {
        case ObjectFit.NONE:
          return { width: 'auto', height: 'auto' }
        case ObjectFit.CONTAIN:
          return vertical ? { width: 'auto' } : { height: 'auto' }
        case ObjectFit.COVER:
          return vertical ? { height: 'auto' } : { width: 'auto' }
        default:
          return {}
      }
    }
  }
}
</script>

<style lang="scss">
.bili-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  img[src=''],
  img:not([src]) {
    opacity: 0;
  }
  .bili-image-error,
  .bili-image-inner,
  .bili-image-placeholder {
    width: 100%;
    height: 100%;
  }
  .bili-image-inner {
    border: 0;
    vertical-align: top;
  }
  .bili-image-inner-center {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }
  .bili-image-error,
  .bili-image-placeholder {
    background: #f2f4f6;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      display: block;
      width: 36px;
      max-width: 40%;
    }
  }
  .bili-image-error {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #c0c4cc;
    vertical-align: middle;
  }
}
</style>
