let dom = {
  /**
   * 更好的添加事件处理器
   *
   * @param {*} element 添加事件的元素
   * @param {*} eventType 事件类型
   * @param {*} selector 真实点击或触发的dom
   * @param {*} fn 执行的cb
   */
  on (element,eventType,selector,fn) {
    element.addEventListener( eventType, e => {
      let el = e.target;
      while ( !el.matches( selector ) ) {
        if ( element === el ) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el,e,el)
    } )
    return element
  },

  /**
   * 返回当前元素所在的nodeList中的索引
   * @param {*} el
   */
  index ( el ) {
    let parent = Array.from( el.parentNode.children )
    // debugger
    return parent.findIndex( item => {
      return el=== item
    })
  },

  /**
   * 首先清除nodeList中的className，然后当前元素设置上className
   * @param {*} element 设置样式的元素
   * @param {*} className 设置的样式名
   */
  uniqueClass (element,className) {
    let els = [...element.parentNode.children]
    els.forEach( item => {
      item.classList.remove(className)
    } )
    element.classList.add(className)
  }
}

