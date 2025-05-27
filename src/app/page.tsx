"use client";

import { Button, FormTextInput } from "@/components";
import { useForm } from "react-hook-form";
import { urlSchema, URLSchemaType } from "./url-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { useGenerateShortUrl } from "@/mutations";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const { data, mutateAsync, isPending } = useGenerateShortUrl();

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`${error}`);
    }
  }

  return (
    <div className="text-zinc-600 flex flex-col items-center gap-y-6 p-5 justify-center">
      <header className="bg-white flex items-center shadow-md justify-center rounded-lg w-[700px] h-[150px]">
        <h1 className="font-semibold text-zinc-950 text-4xl">
          Encurtador de URL
        </h1>
      </header>
      <section className="w-[700px] gap-y-10 items-center flex justify-center flex-col p-8  bg-white rounded-lg shadow-md">
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

      <section className="w-[700px] gap-y-10  flex  flex-col p-8  bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zinc-950">Suas URLs</h2>
      </section>

      <section className="w-[700px] gap-y-10  flex  flex-col p-8  bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zinc-950">Relatório</h2>
      </section>
    </div>
  );
}
