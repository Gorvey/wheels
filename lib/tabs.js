// class Tabs{
//   constructor( options ) {
//     let defaultOptions = {
//       element: '',
//       navSelector: '[data-role="tabs-nav"]',
//       panesSelector: '[data-role="tabs-panes-list"]',
//       activeClassName:'active'
//     }
//     this.options = Object.assign( {}, defaultOptions, options )
//     this.checkOptions().bindEvent().setDefault()
//   }
//   checkOptions () {
//     if ( !this.options.element ) {
//       throw new Error('element is required')
//     }
//     return this
//   }
//   bindEvent () {
//     let $ = document;
//     let options = this.options
//     dom.on( $.querySelector(options.element), 'click', `${ options.navSelector }>div`, ( e, el ) => {
//       let index = dom.index( el )
//       console.log( index )
//       dom.uniqueClass($.querySelector( options.panesSelector).children[index],options.activeClassName)

//     } )
//     return this
//   }
//   setDefault () {
//     document.querySelector(`${this.options.panesSelector} > div:first-child`).click()
//   }
// }

class Tab {
  constructor(configs) {
    let defaultConfigs = {
      element: '',
      panesSelector: '[date-role="tab-panel"]',
      labelClassName: 'tab-label',
      labelSelector: '[date-role="tab-nav"]',
      activeClassName: 'active'
    }
    this.configs = Object.assign({}, defaultConfigs, configs)

    this.initConfigs()
      .checkConfigs()
      .createTabNav()
      .bindEvent()
      .setDefault()
      .createAddElement()
  }
  initConfigs() {
    let { element, panesSelector } = this.configs
    if (typeof element === 'string') {
      this.configs.element = document.querySelector(element)
    }
    this.configs.panelElement = document.querySelector(panesSelector)
    return this
  }
  checkConfigs() {
    if (!this.configs.element) {
      throw new Error('configs.element is required')
    }

    return this
  }

  //根据面板内容生成tab
  createTabNav() {
    let {
      labelClassName,
      element,
      panelElement,
      activeClassName
    } = this.configs
    let nav = document.createElement('section')
    nav.dataset.role = 'tab-nav'
    Array.from(panelElement.children).map((item, i) => {
      if (!item.dataset.label) {
        throw new Error('The label of the element is not set ')
      }
      let navName = item.dataset.label
      let div = document.createElement('div')
      div.innerText = navName
      div.classList.add(labelClassName)
      nav.appendChild(div)
    })

    this.configs.labelElement = nav
    element.insertBefore(nav, panelElement)
    return this
  }

  bindEvent() {
    let {
      labelClassName,
      labelElement,
      element,
      panelElement,
      activeClassName
    } = this.configs

    let clickHandle = (function () {
      let lastClick
      return function (e, el) {
        if (lastClick && lastClick === el) return
        lastClick = el
        let index = dom.index(el)
        console.log(index)
        dom.uniqueClass(panelElement.children[index], activeClassName)
        dom.uniqueClass(labelElement.children[index], activeClassName)
      }
    })()
    dom.on(element, 'click', `[class=${labelClassName}]`, clickHandle)

    return this
  }

  setDefault() {
    let { panelElement, activeClassName, labelElement } = this.configs
    panelElement.children[0].classList.add(activeClassName)
    labelElement.children[0].classList.add(activeClassName)

    return this
  }
  addNewTab() {
    let { panelElement, activeClassName, labelElement } = this.configs
    let index = [...labelElement.children].length
    this.add({ label: '新标签页', content: `内容${index}` })
  }
  add(options) {
    let {
      labelClassName,
      labelElement,
      element,
      panelElement,
      activeClassName
    } = this.configs
    let { label, content } = options
    let el = document.createElement('div')
    el.dataset.label = label
    typeof content === 'string'
      ? (el.innerText = content)
      : (el.innerHTML = content)
    // debugger
    panelElement.appendChild(el)

    let labelEl = document.createElement('div')
    labelEl.classList.add('tab-label')
    labelEl.innerText = label
    let last = document.querySelector('.add')
    labelElement.insertBefore(labelEl, last)
  }
  createAddElement() {
    let {
      labelClassName,
      labelElement,
      element,
      panelElement,
      activeClassName
    } = this.configs

    let add = document.createElement('div')
    add.innerHTML = `<svg t="1607591009989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1154" data-darkreader-inline-fill="" width="16" height="16"><path d="M933.366282 538.149567l-842.181001 0c-14.289448 0-25.874297-11.584849-25.874297-25.874297s11.584849-25.874297 25.874297-25.874297l842.181001 0c14.290471 0 25.874297 11.584849 25.874297 25.874297S947.656753 538.149567 933.366282 538.149567z" p-id="1155" fill="#8a8a8a"></path><path d="M512.275781 959.240067c-14.290471 0-25.874297-11.583826-25.874297-25.874297l0-842.181001c0-14.289448 11.583826-25.874297 25.874297-25.874297s25.874297 11.584849 25.874297 25.874297l0 842.181001C538.151102 947.656241 526.566252 959.240067 512.275781 959.240067z" p-id="1156" fill="#8a8a8a"></path></svg>`
    add.classList.add('add')
    labelElement.appendChild(add)

    dom.on(add, 'click', '.add', (e, el) => {
      this.addNewTab()
    })
  }
}
