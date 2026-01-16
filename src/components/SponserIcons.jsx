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
    <div className='fixed bottom-0 right-0 bg-white py-3.75 px-11.5 rounded-xl z-5'>
      <div className='flex gap-11.25'>
        {sponcersIcons.map((sponser, index) => (
            <img 
                key={index}
                src={sponser.img} 
                alt={sponser.alt} 
                className='w-full h-auto max-w-12.5 max-h-12.5 object-contain'
            />
        ))}
      </div>
    </div>
  )
}

export default SponserIcons
