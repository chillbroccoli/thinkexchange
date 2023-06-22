import { Listbox, Transition } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { api } from "~/utils/api";

import { Badge } from "./Badge";
import { Button } from "./Button";

export function TagSelect() {
  const { control } = useFormContext();

  const { data } = api.tag.useAll();

  const options = (data || [])?.map((tag) => ({
    id: tag.id,
    name: tag.name,
  }));

  return (
    <Controller
      control={control}
      name="tags"
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <Listbox value={value} by="id" onChange={onChange} multiple>
              <div className="relative">
                <Listbox.Button as={Button} size="lg" intent="white" fullWidth className="text-lg">
                  <div className="flex flex-wrap gap-2">
                    {(value ?? []).map((item: { id: string; name: string }) => (
                      <Badge key={item.id}>{item.name}</Badge>
                    ))}
                    {!value?.length ? "Tags" : ""}
                  </div>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-50 w-full py-1 mt-1 space-y-2 overflow-auto text-base bg-white border-2 border-black shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((tag) => {
                      return (
                        <Listbox.Option
                          key={tag.id}
                          value={tag}
                          className="relative py-2 pl-10 pr-4 select-none hover:bg-cyan-700/10 text-cyan-700"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {tag.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-700">
                                  <IconCheck className="w-5 h-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {error && <p className="mt-1 text-red-500 font-sm">{error.message}</p>}
          </>
        );
      }}
    />
  );
}
