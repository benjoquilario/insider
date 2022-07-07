import React, { useRef } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/user';
import { RiCloseFill } from 'react-icons/ri';
import Ripples from 'react-ripples';

const ChangeProfile = ({
  isProfile,
  postData,
  setPostData,
  setIsOpen,
  clear,
}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();

    if (isProfile) dispatch(updateProfile(user?.result?._id, postData));
    else dispatch(updateProfile(user?.result?._id, postData));

    setIsOpen(false);
  };

  const handleCoverPhoto = ({ type, base64 }) => {
    if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg') {
      formRef.current.reset();
      return alert('File type not supported');
    }

    setPostData({ ...postData, changeCover: base64 });
  };

  const handlePhoto = ({ type, base64 }) => {
    if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/jpg') {
      formRef.current.reset();
      return alert('File type not supported');
    }

    setPostData({ ...postData, changePhoto: base64 });
  };

  return (
    <div className="z-20 bg-gray-900 w-full md:w-2/4 max-w-screen-md m-4 h-auto shadow-md border border-gray-600 rounded-md">
      <div className="p-2 flex justify-between items-center">
        <h3 className="p-2 text-lg text-white">
          {isProfile ? 'Change Photo' : 'Change Cover Photo'}
        </h3>
        <Ripples color="#ffffff80">
          <button
            className="text-white rounded-full p-2 transition ease-in duration-75 hover:bg-gray-700"
            onClick={() => {
              setIsOpen(false);
              clear();
            }}
            aria-label="Exit change photo"
          >
            <RiCloseFill aria-hidden="true" size={25} />
          </button>
        </Ripples>
      </div>
      {/* prettier-ignore */}
      <form ref={formRef} autoComplete="off" noValidate className="" onSubmit={handleSubmit}>
        <div className="bg-gray-900 p-3 rounded-b-md">
          {isProfile ? 
            <div className="w-full h-32 bg-gray-900">
              {postData?.changePhoto && (
                <div className="relative overflow-auto ">
                  <img className="mx-auto h-24 w-24 rounded-full" src={postData?.changePhoto} alt="post" />
                  <button onClick={() => setPostData({ changePhoto: '', changeCover: '' })} className="absolute top-2 right-[200px] text-white rounded-full p-1 transition ease-in duration-75 hover:bg-gray-700 bg-gray-600"><RiCloseFill aria-hidden="true" size={22} /></button>
                </div>
              )}
            </div>
          : 
          <div className="w-full h-50 bg-gray-900">
            {postData?.changeCover && (
              <div className="relative overflow-auto h-56">
                <img src={postData?.changeCover} alt="post" />
                <button onClick={() => setPostData({ changePhoto: '', changeCover: '' })} className="absolute top-2 right-0 text-white rounded-full p-1 transition ease-in duration-75 hover:bg-gray-700 bg-gray-600"><RiCloseFill aria-hidden="true" size={22} /></button>
              </div>
            )}
          </div>
          }
          <div className="flex items-center gap-3">
            <p className="text-xs md:text-sm text-white">Upload Photo :</p>
            <div className="text-xs md:text-sm relative overflow-hidden text-white">
              {isProfile ? (
                <FileBase type="file" multiple={false} onDone={handlePhoto} />
              ) : (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={handleCoverPhoto}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center m-3">
          <Ripples color='#ffffff80' className='w-full'>
            <button
              type="submit"
              className="flex items-center justify-center bg-[#6a55fa] w-full rounded-md px-3 py-2 text-white hover:bg-[#816ffb]"
              // disabled={postData?.changePhoto.length <= 0 || postData?.changeCover.length <= 0}
            >
              {isProfile ? 'Change Photo' : 'Change Cover Photo'}
            </button>
          </Ripples>
        </div>
      </form>
    </div>
  );
};

export default ChangeProfile;
