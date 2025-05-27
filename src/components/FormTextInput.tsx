import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface TextInputProps extends React.ComponentProps<"input"> {
  label: string;
}

export const FormTextInput = <FormType extends FieldValues>({
  label,
  name,
  control,
  ...textInputProps
}: TextInputProps & UseControllerProps<FormType>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col w-full gap-y-2">
          <label className="font-semibold text-zinc-950">{label}</label>
          <input
            {...textInputProps}
            className="border-[1px] font-medium flex w-full rounded-lg p-2 border-zinc-400 shadow-md focus:border-zinc-700 focus:outline-none"
            placeholder="Digite sua url"
            value={field.value}
            onChange={field.onChange}
          />
          {fieldState.error?.message && (
            <p className="font-semibold text-base text-red-500">
              {fieldState.error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
