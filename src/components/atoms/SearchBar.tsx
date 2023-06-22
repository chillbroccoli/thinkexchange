import { useRouter } from "next/router";
import { useState } from "react";

import { ClientRoutes } from "~/utils/constants/routes";

import { TextInput } from "../ui/TextInput";

export function SearchBar({ close }: { close?: () => void }) {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${ClientRoutes.SEARCH}?q=${query}`);
    close?.();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-auto lg:w-[285px]"
        />
      </form>
    </div>
  );
}
