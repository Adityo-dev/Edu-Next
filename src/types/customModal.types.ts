/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

//Modal views type
export type TModalView =
  | 'DELETE_CONFIRM'
  | 'WRITE_REVIEW'
  | 'STATUS_MANAGE'
  | 'LOGIN_REQUIRED'
  | 'REFUND_DETAILS'
  | 'NONE';

//Open Modal Props
export interface IOpenModalProps {
  view: TModalView;
  data?: any;
  title?: string;
  description?: string;
}

//Modal state interface
export interface IModalState {
  isOpen: boolean;
  view: TModalView;
  data: any;
  title: string;
  description: string;
}

//Action types
export type TModalAction =
  | {
      type: 'OPEN_MODAL';
      payload: IOpenModalProps;
    }
  | { type: 'CLOSE_MODAL' };

export interface IModalContextType extends IModalState {
  openModal: (props: IOpenModalProps) => void;
  closeModal: () => void;
}
