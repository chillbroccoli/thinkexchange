import { TagList } from "~/components/molecules/TagList";

export function Tags() {
  return (
    <div className="p-3 px-4 bg-white border-2 border-black">
      <h4 className="pb-3 text-xl font-semibold">Tags</h4>
      <TagList />
    </div>
  );
}
