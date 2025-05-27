"use client";

import { Button, FormTextInput, URLCard, URLChart } from "@/components";
import { useForm } from "react-hook-form";
import { urlSchema, URLSchemaType } from "./url-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { useGenerateShortUrl } from "@/mutations";
import { useGetUrlsFromIp } from "@/queries/url";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/infra";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const { data, mutateAsync, isPending } = useGenerateShortUrl();

  const { data: response, isLoading } = useGetUrlsFromIp();

  const queryClient = useQueryClient();

  const form = useForm<URLSchemaType>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalUrl: "",
    },
    mode: "onChange",
  });

  async function handleCopy() {
    if (data) {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleShortenURL(formData: URLSchemaType) {
    try {
      await mutateAsync(formData);
      form.reset();
      queryClient.refetchQueries({ queryKey: [QueryKeys.GetURLsFromIp] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`${error}`);
    }
  }

  return (
    <div className="min-h-screen w-full p-3  flex items-center justify-center bg-zinc-300">
      <div className="w-full flex flex-col gap-y-5  max-w-3xl items-center justify-center">
        <header className="bg-white flex items-center shadow-md justify-center rounded-lg w-full  h-[150px]">
          <h1 className="font-semibold text-zinc-950 text-4xl">
            Encurtador de URL
          </h1>
        </header>
        <section className="w-full  gap-y-10 items-center flex justify-center flex-col p-8  bg-white rounded-lg shadow-md">
          <FormTextInput
            label="URL"
            name={"originalUrl"}
            control={form.control}
          />
          {data?.shortUrl && (
            <div className="bg-zinc-100 p-6 rounded-lg items-center flex gap-x-5 justify-center">
              <span className="font-bold text-black">{data.shortUrl}</span>
              <button onClick={handleCopy}>
                {copied ? <CopyCheck color="green" /> : <Copy />}
              </button>
            </div>
          )}

          <div className="w-full flex items-center justify-center">
            <Button
              text="Encurtar URL"
              loading={isPending}
              disabled={!form.formState.isValid || isPending}
              onClick={form.handleSubmit(handleShortenURL)}
            />
          </div>
        </section>

        <section className="w-full  gap-y-10  flex  flex-col p-8  bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-zinc-950">Suas URLs</h2>

          {isLoading ? (
            <Skeleton className="flex w-full rounded-md h-[140px]" />
          ) : (
            <div className="flex flex-col gap-y-3">
              {response &&
                response.urls.map((url, index) => (
                  <URLCard key={index} {...url} />
                ))}
            </div>
          )}
        </section>

        <section className="w-full  gap-y-10  flex  flex-col p-8  bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-zinc-950">Relatório</h2>
          <URLChart data={response?.urls ?? []} />

          <h3 className="text-zinc-950 text-base font-medium">
            Período com maior volume de acessos:{" "}
            <strong>{response?.periodBusiest ?? "Dados insuficientes."}</strong>
          </h3>
        </section>
      </div>
    </div>
  );
}
