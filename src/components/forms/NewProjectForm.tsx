import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import { Input } from "~/components/ui/Input";
import { TagSelect } from "~/components/ui/TagSelect";
import { api } from "~/utils/api";
import { Routing } from "~/utils/api/Routing";
import { ClientRoutes } from "~/utils/constants/routes";
import { toast } from "~/utils/helpers/toast";
import { CreateProjectInput, createProjectSchema } from "~/utils/schemas/project.schema";

import { Button } from "../ui/Button";

const TextEditor = dynamic(() => import("../ui/TextEditor").then((mod) => mod.TextEditor), {
  ssr: false,
});

export function NewProjectForm() {
  const router = useRouter();

  const { mutateAsync } = api.project.useCreate({
    onSuccess: (data) => {
      toast({
        title: "Project created",
        description: "Your project has been created successfully",
      });

      router.push(Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug: data.slug }]));
    },
  });

  const methods = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (input: CreateProjectInput) => {
    await mutateAsync(input);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-2">
          <Input.Text name="title" placeholder="Project's title" className="text-lg" />
        </div>
        <div className="mb-2">
          <TagSelect />
        </div>
        <div className="my-2">
          <Input.Textarea
            rows={6}
            name="description"
            placeholder="Description"
            className="text-lg"
          />
        </div>
        <div>
          <TextEditor name="content" />
        </div>

        <div className="flex items-center justify-end mt-7">
          <Button intent="lime" type="submit">
            Create New Project
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
