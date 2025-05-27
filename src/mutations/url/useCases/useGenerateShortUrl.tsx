"use client";

import { useMutation } from "@tanstack/react-query";
import {
  GenerateShortURLParams,
  GenerateShortURLResult,
} from "../url.mutation.types";
import { urlService } from "../url.mutations.service";

export function useGenerateShortUrl() {
  return useMutation<GenerateShortURLResult, Error, GenerateShortURLParams>({
    mutationFn: (params) => urlService.generateShortURL(params),
  });
}
