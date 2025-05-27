/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from "./httpClient";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface ApiRequestOptions {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const apiRequest = async <T = any>({
  method,
  url,
  data,
  params,
  headers,
}: ApiRequestOptions) => {
  try {
    const response = await httpClient.request<T>({
      method,
      url,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
