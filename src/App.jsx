import { useState } from "react"

const words = [
  // Medical
  "doctor","hospital","surgery","patient","nurse","medicine","virus","bacteria","cancer","anatomy",
  "heart","brain","kidney","liver","diabetes",

  // Science
  "physics","chemistry","biology","gravity","molecule","atom","energy","evolution","genetics","experiment",

  // Technology
  "computer","internet","software","hardware","algorithm","database","network","cybersecurity","programming","react",

  // Daily life
  "school","university","teacher","student","library","coffee","kitchen","travel","airport","market",

  // Nature & general
  "mountain","ocean","forest","desert","animal"
]

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

export default function App() {
  const [word, setWord] = useState(getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrong, setWrong] = useState(0)

  const maxWrong = 6

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

  const displayWord = word
    .split("")
    .map(l => (guessedLetters.includes(l) ? l : "_"))
    .join(" ")

  const isWinner = word.split("").every(l => guessedLetters.includes(l))
  const isLoser = wrong >= maxWrong

  function handleGuess(letter) {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters(prev => [...prev, letter])

    if (!word.includes(letter)) {
      setWrong(prev => prev + 1)
    }
  }

  function resetGame() {
    setWord(getRandomWord())
    setGuessedLetters([])
    setWrong(0)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🎯 Hangman Game</h1>

      <p style={{ fontSize: "26px", letterSpacing: "6px" }}>
        {displayWord}
      </p>

      <p>Wrong attempts: {wrong} / {maxWrong}</p>

      {isWinner && <h2 style={{ color: "lightgreen" }}>You Win 🎉</h2>}
      {isLoser && <h2 style={{ color: "red" }}>Game Over 💀 Word: {word}</h2>}

      <div style={{ marginTop: "20px" }}>
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isWinner || isLoser}
            style={{
              margin: "4px",
              padding: "10px",
              width: "40px",
              background: guessedLetters.includes(letter) ? "#334155" : "white",
              color: guessedLetters.includes(letter) ? "white" : "black"
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 25px",
          background: "#22c55e",
          color: "white",
          border: "none"
        }}
      >
        Restart
      </button>
    </div>
  )
}
