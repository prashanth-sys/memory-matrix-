import {Component} from 'react'
import {FaArrowLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import RulesModal from '../RulesModel'
import './index.css'

class MemoryMatrix extends Component {
  state = {
    highlightedIndices: [],
    clickedIndex: new Set(),
    myArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    cells: 3,
    level: 1,
  }

  componentDidMount() {
    this.getGridButtons()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getGridButtons = () => {
    const {myArray, cells} = this.state
    const shuffledArray = myArray.sort(() => Math.random() - 0.5)
    const slicedArray = shuffledArray.slice(0, cells)
    this.setState({highlightedIndices: slicedArray, clickedIndex: new Set()})
    this.intervalId = setTimeout(this.clearHighlightIndices, 3000)
    console.log('New grid buttons:', slicedArray)
  }

  clearHighlightIndices = () => {
    this.setState({highlightedIndices: []})
    this.intervalId = setTimeout(this.checkGameStatus, 1000)
  }

  checkGameStatus = () => {
    const {clickedIndex, myArray} = this.state
    const numCells = myArray.length
    if (clickedIndex.size === numCells) {
      console.log('Proceed to next level')
      this.setState(
        prevState => ({
          level: prevState.level + 1,
          cells: prevState.cells + 1,
        }),
        this.getGridButtons(),
      )
    } else {
      this.intervalId = setTimeout(this.getGridButtons, 6000)
    }
  }

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  onClickCell = index => {
    console.log(index + 1)
    const {highlightedIndices, clickedIndex} = this.state
    const isMatch = highlightedIndices.includes(index + 1)

    if (isMatch) {
      console.log('matched')
      clickedIndex.add(index)
      this.setState({clickedIndex})
      console.log(clickedIndex)
    } else {
      console.log('not matched')
    }
  }

  render() {
    const {
      highlightedIndices,
      clickedIndex,
      isModelOpen,
      myArray,
      level,
    } = this.state

    return (
      <div className="memory-matrix-container">
        <div className="game-rules-container">
          <Link to="/memory/matrix" className="link">
            <button type="button" className="back-button">
              <FaArrowLeft className="icon" />
              <p className="back">Back</p>
            </button>
          </Link>
          <RulesModal isOpen={isModelOpen} onClose={this.toggleModel} />
          <button
            type="button"
            className="rules-button"
            onClick={this.toggleModel}
          >
            Rules
          </button>
        </div>
        <h1 className="game-heading">Memory Matrix</h1>
        <div className="level-container">
          <p className="level">Level-{level}</p>
          <p className="level">Max Level-00</p>
        </div>
        <div className="game-container">
          {Array.from({length: myArray.length}, (_, index) => (
            <button
              key={index}
              type="button"
              className={`button ${
                highlightedIndices.includes(index + 1) ? 'highlight' : ''
              } ${clickedIndex.has(index) ? 'clicked' : ''}`}
              onClick={() => this.onClickCell(index)}
            >
              {_}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default MemoryMatrix
