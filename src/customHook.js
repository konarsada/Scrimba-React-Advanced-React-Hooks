import {useState, useEffect, useRef} from "react"

function useWordGame(startingTime = 5) {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)

    function handleChange(e) {
        const { value } = e.target
        setText(value)
    }

    function calculateWordCount(text) {
        // remove trailing white spaces
        const wordsArr = text.trim().split(" ")

        // remove empty string
        const filteredWords = wordsArr.filter(word => word !== "")
        
        return filteredWords.length
    }

    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }

    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }

    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
        else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])

    return {
            textBoxRef,
            handleChange,
            text, isTimeRunning,
            timeRemaining,
            startGame,
            wordCount
        }
}

export default useWordGame