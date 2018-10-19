import { getStyle } from '@/config/mUtils'
//import { imgBaseUrl, localapi, proapi } from '@/config/env'

export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {console.log('-----binding',binding)
        // document.addEventListener('scroll',function() {
        //   console.log('-----',document.documentElement.scrollTop)
        //   console.log(window.screen.height)
        //   console.log(el.clientHeight)r
        //   if (document.documentElement.scrollTop + window.screen.height  - 120>= el.clientHeight){
        //   //if(document.documentElement.scrollTop > 500) {
        //     console.log('ssssss')
        //     binding.value()
        //   }
        // })

          const windowHeight = window.screen.height
          let height
          let setTop
          let paddingBottom
          let marginBottom
          let requestFram
          let oldScrollTop
          let scrollEl
          let heightEl
          const scrollType = el.attributes.type && el.attributes.type.value
          const scrollReduce = 2
          if (scrollType == 2) {
            scrollEl = el
            heightEl = el.children[0]
          } else {
            scrollEl = document.documentElement
            heightEl = el
          }

          el.addEventListener('touchstart', () => {alert('tstart')
            height = heightEl.clientHeight
            if (scrollType == 2) {
              height = height
            }
            setTop = el.offsetTop
            paddingBottom = getStyle(el, 'paddingBottom')
            marginBottom = getStyle(el, 'marginBottom')
          }, false)

          el.addEventListener('touchmove', () => {alert('tmove')
            loadMore()
          }, false)

          el.addEventListener('touchend', () => {alert('tend')
            oldScrollTop = scrollEl.scrollTop
            moveEnd()
          }, false)

          const moveEnd = () => {
            requestFrame = requestAnimationFrame(() => {
              if (scrollEl.scrollTop != oldScrollTop) {
                oldScrollTop = scrollEl.scrollTop
                moveEnd()
              } else {
                cancelAnimationFrame(requestFrame)
                height = heightEl.clientHeight
                loadMore()
              }
            })
          }

          const loadMore = () => {alert('loadmorer')
            if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {alert('d')
              binding.value()
            }
          }
        }
      },
    },
  },
}

export const getImgPath = {
  methods: {
    // 传递过来的图片地址需要处理后才能正常使用
    getImgPath(path) {
      let suffix
      if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      const url = `/${path.substr(0, 1)}/${path.substr(1, 2)}/${path.substr(3)}${suffix}`
      return `https://fuss10.elemecdn.com${url}`
    },
  },

}
