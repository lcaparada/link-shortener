import { URL } from "@/types/url.types";
import { format } from "date-fns";

type URLCardProps = URL;

export const URLCard = (params: URLCardProps) => {
  const items = [
    {
      label: "URL Original",
      value: params.originalUrl,
    },
    {
      label: "URL Encurtada",
      value: params.shortUrl,
    },
    {
      label: "Data/Hora de expiração",
      value: format(new Date(params.expiresAt), "dd/MM/yy 'às' HH:mm"),
    },
    {
      label: "Número de acessos",
      value: params.accessCount,
    },
  ];

  return (
    <div className="flex  w-full flex-col gap-y-1 p-4 rounded-md bg-zinc-200">
      {items.map((item, index) => (
        <p
          key={index}
          className="text-zinc-950 max-[376px]:text-sm  font-medium break-words"
        >
          {item.label}: <strong>{item.value}</strong>
        </p>
      ))}
    </div>
  );
};
