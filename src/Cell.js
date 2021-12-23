class Cell {
  static states = {
    HIDDEN: 'hidden',
    OPENED: 'opened',
    FLAGGED: 'flagged',
    EXPLODED: 'exploded',
    PRESSED: 'pressed',
  }

  constructor (x, y, element) {
    this.x = x
    this.y = y
    this.element = element
    this.isMine = false
  }

  set state(v) {
    this.element.dataset.state = v
  }

  get state() {
    return this.element.dataset.state
  }

  fill(v) {
    this.element.classList.add(`v-${v}`)
    this.element.textContent = v
  }
}

export default Cell