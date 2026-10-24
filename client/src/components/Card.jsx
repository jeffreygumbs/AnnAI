import React from 'react';
import download from '../assets/download.png';
import {downloadImage} from '../utils';

const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className='rounded-2xl group relative shadow-card hover:shadow-cardhover card border border-black/5 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1'>
      <img
        className='w-full h-auto object-cover'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border border-black/10 m-2 p-4 rounded-xl'>
        <p className='text-neutral-800 text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-neutral-600 text-sm'>{name}</p>
          </div>
          <button
            type='button'
            onClick={() => downloadImage(_id, photo)}
            className='outline-none bg-transparent border-none'
          >
            <img
              src={download}
              alt='download'
              className='w-6 h-6 object-contain opacity-50 hover:opacity-100 transition'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
