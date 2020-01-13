import { createModel } from '@rematch/core';
import produce from 'immer';

export interface DolphinsState {
  count: number;
}

export const dolphins = createModel<DolphinsState>({
  state: {
    count: 0,
  },
  reducers: {
    increment: produce((draftState: DolphinsState, payload: number) => {
      draftState.count += payload;
    }),
  },
});
