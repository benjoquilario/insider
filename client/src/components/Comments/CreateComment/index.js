import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import defaultImage from '../../../assets/images/default-image.png';

const CreateComments = ({
  commentData,
  setCommentData,
  handleCreateComment,
}) => {
  const { user } = useSelector(state => state.auth);
  const buttonRef = useRef(null);

  const handleKeyPress = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <div className="flex items-center pt-4 pl-5 pr-5">
      <form className="w-full">
        <div className="flex w-full space-x-2 items-center">
          <img
            src={user?.imageUrl || defaultImage}
            alt="profile pic"
            className="object-cover h-11 w-11 rounded-full"
          />
          <div className="flex bg-gray-900 rounded-3xl items-center w-full p-3 overflow-hidden basis-[auto] shrink">
            <div className="relative w-full">
              <textarea
                name="commentText"
                className="outline-none w-full bg-gray-900 text-sm placeholder-gray-400 font-light text-gray-200 pl-1 break-words whitespace-pre-wrap	select-text h-auto"
                style={{ wordBreak: 'break-word' }}
                type="text"
                placeholder="Write a comment..."
                value={commentData}
                onChange={e => setCommentData(e.target.value)}
                onKeyDown={handleKeyPress}
              ></textarea>
              <textarea
                style={{
                  visibility: 'hidden',
                  position: 'absolute',
                  overflow: 'hidden',
                  height: '0px',
                  top: '0px',
                  left: '0px',
                  transform: 'translateZ(0px)',
                  resize: 'none',
                  fontFamily: 'Inter',
                  width: '347.922px',
                }}
                aria-hidden="true"
                className="outline-none w-full bg-transparent text-md placeholder-gray-400 font-light"
                readOnly=""
                tabIndex="-1"
              ></textarea>
            </div>
          </div>
          <button
            ref={buttonRef}
            onClick={handleCreateComment}
            type="submit"
            className="sr-only"
          >
            Leave a comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComments;
