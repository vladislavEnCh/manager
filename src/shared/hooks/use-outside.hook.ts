import { useEffect, useRef, useState } from 'react';

export const useOutside = (initialVisible: boolean) => {
	const [isShow, setIsShow] = useState(initialVisible)
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    event.preventDefault()
	if (ref.current && !ref.current.contains(event.target as Node)) {
		setIsShow(false)
	}
  };

  useEffect(() => {
   

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {ref, isShow, setIsShow};
};