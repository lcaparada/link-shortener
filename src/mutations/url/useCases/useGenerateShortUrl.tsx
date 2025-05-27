import { useMutation } from "@tanstack/react-query";
import { GenerateShortURLParams, GenerateShortURLResult } from "../url.types";
import { urlService } from "../url.service";

export function useGenerateShortUrl() {
  return useMutation<GenerateShortURLResult, Error, GenerateShortURLParams>({
    mutationFn: urlService.generateShortURL,
  });
}
