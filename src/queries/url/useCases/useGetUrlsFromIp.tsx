"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/infra";
import { urlService } from "../url.queries.service";
import { GetUrlsFromIpResult } from "../url.queries.types";

export function useGetUrlsFromIp() {
  return useQuery<unknown, Error, GetUrlsFromIpResult>({
    queryKey: [QueryKeys.GetURLsFromIp],
    queryFn: async () => await urlService.getUrlsFromIp(),
  });
}
