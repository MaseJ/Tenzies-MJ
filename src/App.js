import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"



export default function App() {

    // State
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    // State to track high scores
    const [turns, setTurns] = React.useState(0)
    const [score, SetScore] = React.useState(JSON.parse(localStorage.getItem("Score")) | [0])
    // State to track time
    const [seconds, setSeconds] = React.useState(0)
    const [isActive, setIsActive] = React.useState(false)
    const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem("Time")) | [0])

    React.useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    // Hook to check for winner for every roll
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        
        if(isActive === false){
            setIsActive(!isActive)
        }

        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue) {
            setTenzies(true)

            const highScore = JSON.parse(localStorage.getItem("Score"))
            const currentScore = turns
            const bestSeconds = JSON.parse(localStorage.getItem("Time"))
            const currentTime = seconds

            // If game is over (tenzies is true)
            // Check score to highscore
            // If highscore is null means it is the first play through
            // and we will just set the current score to highscore
            if(highScore !== null){
                if(currentScore < highScore){
                    SetScore(currentScore)
                    localStorage.setItem("Score", JSON.stringify(currentScore))
                }
            } else {
                localStorage.setItem("Score", JSON.stringify(currentScore))
                SetScore(currentScore)
            }


            // Doing same as above but with the time
            if(bestSeconds !== null){
                if(currentTime < bestSeconds){
                    setBestTime(currentTime)
                    localStorage.setItem("Time", JSON.stringify(currentTime))
                }
            } else {
                setBestTime(currentTime)
                localStorage.setItem("Time", JSON.stringify(currentTime))
            }

            setSeconds(0)
            setIsActive(!isActive)

        }

    }, [dice])


    // Functions
    
    // Used to create new set of dice...
    // Start of game or when roll is clicked
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setTurns(turns + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setTurns(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    // Variable to pass all dice and values to Die.js
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies ? <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
            /> : ""}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.Click each die to freeze it at its current value between rolls.</p>
            
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <div className="score--container">
                
                <p className="best--time">Best Time: {bestTime} Seconds</p>
                <p className="current--score">Current Score: {turns} Turns</p>
                <p className="best--score">Best Score: {score} Turns</p>
            </div>
        </main>
    )
}