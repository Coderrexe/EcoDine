"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogWrapper } from "@/components/shared/dialog-client";
import { houseNameForm, houseNameFormType } from "@/schema/zod-schema";
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

import { useHouseModal } from "@/hooks/use-house-modal";
import { ToastEmitter } from "@/lib/toast-emitter";
import type { House } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getHouseList } from "@/app/actions/client-index";
import { houseNameFormAction } from "@/app/actions/house-name";

const HouseName = () => {
  const { isOpen, sethasHouse, onOpen } = useHouseModal((state) => ({
    isOpen: state.isOpen,
    sethasHouse: state.sethasHouse,
    onOpen: state.onOpen,
  }));

  const [isPending, startTransition] = useTransition();
  const [HouseList, setHouseList] = useState<House[] | []>([]);

  const router = useRouter();

  const form = useForm<houseNameFormType>({
    resolver: zodResolver(houseNameForm),
    defaultValues: {
      houseName: "",
    },
  });

  const fetchHouseList = async () => {
    try {
      const HouseList = await getHouseList();
      setHouseList(HouseList);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchHouseList();
  }, [isOpen, onOpen]);

  async function onSubmit(values: houseNameFormType) {
    try {
      startTransition(async () => {
        const res = await houseNameFormAction(values);
        if (res?.redirect) {
          sethasHouse(true);
          router?.push("/food/analysis-form");
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
      title="House details"
      description="enter your college house details"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="houseName"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a House</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="choose a house name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HouseList?.map(({ houseName, id }) => (
                      <SelectItem key={id} value={houseName}>
                        {houseName}
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

export default HouseName;
