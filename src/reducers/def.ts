/* eslint-disable no-case-declarations */
// no actions are actually being used,
// because all widget definitions are embedded.
// so ACTION.CREATE will never be dispatched.
import Def from '../model/widget/def/Def';
import defHelper from '../persistence/defHelper';

export enum ACTION {
  CREATE = 'def_create',
}

type PayloadCreate = {
  def: Def,
};

type MyState = {
  defs: Array<Def>
};

type MyAction = {
  type: ACTION,
  payload: PayloadCreate | any,
};

const initState = {
  defs: defHelper.load(),
};

const defReducer = (state: MyState = initState, action: MyAction) => {
  switch (action.type) {
    case ACTION.CREATE: // never reach here
      const { def } = action.payload as PayloadCreate;
      const newDefs = [...state.defs, def];
      // no need to save
      return {
        defs: newDefs,
      };
    default:
      return state;
  }
};

export default defReducer;
