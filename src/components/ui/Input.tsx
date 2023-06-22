import { get } from "object-path";
import { useFormContext } from "react-hook-form";

import { Textarea } from "./Textarea";
import { TextInput } from "./TextInput";

type RequiredProps = {
  name: string;
};

export const Input = {
  Text: function (props: React.InputHTMLAttributes<HTMLInputElement> & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <div className="flex flex-col">
        <TextInput {...props} {...register(props.name)} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  Textarea: function (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <div className="flex flex-col">
        <Textarea {...props} {...register(props.name)} />
        {error && <p className="mt-1 text-red-500 font-xs">{error}</p>}
      </div>
    );
  },
};
