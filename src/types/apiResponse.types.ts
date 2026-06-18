import { BaseQueryApi } from '@reduxjs/toolkit/query';
import React from 'react';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

// Redux specific response type
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

//Global error response type
export interface IGlobalErrorResponse {
  // [x: string]: any;
  // [x: string]: any;
  success: boolean;
  message: string;
  error: string;
  statusCode: number;
}
