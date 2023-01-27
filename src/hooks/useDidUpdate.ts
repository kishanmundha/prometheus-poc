import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

export function useDidUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      effect && effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
