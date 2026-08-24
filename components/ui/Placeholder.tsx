import { Image as ImageIcon, Video, Quote, Building2 } from "lucide-react";

type PlaceholderType = "video" | "photo" | "quote" | "logo";

type PlaceholderProps = {
  type: PlaceholderType;
  label: string;
  fieldName?: string;
  className?: string;
};

const icons: Record<PlaceholderType, typeof Video> = {
  video: Video,
  photo: ImageIcon,
  quote: Quote,
  logo: Building2,
};

// Bloco visual para conteúdo que o cliente ainda não enviou.
// Nunca preencher com dados inventados — ver PENDENCIAS.md.
export function Placeholder({
  type,
  label,
  fieldName,
  className = "",
}: PlaceholderProps) {
  const Icon = icons[type];

  return (
    <div
      className={`flex min-h-[10rem] flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line bg-navy/60 px-6 py-10 text-center ${className}`}
    >
      <Icon className="h-6 w-6 text-ivory/35" aria-hidden="true" />
      <p className="font-utility text-[0.68rem] uppercase tracking-[0.1em] text-ivory/50">
        {label}
      </p>
      {process.env.NODE_ENV !== "production" && fieldName && (
        <p className="font-utility text-[0.6rem] text-blue-soft/60">
          campo: {fieldName}
        </p>
      )}
    </div>
  );
}
