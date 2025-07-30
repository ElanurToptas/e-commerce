import React from 'react'
import "./DescriptionBox.scss"

export const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
        <div className="dascriptionBox-navigator">
            <div className="descriptionBox-nav-box">
                Description
            </div>
            <div className="descriptionBox-nav-box fade">
                Reviews (122)
            </div>
        </div>
        <div className="descriptionBox-description">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Magni veritatis tenetur distinctio quos qui. Explicabo, deleniti!
                Amet corporis ut a error cupiditate, accusamus sit harum provident earum.
                Fuga, inventore unde!
            </p>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, ut sint asperiores, recusandae incidunt velit
                harum quibusdam laborum unde, sed voluptatum consectetur 
                exercitationem eos deserunt? Porro blanditiis aliquam doloribus sed.
            </p>
        </div>
    </div>
  )
}
