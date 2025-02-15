import React from 'react'

export function Tooltip() {
  return (
    <div className="Tooltip-Popup leading-[1.15]">
      <span />
      <svg
        width="16"
        height="8"
        viewBox="0 0 16 8"
        className="Tooltip-Triangle"
      >
        <path d="M0 8L8 1L16 8" />
      </svg>
    </div>
  )
}
