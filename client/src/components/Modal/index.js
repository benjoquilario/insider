import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/posts';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { modalVariant } from '../../utilities/framerVariant';
import Button from '../Utilities/Button';

const Modal = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute top-12 z-30 right-3 bg-gray-800 w-1/2 md:-2/5 h-auto rounded border border-gray-600 border-solid	shadow-xl"
      >
        <div className="relative">
          <ul className="p-2">
            <li className="hover:bg-gray-700 rounded py-2 px-3 transition duration-75">
              <Button
                onClickHandler={() => {
                  setCurrentId(post._id);
                  dispatch({
                    type: 'CREATE_MODAL',
                    payload: { formModalOpen: true, actionModalOpen: false },
                  });
                }}
                classes="flex items-center gap-2 w-full text-white"
              >
                <FaEdit />
                <span className="text-sm">Edit Post</span>
              </Button>
            </li>
            <li className="hover:bg-gray-700 rounded py-2 px-3 transition duration-75">
              <Button
                onClickHandler={() => dispatch(deletePost(post._id))}
                classes="flex items-center gap-2 w-full text-white"
              >
                <AiFillDelete />
                <span className="text-sm">Delete Post</span>
              </Button>
            </li>
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
