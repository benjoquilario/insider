import React, { useState, useTransition } from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShowMoreText from 'react-show-more-text';
import { likePost } from '../../../actions/posts';
import { BiDotsHorizontalRounded, BiMessageDots } from 'react-icons/bi';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import ModalPost from '../../Modal/ModalPost';
import capitalizeName from '../../../utilities/capitalizeName';
import Button from '../../UI/Button/Button';
import defaultImage from '../../../assets/images/default-image.png';
import Comments from '../../Comments';
import Spinner from '../../UI/Loading/Spinner';

const Post = ({ post, postById }) => {
  const { user } = useSelector(state => state.auth);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?._id;
  const hasLikedPost = _.find(post?.likes, like => like === userId);
  const dispatch = useDispatch();
  const postComment = useSelector(state =>
    _.find(state.posts.posts, posts => posts._id === post._id)
  );

  const handleShowComment = () => {
    startTransition(() => {
      setShowComments(prev => !prev);
    });
  };

  const handleLike = () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) setLikes(post.likes.filter(id => id !== userId));
    else setLikes([...post.likes, userId]);
  };

  const LikeIcon = () => {
    if (likes?.length > 0) {
      return likes.find(like => like === userId) ? (
        <AiFillLike aria-hidden="true" size={20} />
      ) : (
        <AiOutlineLike aria-hidden="true" size={20} />
      );
    }

    return <AiOutlineLike aria-hidden="true" size={20} />;
  };

  return (
    <div className="bg-gray-800 rounded-md flex flex-col gap-1 relative z-10 overflow-hidden">
      <div className="flex gap-3 p-3">
        <Link to={`/profile/${post.creator}`} aria-label={post.name}>
          <img
            src={post?.users?.imageUrl || defaultImage}
            alt={post.name}
            className="w-11 h-11 rounded-full object-cover mx-0"
          />
        </Link>
        <div className="leading-none mr-auto self-center flex flex-col">
          <Link
            to={`/profile/${post.creator}`}
            className="text-white font-semibold block text-base"
            aria-label={post.name}
          >
            {user?._id === post?.creator ? 'You' : capitalizeName(post.name)}
          </Link>
          <span className="text-xs text-gray-300">
            {post.createdAt === '2023-06-17T10:38:33.947Z'
              ? 'Creator of Insider'
              : moment(post.createdAt).fromNow()}
          </span>
        </div>
        {user?._id === post?.creator && (
          <div className="self-end">
            <div>
              <Button
                onClickHandler={() => setIsModalOpen(prev => !prev)}
                classes="p-1 text-white rounded-full hover:bg-gray-700"
                ariaLabel="action list"
              >
                <BiDotsHorizontalRounded aria-hidden="true" size={26} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="font-normal px-3 md:px-5">
        <ShowMoreText
          lines={6}
          more="Show more"
          less="...Show less"
          anchorClass="text-gray-300 hover:text-gray-200"
          className="clamp text-sm md:text-md font-sans whitespace-pre-wrap text-white break-words"
          width={2200}
        >
          {post.message}
        </ShowMoreText>
      </div>
      {post?.selectedFile && (
        <img
          className="w-full object-cover rounded"
          src={post.selectedFile}
          alt="uploaded file"
        />
      )}
      <div className="flex justify-between items-center px-5 mt-3">
        <div className="flex items-center text-sm text-gray-300 gap-1">
          <AiOutlineLike aria-hidden="true" size={17} />
          <span>{likes?.length}</span>
        </div>
        <div className="text-sm text-gray-300">
          <span>
            {`${post?.comments?.length === 0 ? '' : post?.comments?.length}`}{' '}
            Comment
          </span>
        </div>
      </div>
      <div className="font-light pl-3 mt-1 border-t border-b border-gray-700 flex justify-around gap-3">
        <Button
          onClickHandler={handleLike}
          classes="flex-1 flex items-center justify-center gap-1 text-gray-400 py-2 px-6 hover:bg-gray-700 rounded-md"
          ariaLabel="Like Post"
        >
          <LikeIcon />
          <span
            className={classNames(
              'text-xs text-gray-400',
              hasLikedPost && 'font-bold'
            )}
          >
            Likes
          </span>
        </Button>
        <Button
          onClickHandler={handleShowComment}
          classes={`${
            showComments && 'bg-gray-700'
          } flex-1 flex items-center justify-center gap-1 text-gray-400 py-2 px-6 hover:bg-gray-700 rounded-md`}
          ariaLabel="Leave a Comment"
        >
          <BiMessageDots aria-hidden="true" size={20} />
          <span className="text-xs text-gray-400">Comment</span>
        </Button>
        <Button
          ariaLabel="Share a post"
          classes="flex-1 flex items-center justify-center gap-1 text-gray-400 py-2 px-6 hover:bg-gray-700 rounded-md"
        >
          <FaShare aria-hidden="true" size={20} />
          <span className="text-xs text-gray-400">Share</span>
        </Button>
      </div>
      <div className="relative">
        {isPending && <Spinner />}
        {showComments && (
          <Comments
            postId={post._id}
            userId={userId}
            postComment={postComment}
          />
        )}
      </div>
      {isModalOpen && (
        <ModalPost
          post={post}
          setIsModalOpen={setIsModalOpen}
          setShowComments={setShowComments}
        />
      )}
    </div>
  );
};

export default Post;
