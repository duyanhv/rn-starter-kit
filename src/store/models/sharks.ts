import { createModel } from '@rematch/core';
import produce from 'immer';

export interface SharksState {
  count: number;
}

export const sharks = createModel<SharksState>({
  state: {
    count: 0,
  },
  reducers: {
    increment: produce((draftState: SharksState, payload: number) => {
      draftState.count += payload;
    }),
  },
});
