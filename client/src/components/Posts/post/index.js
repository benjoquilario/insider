import React, { useState } from 'react';
import moment from 'moment';
import { likePost } from '../../../actions/posts';
import { BiDotsHorizontalRounded, BiMessageDots } from 'react-icons/bi';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import Modal from '../../Modal';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import capitalizeName from '../../../utilities/capitalizeName';
import Button from '../../Utilities/Button';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?._id;
  const hasLikedPost = post?.likes?.find(like => like === userId);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) setLikes(post.likes.filter(id => id !== userId));
    else setLikes([...post.likes, userId]);
  };

  const LikeIcon = () => {
    if (likes?.length > 0) {
      return likes.find(like => like === userId) ? (
        <AiFillLike size={20} />
      ) : (
        <AiOutlineLike size={20} />
      );
    }

    return <AiOutlineLike size={20} />;
  };

  return (
    <div className="bg-gray-800 rounded-md flex flex-col gap-1 relative z-10 overflow-hidden">
      <div className="flex gap-3 p-3">
        <Link to={`profile/${post.creator}`}>
          <img
            src="https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg"
            alt="name"
            className="w-11 h-11 rounded-full object-cover mx-0"
          />
        </Link>
        <div className="leading-none mr-auto self-center flex flex-col">
          <Link
            to={`profile/${post.creator}`}
            className="text-white font-semibold block"
          >
            {user?.result?._id === post?.creator
              ? 'You'
              : capitalizeName(post.name)}
          </Link>
          <span className="text-xs text-gray-300">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
        {user?.result?._id === post?.creator && (
          <div className="self-end">
            <Button
              onClickHandler={() => setIsModalOpen(prev => !prev)}
              classes="absolute top-3 right-5 p-1 text-white rounded-full hover:bg-gray-700"
            >
              <BiDotsHorizontalRounded size={26} />
            </Button>
          </div>
        )}
      </div>
      <div className="font-normal px-5">
        <pre className="text-sm md:text-md font-sans break-words whitespace-pre-wrap text-white">
          {post.message}
        </pre>
      </div>
      {post?.selectedFile && (
        <img
          className="w-full object-cover rounded"
          src={post.selectedFile}
          alt="i"
        />
      )}
      <div className="flex justify-between items-center px-5 mt-3">
        <div className="flex items-center text-sm text-gray-300 gap-1">
          <span>{likes?.length}</span>
          <AiOutlineLike size={17} />
        </div>
        <div className="text-sm text-gray-300">
          <span>1 Comment</span>
        </div>
      </div>
      <div className="font-light pl-3 mt-1 border-t border-b border-gray-700 flex justify-around gap-3">
        <Button
          onClickHandler={handleLike}
          classes="flex-1 flex items-center justify-center gap-1 text-gray-400 py-2 px-6 hover:bg-gray-700 rounded-md"
        >
          <LikeIcon />
          <span
            className={`text-xs text-gray-400 ${hasLikedPost && 'font-bold'}`}
          >
            Likes
          </span>
        </Button>
        <Button
          onClickHandler={() => setShowComments(prev => !prev)}
          classes="flex-1 flex items-center justify-center gap-1 text-gray-400 py-2 px-6 hover:bg-gray-700 rounded-md"
        >
          <BiMessageDots size={20} />
          <span className="text-xs text-gray-400">Comment</span>
        </Button>
        <Button classes="flex-1 flex items-center justify-center gap-1 text-gray-400 py-2 px-6 hover:bg-gray-700 rounded-md">
          <FaShare size={20} />
          <span className="text-xs text-gray-400">Share</span>
        </Button>
      </div>
      {showComments && (
        <div className="pb-4">
          <div className="flex items-center pt-4 pl-5 pr-5">
            <form className="w-full">
              <div className="flex w-full space-x-2 items-center">
                <img
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  alt="profile pic"
                  className="object-cover h-11 w-11 rounded-full"
                />
                <div className="flex bg-gray-900 rounded-3xl items-center w-full p-3">
                  <textarea
                    rows="1"
                    name="commentText"
                    className="outline-none w-full bg-gray-900 text-sm placeholder-gray-400 font-light text-gray-200 pl-1"
                    type="text"
                    placeholder="Write a comment..."
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
            </form>
          </div>
        </div>
      )}

      {isModalOpen && <Modal post={post} setCurrentId={setCurrentId} />}
    </div>
  );
};

export default Post;
