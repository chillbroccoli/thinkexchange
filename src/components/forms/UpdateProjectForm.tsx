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
import {
  CreateProjectInput,
  createProjectSchema,
  ProjectResponse,
} from "~/utils/schemas/project.schema";

import { Button } from "../ui/Button";

const TextEditor = dynamic(() => import("../ui/TextEditor").then((mod) => mod.TextEditor), {
  ssr: false,
});

export function UpdateProjectForm({ data }: { data: ProjectResponse }) {
  const router = useRouter();

  const { slug } = router.query as { slug: string };

  const { mutateAsync } = api.project.useUpdate(
    { slug },
    {
      onSuccess: (data) => {
        toast({
          title: "Project updated",
          description: "Your project has been updated successfully",
        });

        router.push(Routing.getInterpolatedRoute([ClientRoutes.PROJECT, { slug: data.slug }]));
      },
    }
  );

  const methods = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.tags,
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
        <div className="my-2">
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
          <TextEditor name="content" content={data.content} />
        </div>

        <div className="flex items-center justify-end mt-7">
          <Button intent="lime" type="submit">
            Update Project
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
