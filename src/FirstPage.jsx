import React from 'react'
import { useNavigate } from 'react-router'
function FirstPage() {
  const navigate=useNavigate()
  return (
    <div>
        <button onClick={()=>navigate('/page1')}>Page1</button>
        <button onClick={()=>navigate('/page2')}>Page2</button>
        <button onClick={()=>navigate('/page3')}>Page3</button>
    </div>
  )
}

export default FirstPage