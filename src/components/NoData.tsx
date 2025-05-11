"use client";

type NoDataProps = {
  message: string;
};

export function NoData({ message }: NoDataProps) {
  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center h-40 flex items-center justify-center">
      <p className="text-purple-700 font-medium">{message}</p>
    </div>
  );
}
