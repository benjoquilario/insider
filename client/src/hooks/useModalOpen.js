import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useModalCloser = () => {
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
      dispatch({ type: 'CURRENT_ID', payload: 0 });
    }
  };

  return { handleClickOutside, ref };
};
