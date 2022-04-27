import React from 'react'
import { AiOutlineBarChart, AiOutlineHeart } from 'react-icons/ai'
import './Details.css'

const iconStyle = {
  height: '20px',
  width: '20px',
  margin: '10px', 
};

function Details() {
  return (
    <>
      <div style={{marginTop: '20px'}} className='content'>
        <AiOutlineBarChart style={iconStyle}/>
        <h1>Details</h1>
      </div>
    </>
  )
}

export default Details