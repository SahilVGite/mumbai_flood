import React from 'react'

const RainfallForecast = ({RainfallForecastData}) => {
  return (
    <div className='absolute p-5 left-[calc(100%+32px)] bottom-14 bg-black rounded-xl text-[#8C8C8C] w-fit [&>*:not(:last-child)]:mb-4'>
        {RainfallForecastData.map((item) => (
          <div key={item.id} className='flex items-center gap-4'>
            <span style={{ backgroundColor: item.color }} className="w-5 h-3 rounded-full"></span>
            <p className='whitespace-nowrap text-sm'>{item.title}</p>
          </div>
        ))}
    </div>
  )
}

export default RainfallForecast