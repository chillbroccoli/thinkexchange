import { NewProjectForm } from "~/components/forms/NewProjectForm";
import { MainLayout } from "~/components/layouts/MainLayout";

export function NewProjectView() {
  return (
    <MainLayout>
      <div className="w-[90%] sm:w-auto max-w-6xl pb-5 mx-auto mt-5">
        <NewProjectForm />
      </div>
    </MainLayout>
  );
}
