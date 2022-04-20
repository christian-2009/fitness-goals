import { useState, useEffect } from "react"

export default function MainContent(): JSX.Element {
    const [weightArray, setWeightArray] = useState<string[]>([])
    const [text, setText] = useState('')

    const handleWeight = () => {
        setWeightArray([...weightArray, text])
    }

    const displayWeights = weightArray.map((weight, index) => {
        return (
             <li key={index}>{weight + 'kg'}</li>
        )
     })
    
    return (
      <>
      <div className='weight-enter-display'>
        <input
          placeholder="enter weight..."
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <button onClick = {handleWeight}>Enter</button>

        <ul className='weight-list'>{displayWeights.slice(Math.max(0, displayWeights.length-10),)}</ul>
      </div>
      </>  
    )
}