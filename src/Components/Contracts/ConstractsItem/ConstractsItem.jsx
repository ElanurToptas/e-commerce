import React from 'react'
import "./ConstractsItem.scss";

export const ConstractsItem = (props) => {
  const {header,inHeader,inText} = props;
  return (
     <div className="contracts-Item">
      <div className="contracts-content">
        <p>{header}</p>
      <div className="contracts-text">
        <p>{inHeader}</p>
        {inText.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
      </div>
      </div>
    </div>
  )
}
