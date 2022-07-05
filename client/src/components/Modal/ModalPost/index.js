import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { modalVariant } from '../../../utilities/framerVariant';
import Button from '../../UI/Button/Button';
import * as TYPES from '../../../constants/ActionTypes';

const Modal = ({ post, setIsModalOpen, setShowComments }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    setIsModalOpen(false);
    setShowComments(false);
  };

  const handleEdit = () => {
    dispatch({ type: TYPES.CURRENT_POST_ID, payload: post._id });
    dispatch({
      type: TYPES.CREATE_MODAL,
      payload: true,
    });
    setIsModalOpen(false);
    setShowComments(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute top-14 z-30 right-3 bg-gray-800 w-1/2 md:-2/5 h-auto rounded border border-gray-600 border-solid	shadow-xl"
      >
        <div className="relative">
          <ul className="w-full">
            <li className="hover:bg-gray-700 rounded px-3 transition duration-75">
              <div>
                <Button
                  onClickHandler={handleEdit}
                  ariaLabel="Edit Post"
                  classes="flex items-center py-2 gap-2 w-full text-white"
                >
                  <FaEdit />
                  <span className="text-sm">Edit Post</span>
                </Button>
              </div>
            </li>
            <li className="hover:bg-gray-700 rounded px-3 transition duration-75">
              <div>
                <Button
                  onClickHandler={handleDelete}
                  classes="flex items-center py-2 gap-2 w-full text-white"
                  ariaLabel="Delete Post"
                >
                  <AiFillDelete />
                  <span className="text-sm">Delete Post</span>
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
