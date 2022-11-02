import React, {useEffect} from 'react';

export const useDebouncedText = (input: string, time: number = 500) => {
  const [value, setValue] = React.useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(input);
    }, time);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return {value};
};
