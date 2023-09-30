import React from 'react'

function Button(props) {
  return (
    <button className="flex w-full justify-center rounded bg-primary p-3 border border-primary font-medium text-gray" onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default Button