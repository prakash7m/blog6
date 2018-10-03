import { HandledErrorResponse } from './response.model';
import { combineLatest } from 'rxjs';

/**
 * Class for helper function to manage state, especially the meta information
 *
 * @export
 * @class StateHelper
 */
export class StateHelper {
  /**
   * State update helper for any action that has progress state
   *
   * @static
   * @param {*} state
   * @param {string} key
   * @param {boolean} [value=false]
   * @returns
   * @memberof StateHelper
   */
  public static progress(state: any, key: string, value: boolean = false) {
    return {
      ...state,
      progress: { ...state.progress, [key]: value }
    };
  }

  /**
   * State update helper for any action that has error state
   *
   * @static
   * @param {*} state
   * @param {string} key
   * @param {HandledErrorResponse} [value=null]
   * @returns
   * @memberof StateHelper
   */
  public static error(state: any, key: string, value: HandledErrorResponse = null) {
    return {
      ...state,
      error: { ...state.error, [key]: value }
    };
  }

  /**
   * State helper function for any action that has editing model state
   *
   * @static
   * @param {*} state
   * @param {*} model
   * @returns
   * @memberof StateHelper
   */
  public static editingModel(state: any, model: any) {
    return {
      ...state,
      editingModel: model
    };
  }

  /**
   * Intercepts the state and applies all the meta information without mutating the original state
   *
   * @static
   * @param {*} pstate
   * @param {*} action
   * @returns
   * @memberof StateHelper
   */
  public static interceptMeta(pstate: any, action: any) {
    let state = { ...pstate };
    if (action.meta && action.meta.progress) {
      state = { ...state, meta: { ...state.meta, progress: Object.assign({}, state.meta.progress, action.meta.progress), error: {} } };
    }
    if (action.meta && action.meta.error) {
      state = { ...state, meta: { ...state.meta, error: action.meta.error } };
    }
    if (action.meta) {
      state = { ...state, meta: { ...state.meta, editingModel: action.meta.editingModel } };
    }
    return { ...state };
  }

  /**
   * Helper function to return the state observable for a feature
   *
   * @static
   * @template T
   * @param {*} store
   * @param {*} feature
   * @param {*} key
   * @returns
   * @memberof StateHelper
   */
  public static stateForFeature<T>(store: any, feature: any, key: any) {
    return store.select(feature).select((state: T) => state[key]);
  }

  /**
   * Helper function to return the progress observable based on progress key
   * The key can be array of keys if multiple keys used for progress
   *
   * @static
   * @param {*} stateObservable
   * @param {(string | string[])} key
   * @returns
   * @memberof StateHelper
   */
  public static progressFor(stateObservable: any, key: string | string[]) {
    if (key instanceof Array) {
      const observables = [];
      key.forEach(k => {
        observables.push(this.progressFor(stateObservable, k));
      });
      return combineLatest(...observables, (...value) => {
        return value.filter(v => !!v)[0];
      });
    }
    return stateObservable.select(state => {
      if (state.meta && state.meta.progress) {
        return state.meta.progress[key] ? key : false;
      }
      return false;
    });
  }

  /**
   * Helper function to return the error observable based on error key
   * The key can be array of keys if multiple kyes used for error
   *
   * @static
   * @param {*} stateObservable
   * @param {(string | string[])} key
   * @returns
   * @memberof StateHelper
   */
  public static errorFor(stateObservable: any, key: string | string[]) {
    if (key instanceof Array) {
      const observables = [];
      key.forEach(k => {
        observables.push(this.errorFor(stateObservable, k));
      });
      return combineLatest(...observables, (...value) => {
        return value.filter(v => v !== null)[0];
      });
    }
    return stateObservable.select(state => {
      if (state.meta && state.meta.error) {
        return state.meta.error[key] || null;
      }
      return null;
    });
  }

  /**
   * Helper function to return the current editing model observable
   *
   * @static
   * @param {*} stateObservable
   * @returns
   * @memberof StateHelper
   */
  public static editingModelFor(stateObservable: any) {
    return stateObservable.select(state => {
      if (state.meta && state.meta.editingModel) {
        return state.meta.editingModel;
      }
      return null;
    });
  }
}


export interface MetaState<T> {
  progress?: { [key: string]: boolean };
  error?: { [key: string]: HandledErrorResponse };
  editingModel?: T;
}
