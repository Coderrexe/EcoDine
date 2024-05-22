"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogWrapper } from "@/components/shared/dialog-client";
import { collegeNameForm, collegeNameFormType } from "@/schema/zod-schema";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCollegeModal } from "@/hooks/use-college-modal";
import { collegeNameFormAction } from "@/app/actions/college-name";
import { ToastEmitter } from "@/lib/toast-emitter";
import { getCollegeList } from "@/app/actions/client-index";
import type { CollegeList } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CollegeName = () => {
  const { isOpen, sethasCollege } = useCollegeModal((state) => ({
    isOpen: state.isOpen,
    sethasCollege: state.sethasCollege,
    onOpen: state.onOpen,
  }));

  const [isPending, startTransition] = useTransition();
  const [collegeList, setCollegList] = useState<CollegeList[] | []>([]);

  const router = useRouter();

  const form = useForm<collegeNameFormType>({
    resolver: zodResolver(collegeNameForm),
    defaultValues: {
      collegeName: "",
    },
  });

  const fetchCollegeList = async () => {
    try {
      const collegeList = await getCollegeList();
      setCollegList(collegeList);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchCollegeList();
  }, []);

  async function onSubmit(values: collegeNameFormType) {
    try {
      startTransition(async () => {
        const res = await collegeNameFormAction(values);
        if (res?.redirect) {
          sethasCollege(true);
          router?.push("/house-name");
        }
        ToastEmitter(res);
      });
    } catch (error) {
      return null;
    }
  }

  return (
    <DialogWrapper
      isOpen={isOpen}
      onClose={() => ""}
      title="College details"
      description="enter your college details"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="collegeName"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a college</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="choose college name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collegeList?.map(({ collegeName, id }) => (
                      <SelectItem key={id} value={collegeName}>
                        {collegeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            {isPending && <Loader2 className="animate-spin mr-2 size-4 " />}
            Submit
          </Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default CollegeName;
