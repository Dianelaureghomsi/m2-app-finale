"use client";

type InputProps = {
  label?: string;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  htmlId?: string;
  placeholder?: string;
  type?: string;
  error?: string | null;
};

export function Input({
  label,
  value,
  setValue,
  htmlId,
  placeholder,
  type = "text",
  error,
}: InputProps) {
  const inputClass = `border-2 rounded-md w-full p-3 outline-none transition-colors duration-150 ${
    error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-200 focus:border-purple-500"
  }`;

  return (
    <div className="flex flex-col space-y-2 w-full mb-3">
      {label && (
        <label htmlFor={htmlId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={htmlId}
        name={htmlId}
        type={type}
        value={value}
        onChange={(e) => setValue(e)}
        className={inputClass}
        placeholder={placeholder}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
