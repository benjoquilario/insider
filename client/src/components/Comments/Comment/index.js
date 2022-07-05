import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import calculateTime from '../../../utilities/calculateTime';
import defaultImage from '../../../assets/images/default-image.png';
import Button from '../../UI/Button/Button';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import ModalComment from '../../Modal/ModalComment';

const Comment = ({ comment, userId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const refx = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (refx.current && !refx.current?.contains(event.target)) {
        setModalOpen(false);
      }
    };

    const focusTrap = event => {
      if (event.key === 'Escape') setModalOpen(false);
      if (event.key !== 'Tab') return;
    };

    document
      .getElementById('comment')
      .addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', focusTrap);

    return () => {
      document.removeEventListener('keydown', focusTrap);
    };
  }, [modalOpen]);

  return (
    <div>
      <div className="relative flex pt-2 pl-6">
        <div className="relative mt-1 block mr-2 rounded-full">
          <span className="inline">
            <Link
              to={`/profile/${comment.user._id}`}
              className="relative items-stretch inline-block shrink basis-[auto] w-full"
            >
              <div className="relative inline-block">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={comment.user.imageUrl || defaultImage}
                  alt="prof"
                />
              </div>
              <div className="absolute inset-0 rounded-full pointer-events-none"></div>
            </Link>
          </span>
        </div>
        <div className="overflow-hidden pr-4 grow mr-10 basis-0">
          <div>
            <div
              className="break-words inline-block max-w-[calc(100%_-_26px]"
              style={{ wordBreak: 'break-word' }}
            >
              <div className="relative inline-flex w-full align-middle">
                <div className="w-full min-w-0 shrink grow base-[auto]">
                  <div
                    className="relative break-words inline-block max-w-full text-white whitespace-normal rounded-2xl bg-gray-700"
                    style={{ wordBreak: 'break-word' }}
                  >
                    <div className="py-[6px] px-[12px]">
                      <span>
                        <span className="inline">
                          <Link
                            className="inline bg-gray-700"
                            to={`/profile/${comment.user._id}`}
                          >
                            <span className="inline-flex">
                              <span
                                className="font-semibold text-white text-sm max-w-full capitalize"
                                style={{ wordBreak: 'break-word' }}
                              >
                                {comment.user.name}
                              </span>
                            </span>
                          </Link>
                          <span className="text-xs text-gray-200 ml-2">
                            · {calculateTime(comment.createdAt, true)}
                          </span>
                        </span>
                      </span>
                      <div className="block pb-[4px] pt-[4px]">
                        <span
                          className="break-words"
                          style={{ wordBreak: 'break-word' }}
                        >
                          <div
                            className="text-sm"
                            style={{ wordBreak: 'break-word' }}
                          >
                            <div dir="auto" className="text-start font-sans">
                              <ShowMoreText
                                lines={6}
                                more="Show more"
                                less="...Show less"
                                className="text-start font-sans"
                                anchorClass="text-gray-300 hover:text-gray-200"
                                width={1000}
                              >
                                {comment.comment}
                              </ShowMoreText>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={refx} className="absolute top-0 right-0 w-1/2 h-0">
          {modalOpen && (
            <div className="absolute top-12 md:top-[21px] md:right-[60px] z-30 right-3 bg-gray-800 w-full md:w-1/2 h-auto rounded border border-gray-600 border-solid	shadow-xl">
              <ModalComment comment={comment} />
            </div>
          )}
          {comment.user._id === userId && (
            <div className="self-end absolute top-3 right-5">
              <Button
                onClickHandler={() => setModalOpen(prev => !prev)}
                classes="p-1 text-white rounded-full hover:bg-gray-700"
                ariaLabel="action list"
              >
                <BiDotsHorizontalRounded aria-hidden="true" size={22} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
