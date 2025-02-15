import React from 'react'

export function ChartHover() {
  return (
    <div data-role="chart-hover" className="ChartHover hidden">
      <div
        data-role="chart-hover-line"
        className="absolute block top-0 h-full w-0.5 bg-current z-40"
      />
      <div
        data-role="chart-hover-circle"
        className="absolute block w-2 h-2 rounded-full border-2 border-current bg-white dark:bg-black z-50"
      />
      <div
        data-role="chart-hover-contents"
        className="absolute z-40 p-2 border border-current bg-white dark:bg-black shadow-sm text-right text-sm h-[76px] select-none pointer-events-none flex flex-col justify-center items-end"
      >
        <div data-role="chart-hover-date" className="font-bold mb-2 sm:mb-1" />
        <div data-role="chart-hover-value-a" className="text-xs xs:text-sm" />
        <div data-role="chart-hover-value-b" className="text-xs xs:text-sm" />
      </div>
    </div>
  )
}
