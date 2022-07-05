import React from 'react';
import Button from '../../UI/Button/Button';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../actions/posts';
import { CURRENT_COMMENT_ID } from '../../../constants/ActionTypes';

const ModalComment = ({ comment }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch({ type: CURRENT_COMMENT_ID, payload: comment._id });
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment._id));
  };

  return (
    <div className="relative">
      <ul className="p-2 flex justify-center">
        <li className="hover:bg-gray-700 rounded px-2 md:px-3 transition duration-75">
          <Button
            onClickHandler={handleEdit}
            ariaLabel="Edit Comment"
            classes="flex items-center gap-2 w-full text-white"
          >
            <FaEdit />
            <span className="text-xs md:text-sm">Edit</span>
          </Button>
        </li>
        <li className="hover:bg-gray-700 rounded px-2 md:px-3 transition duration-75">
          <Button
            onClickHandler={handleDelete}
            classes="flex items-center gap-2 w-full text-white"
            ariaLabel="Delete Comment"
          >
            <AiFillDelete />
            <span className="text-xs md:text-sm">Delete</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ModalComment;
