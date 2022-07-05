import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, updateComment } from '../../actions/posts';
import CreateComments from './CreateComment';
import Comment from './Comment';
import { CURRENT_COMMENT_ID } from '../../constants/ActionTypes';

const Comments = ({ postId, userId, postComment }) => {
  const dispatch = useDispatch();
  const [commentData, setCommentData] = useState('');
  const currentCommentId = useSelector(state => state.posts.currentCommentId);
  const posts = useSelector(state =>
    currentCommentId
      ? state.posts.posts?.find(comment => comment._id === currentCommentId)
      : null
  );
  const comment = posts?.comments?.find(
    comment => comment._id === currentCommentId
  );

  const clear = () => {
    dispatch({ type: CURRENT_COMMENT_ID, payload: 0 });
    setCommentData('');
  };

  useEffect(() => {
    if (comment) setCommentData(comment.comment);
  }, [comment]);

  const handleCreateComment = event => {
    event.preventDefault();

    if (currentCommentId === 0) {
      dispatch(commentPost(postId, commentData));
    } else {
      dispatch(updateComment(currentCommentId, commentData));
    }

    return clear();
  };

  return (
    <div className="pb-4" id="comment">
      <CreateComments
        commentData={commentData}
        setCommentData={setCommentData}
        handleCreateComment={handleCreateComment}
      />
      {postComment?.comments?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="space-y-3">
            <p className="text-gray-400 mt-2">No Comments found</p>
          </div>
        </div>
      ) : (
        <>
          {postComment?.comments?.length > 0 && (
            <ul>
              {postComment?.comments?.map(
                (comment, index) =>
                  index < 3 && (
                    <li key={index}>
                      <Comment comment={comment} userId={userId} />
                    </li>
                  )
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
