import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const countIncrement = (count) => {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}> */}
        {/* <button onClick={() => setCount(count + 1)}> */}
        <button onClick={() => countIncrement(count)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
