import dynamic from "next/dynamic";
import { Oxygen } from "next/font/google";
import { get } from "object-path";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "~/utils/helpers/cn";

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type TextEditorControllerProps = {
  name: string;
  content?: string;
};

export function TextEditor(props: TextEditorControllerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, props.name)?.message;

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { value, onChange } }) => (
        <>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            className={cn("text-lg bg-white border-2 border-black", oxygen.className)}
          />
          {error && <p className="mt-1 text-red-500 font-sm">{error}</p>}
        </>
      )}
    />
  );
}
