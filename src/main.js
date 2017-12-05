import Preact, {Component} from 'preact'
// import PropTypes from 'prop-types'

const STATE = {
  favMin: 0,
}

class FilterInput extends Component{

  constructor(){
    super()
    this.onKeyDown = this.onKeyDown.bind(this)
    this.observer = new MutationObserver(filter)
  }

  onKeyDown(ev){
    if (ev.key === 'Enter'){
      STATE.favMin = Number(ev.target.value)
      filter()
      const tweetsList = document.querySelector('.tweet').parentNode.parentNode
      this.observer.observe(tweetsList, {childList: true})
      window.scrollTo(0, 0)
    }
  }

  render(){
    return (
      <input class='x-input' placeholder='likes' onKeyDown={this.onKeyDown} />
    )
  }
}


function filter(){
  const min = STATE.favMin
  const items = Array.from(document.querySelectorAll('.tweet'))

  for (let item of items){
    let favElement = item
      .querySelector('.js-actionFavorite > .ProfileTweet-actionCount > span')

    let favoriteCount = Number(favElement && favElement.innerText)

    if (favoriteCount < min)
      item.classList.add('x-hide')
    else
      item.classList.remove('x-hide')
  }
}

function main(){
  const inputSlot = document.querySelector('#global-actions')
  Preact.render(<FilterInput />, inputSlot)
}

main()
