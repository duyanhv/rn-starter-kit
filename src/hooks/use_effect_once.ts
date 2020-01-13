import { useEffect } from 'react';

export const useEffectOnce = (func: () => void): void => useEffect(func, []);
