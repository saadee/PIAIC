import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './card.css';

function Card(props) {

  let [state, setState] = useState({
    hovered: false
  });

  return (
    <div className='mymainCard ' onMouseOver={() => {

      setState({ hovered: true })
    }} onMouseOut={() => {

      setState({ hovered: false })
    }}>
      <div className={state.hovered ? " hide-original" : "outline-bar BC"}></div>

      <strong className={state.hovered ? " hide-original" : "show-original BC-heading"}> Block Chain</strong>
{/* 
      <div className={state.hovered ? " hide-original" : "on-hover-div"}>

      </div>
       */}
      <div className={state.hovered ? "course-outline animated fadeIn " : "animated fadeOut"}>

          <div className={state.hovered ? " animated zoomIn on-hover BC" : "animated  zoomOut"}  >
          <div className='on-hover-inDiv'>
            <h3 className='on-hover-heading'> Block Chain</h3>
            <p className='on-hover-detail'>
              <div>span repudiandae quis error
             quia. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aliquam,hey rtegher  voluptatum!</div>
            </p>
          </div>

          </div>
        </div>

    </div>
  )
}



export default Card

