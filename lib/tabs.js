class Tabs{
  constructor( options ) {
    let defaultOptions = {
      element: '',
      navSelector: '[data-role="tabs-nav"]',
      panesSelector: '[data-role="tabs-panes-list"]',
      activeClassName:'active'
    }
    this.options = Object.assign( {}, defaultOptions, options )
    this.checkOptions().bindEvent().setDefault()
  }
  checkOptions () {
    if ( !this.options.element ) {
      throw new Error('element is required')
    }
    return this
  }
  bindEvent () {
    let $ = document;
    let options = this.options
    dom.on( $.querySelector(options.element), 'click', `${ options.navSelector }>div`, ( e, el ) => {
      let index = dom.index( el )
      console.log( index )
      dom.uniqueClass($.querySelector( options.panesSelector).children[index],options.activeClassName)

    } )
    return this
  }
  setDefault () {
    document.querySelector(`${this.options.panesSelector} > div:first-child`).click()
  }
}