import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useModalCloser = setCurrentId => {
  const { formModalOpen } = useSelector(state => state.modal);
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    formModalOpen && (document.body.style.overflow = 'hidden');

    const focusTrap = event => {
      if (event.key === 'Escape')
        dispatch({
          type: 'CREATE_MODAL',
          payload: false,
        });
      if (event.key !== 'Tab') return;
    };

    document.addEventListener('keydown', focusTrap);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', focusTrap);
    };
  }, [formModalOpen, dispatch]);

  const handleClickOutside = event => {
    if (ref.current && !ref.current?.contains(event.target)) {
      dispatch({
        type: 'CREATE_MODAL',
        payload: false,
      });
      setCurrentId(0);
    }
  };

  return { handleClickOutside, ref };
};

export const useModalCloseX = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOutside = () => setIsModalOpen(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isModalOpen]);

  return { isModalOpen, setIsModalOpen };
};
