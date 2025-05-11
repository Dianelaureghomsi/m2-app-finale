"use client";

type MessageCardProps = {
  type: "error" | "warning" | "success";
  content: string;
};

const typeStyles = {
  error: "bg-red-100 text-red-800 border border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  success: "bg-green-100 text-green-800 border border-green-300",
};

export function MessageCard({ type, content }: MessageCardProps) {
  return (
    <div className={`p-4 rounded-md ${typeStyles[type]} shadow-sm`}>
      <p className="text-sm font-medium">{content}</p>
    </div>
  );
}
