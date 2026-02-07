import { Check, ChevronDown, X } from 'lucide-react'
import React, { useEffect, useState } from 'react';

const ReportFloodForm = () => {
  const [saveDetails, setSaveDetails] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const flood_severity = [
    {
      tag: "Ankle Height",
      icon: 
    },
  ];

  const manageFormStep = () => {
    if(formStep < 2){
      setFormStep(prev => prev + 1)
    }
  };

  return (
    <div className='fixed inset-0 top-0 left-0 bg-[rgba(247,0,8,0.1)] backdrop-blur-xs flex items-center justify-center z-20 w-full h-screen'>
      <div className='max-w-200 w-full py-8 px-12.5 bg-[rgba(0,0,0,0.7)] rounded-[8px] relative'>
        <X
          className='absolute top-3 right-3 cursor-pointer'
          strokeWidth={1.5}
          color='#FFFFFF'
          role='button'
          tabIndex={0}
          aria-label='Close report form'
          onClick={() => window.history.back()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.history.back() }}
        />
        <div className='text-xl md:text-[25px] [@media(min-width:1700px)]:text-[36px] font-semibold text-white text-center'><h2>Report Flood</h2></div>
        <div className='flex items-center justify-between gap-3.75 my-8'>
          <span className={`bg-white h-1.5 w-1/3 rounded-2xl`}></span>
          <span className={`h-1.5 w-1/3 rounded-2xl ${formStep >= 1 ? 'bg-white' : 'bg-black'}`}></span>
          <span className={`h-1.5 w-1/3 rounded-2xl ${formStep >= 2 ? 'bg-white' : 'bg-black'}`}></span>
        </div>
        {formStep === 0 && (
          <div className=''>
            <div><h6 className='text-white text-lg md:text-[20px] [@media(min-width:1700px)]:text-2xl font-medium mb-4 [@media(min-width:1700px)]:mb-8'>Personal Information</h6></div>
            <div className='relative'>
              <label htmlFor="" className='w-full block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Name <span className='text-[#F70008]'>*</span></label>
              <input type="text" name="" id="" className='bg-[rgba(0,0,0,0.75)] py-3.5 px-5 mt-4 w-full rounded-[8px] text-[#A2A2A2] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium' />
            </div>
            <div className='mt-4 relative'>
              <label htmlFor="" className='w-full block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Contact Number <span className='italic'>(optional)</span></label>
              <input type="text" name="" id="" className='bg-[rgba(0,0,0,0.75)] py-3.5 px-5 mt-4 w-full rounded-[8px] text-[#A2A2A2] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium' />
            </div>
            <div className='mt-4 flex items-center gap-5'>
              <div className='w-[45%] relative'>
                <label htmlFor="" className='w-full block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Your Height <span className=''>(in ft)</span><span className='text-[#F70008] ml-2'>*</span></label>
                <div className='w-full flex items-center gap-5 mt-4 relative'>
                  <div className='w-full relative'>
                    <select name="" id="" className='bg-[rgba(0,0,0,0.75)] py-3.5 px-5 w-full rounded-[8px] text-[#A2A2A2] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium appearance-none'>
                      <option value="" selected disabled></option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                    <ChevronDown className='absolute top-1/2 right-2 -translate-1/2 w-5 h-5 text-[#A2A2A2] pointer-events-none' />
                  </div>
                  <span className='block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Feet</span>
                </div>
              </div>
              <div className='w-[45%] relative'>
                <label htmlFor="" className='w-full block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Your Height <span className=''>(in ft)</span><span className='text-[#F70008] ml-2'>*</span></label>
                <div className='w-full flex items-center gap-5 mt-4 relative'>
                  <div className='w-full relative'>
                    <select name="" id="" className='bg-[rgba(0,0,0,0.75)] py-3.5 px-5 w-full rounded-[8px] text-[#A2A2A2] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium appearance-none'>
                      <option value="" selected disabled></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <ChevronDown className='absolute top-1/2 right-2 -translate-1/2 w-5 h-5 text-[#A2A2A2] pointer-events-none' />
                  </div>
                  <span className='block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Inches</span>
                </div>
              </div>
            </div>
            <div className='mt-4 [@media(min-width:1700px)]:mt-8 relative'>
              <label htmlFor="saveDetails" className='flex items-center gap-4 cursor-pointer'>
                <input
                  type="checkbox"
                  className='sr-only'
                  id='saveDetails'
                  checked={saveDetails}
                  onChange={(e) => setSaveDetails(e.target.checked)}
                  aria-checked={saveDetails}
                />
                <span className='block w-6 h-6 bg-black rounded-[8px] flex items-center justify-center'>
                  <Check className={`w-5 h-5 text-white transition-opacity duration-150 ${saveDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                </span>
                <span className='block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Save these details for future reporting.</span>
              </label>
            </div>
          </div>
        )}
        {formStep === 1 && (
          <div className=''>
            <div><h6 className='text-white text-lg md:text-[20px] [@media(min-width:1700px)]:text-2xl font-medium mb-4 [@media(min-width:1700px)]:mb-8'>Flood Information</h6></div>
            <div className='relative'>
              <label htmlFor="" className='w-full block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Location <span className='text-[#F70008]'>*</span></label>
              <input type="text" name="" id="" className='bg-[rgba(0,0,0,0.75)] py-3.5 px-5 mt-4 w-full rounded-[8px] text-[#A2A2A2] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium' />
            </div>
            <div className='mt-4 relative'>
              <label htmlFor="" className='w-full block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>Flood Severity <span className='text-[#F70008]'>*</span></label>
              <div className='flex items-center justify-between'>

              </div>
            </div>
            <div className='mt-4 [@media(min-width:1700px)]:mt-8 relative'>
              <label htmlFor="saveDetails" className='flex items-center gap-4 cursor-pointer'>
                <input
                  type="checkbox"
                  className='sr-only'
                  id='saveDetails'
                  checked={saveDetails}
                  onChange={(e) => setSaveDetails(e.target.checked)}
                  aria-checked={saveDetails}
                />
                <span className='block w-6 h-6 bg-black rounded-[8px] p-1 flex items-center justify-center'>
                  <Check className={`w-4 h-4 text-white transition-opacity duration-150 ${saveDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                </span>
                <span className='block text-[#A2A2AA] text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium'>I confirm that the information provided in this flood report is accurate and true.</span>
              </label>
            </div>
          </div>
        )}
        <div className='mt-20 w-full'>
          <button type='button' onClick={manageFormStep} className='block py-3.5 px-32 cursor-pointer text-[12px] md:text-[14px] [@media(min-width:1700px)]:text-[16px] font-medium text-white bg-[#F70008] rounded-[8px] mx-auto'>Next</button>
        </div>
      </div>
    </div>
  )
}

export default ReportFloodForm;