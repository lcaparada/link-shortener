import { apiRequest } from "@/services/api";
import {
  GenerateShortURLParams,
  GenerateShortURLResult,
} from "./url.mutation.types";

async function generateShortURL({
  originalUrl,
}: GenerateShortURLParams): Promise<GenerateShortURLResult> {
  try {
    const result = await apiRequest({
      method: "post",
      url: "/url/short-url",
      data: {
        originalUrl,
      },
    });
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
}

export const urlService = {
  generateShortURL,
};
