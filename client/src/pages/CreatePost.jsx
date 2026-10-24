import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import preview from '../assets/preview.png';
import {getRandomPrompt} from '../utils';
import {API_URL} from '../constants';
import {FormField, Loader} from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${API_URL}/api/v1/ann`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        });
        const data = await response.json();
        if (!response.ok) {
          alert(data?.error || data || 'Image generation failed');
          return;
        }
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please fill in the prompt');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/v1/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        const data = await response.json();
        if (!response.ok) {
          alert(data?.message || 'Failed to share post');
          return;
        }
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in the prompt and generate image');
    }
  };
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-neutral-900 text-[32px] sm:text-[40px] tracking-tight'>
          Create{' '}
          <span className='bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent'>
            Post
          </span>
        </h1>
        <p className='mt-3 text-neutral-500 text-[16px] max-w-[500px]'>
          Create imaginative and visually stunning through AI
        </p>
      </div>
      <form className='mt-14 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='Sam Smith'
            value={form.name}
            handleChange={handleChange}
            isSurpriseMe
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='panda mad scientist mixing sparkling chemicals, digital art'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-neutral-50 border-2 border-dashed border-black/15 text-neutral-900 text-sm rounded-2xl w-64 p-3 h-64 flex justify-center items-center overflow-hidden'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='absolute inset-0 w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-white/60 backdrop-blur-sm'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-6 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            disabled={generatingImg}
            className='bg-neutral-900 text-white font-medium rounded-full text-sm w-full sm:w-auto px-6 py-2.5 text-center hover:bg-neutral-700 transition disabled:opacity-60'
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-neutral-500 text-[14px]'>
            Once you have created the image you want, you can share it with
            others in the community{' '}
          </p>
          <button
            type='submit'
            className='mt-3 bg-white border border-black/15 text-neutral-900 font-medium rounded-full text-sm w-full sm:w-auto px-6 py-2.5 text-center hover:bg-neutral-50 transition'
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
