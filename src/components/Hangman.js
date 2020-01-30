import React from 'react';
import './Hangman.css';
import {randomWords} from './Words';

import wrong0 from './images/0.jpg';
import wrong1 from './images/1.jpg';
import wrong2 from './images/2.jpg';
import wrong3 from './images/3.jpg';
import wrong4 from './images/4.jpg';
import wrong5 from './images/5.jpg';
import wrong6 from './images/6.jpg';

class Hangman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mistake : 0,
      guessed : new Set([]),
      answer: randomWords(),
      classes: "Hangman container",
      
    } 
    
    this.handleGuessed = this.handleGuessed.bind(this);
    this.reset = this.reset.bind(this);
    this.next = this.next.bind(this);
    this.lost = this.lost.bind(this);
  }

  static defaultProps = {
    images : [wrong0, wrong1, wrong2, wrong3, wrong4, wrong5, wrong6],
    maxWrong : 6
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  handleGuessed(e) {
    let alphabet = e.target.value;
    this.setState(st => ({
      guessed : st.guessed.add(alphabet),
      mistake: st.mistake + (st.answer.includes(alphabet) ? 0 : 1)
    }))
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(alphabet => (
      <button className="btn btn-lg btn-primary m-2" 
        key={alphabet} 
        value={alphabet}
        onClick={this.handleGuessed}
        disabled={this.state.guessed.has(alphabet)}
        >
        {alphabet}
      </button>
    ))
  }

  reset() {
    this.setState({
      mistake : 0,
      guessed : new Set([]),
      answer: randomWords(),
      classes: "Hangman container",
    })
  }

  next() {
    this.setState({
      answer: randomWords(),
      guessed: new Set([])
    })
  }

  lost() {
    this.setState({
      classes: "Hangman container bg-danger",
    })
  }

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    let gameStat = this.generateButtons();

    if (gameOver) {
      gameStat = "You Lost! Try Again!!"
    }

    return(
      <div className={this.state.classes}>
        <h1 className="text-center">Hangman</h1>
        <div className="float-right">
          Wrong Guesses : {this.state.mistake} of {this.props.maxWrong}
        </div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt=""/>
        </div>
        <div className="text-center py-3">
          <p>
            Guess the Nigerian State :
          </p>
          <p className="lg-space">
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <p>{gameStat}</p>
          <button className="btn btn-success m-3" 
            onClick={this.next}
            disabled={this.guessedWord().join("") !== this.state.answer ? true : false}
            >
            Next
          </button>
          <button className="btn btn-info m3" 
            onClick={this.reset}
            disabled={this.state.mistake < this.props.maxWrong ? true : false}
            >
            Reset
          </button>
        </div>
      </div>
    )
  }
}

export default Hangman