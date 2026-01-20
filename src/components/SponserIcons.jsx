import React from 'react';
import { BMCLogo, HDFCLogo, IITBombayLogo, ImdLogo, MCMCRLogo, } from "../assets/images"

const sponcersIcons = [
    {img: IITBombayLogo, alt: "IIT Bombay Logo"},
    {img: HDFCLogo, alt: "HDFC Logo"},
    {img: BMCLogo, alt: "BMC Logo"},
    {img: ImdLogo, alt: "IMD Logo"},
    {img: MCMCRLogo, alt: "MCMCR Logo"},
];

const SponserIcons = () => {
  return (
    <div className='fixed [@media(max-width:1100px)]:top-18 [@media(max-width:1100px)]:left-2 [@media(min-width:1201px)]:bottom-0 [@media(min-width:1201px)]:right-0 bg-white py-4 md:py-5 [@media(min-width:1201px)]:py-2 [@media(min-width:1700px)]:py-3.75 px-3 md:px-5 [@media(min-width:1201px)]:px-8 [@media(min-width:1700px)]:px-11.5 rounded-lg md:rounded-xl z-5'>
      <div className='flex [@media(max-width:1100px)]:flex-col gap-4 md:gap-8 [@media(min-width:1700px)]:gap-11.25'>
        {sponcersIcons.map((sponser, index) => (
            <img 
                key={index}
                src={sponser.img} 
                alt={sponser.alt} 
                className='w-full h-auto max-w-6 md:max-w-10 [@media(min-width:1700px)]:max-w-12.5 max-h-8 md:max-h-12.5 object-contain'
            />
        ))}
      </div>
    </div>
  )
}

export default SponserIcons
