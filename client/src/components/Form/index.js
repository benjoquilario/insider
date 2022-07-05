import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { intitialState } from '../../utilities/intialState';
import { formVariant } from '../../utilities/framerVariant';
import capitalizeName from '../../utilities/capitalizeName';
import * as TYPES from '../../constants/ActionTypes';

const Form = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData, setPostData] = useState(intitialState);
  const currentPostId = useSelector(state => state.posts.currentPostId);
  const post = useSelector(state =>
    currentPostId
      ? state.posts.posts.find(message => message._id === currentPostId)
      : null
  );
  const dispatch = useDispatch();
  const ref = useRef(null);

  const clear = () => {
    dispatch({ type: TYPES.CURRENT_POST_ID, payload: 0 });
    setPostData(intitialState);
    dispatch({
      type: TYPES.CREATE_MODAL,
      payload: false,
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    if (currentPostId === 0)
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    else
      dispatch(
        updatePost(currentPostId, { ...postData, name: user?.result?.name })
      );

    return clear();
  };

  return (
    <motion.div
      variants={formVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="relative"
    >
      <form autoComplete="off" noValidate className="" onSubmit={handleSubmit}>
        <textarea
          ref={ref}
          aria-label={`What's on your mind, ${user?.result?.name}?`}
          className="w-full h-32 bg-gray-900 p-3 focus:outline-none rounded-t-md resize-none overflow-auto text-sm md:text-base text-white"
          placeholder={`What's on your mind, ${capitalizeName(
            user?.result?.name
          )}?`}
          value={postData.message}
          cols="30"
          rows="30"
          name="message"
          onChange={e => setPostData({ ...postData, message: e.target.value })}
        ></textarea>
        <div className="bg-gray-900 p-3 rounded-b-md">
          {postData?.selectedFile && (
            <div className="relative overflow-auto h-56">
              <img src={postData?.selectedFile} alt="post" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <p className="text-xs md:text-sm text-white">Upload Photo :</p>
            <div className="text-xs md:text-sm relative overflow-hidden text-white">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={postData.message <= 0}
            className="flex items-center justify-center m-3 bg-[#6a55fa] w-full rounded-md px-3 py-2 text-white text-sm md:text-base disabled:bg-[#6a55fa1a]"
          >
            {currentPostId ? 'Edit' : 'Create'} Post
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Form;
