"use client";

import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { FoodList, User, foodTiming } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodWastagePercentage, ratings } from "@/constants";

// component imports here
import {
  AnalysisFormSchema,
  AnalysisFormSchemaType,
  analysisFormSubmitSchema,
} from "@/schema/zod-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { createAnalysis } from "@/app/actions/analysis";
import { ToastEmitter } from "@/lib/toast-emitter";
import StatsCard from "./food-stats";
import { toast } from "sonner";

interface AnalysisFormProps {
  foodList: FoodList[] | [];
  type: foodTiming;
  user: User | null;
}

const AnalysisForm: FC<AnalysisFormProps> = ({ foodList, type, user }) => {
  const [isPending, startTransition] = useTransition();
  const [foodStats, setFoodStats] = useState<AnalysisFormSchemaType[]>([]);
  const [options, setOptions] = useState<FoodList[]>(foodList);

  const form = useForm<AnalysisFormSchemaType>({
    resolver: zodResolver(AnalysisFormSchema),
    defaultValues: {
      foodlike: false,
      foodName: "",
      rating: 7,
      wastage: 0,
    },
  });

  function onSubmit(values: AnalysisFormSchemaType) {
    const removedOption = options?.filter(
      (e) => e?.foodName !== values?.foodName
    );
    setOptions(removedOption);
    setFoodStats((prev) => [...prev, values]);
    form.reset();
  }

  async function handleSubmit() {
    try {
      const validateFields = analysisFormSubmitSchema?.safeParse({
        foodTiming: type,
        foodStats,
      });

      if (!validateFields?.success) {
        return toast.error("Invalid fields");
      }

      startTransition(async () => {
        const res = await createAnalysis(validateFields?.data);
        if (res?.success) {
          form?.reset();
          setFoodStats([]);
          setOptions(foodList);
        }
        ToastEmitter(res);
      });
    } catch (error) {
      return null;
    }
  }

  // function for removeing card data
  const handleRemove = (foodName: string) => {
    const data = foodStats?.filter((e) => e?.foodName !== foodName);
    const newOption = foodList?.filter((e) => e?.foodName === foodName);
    setOptions((prev) => [...prev, ...newOption]);
    setFoodStats(data);
  };

  const isNormalUser = !!(user?.userRole === "USER" && foodStats?.length >= 1);

  const disableFood = !!(
    isPending ||
    !form.watch("foodName") ||
    options?.length === 0
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-8 border p-8"
      >
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          <FormField
            control={form.control}
            name="foodName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Food</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={isPending}
                        className={cn(
                          "w-full sm:w-[200px] justify-between",
                          !field?.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? options?.find(
                              (food) => food?.foodName === field?.value
                            )?.foodName
                          : "Select food"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-full sm:w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search food..." />
                      <CommandList>
                        <CommandEmpty>No food found.</CommandEmpty>
                        <CommandGroup>
                          {options?.map((food) => (
                            <CommandItem
                              value={food.foodName}
                              key={food.id}
                              onSelect={() => {
                                form?.setValue("foodName", food.foodName);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  food?.foodName === field?.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {food?.foodName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full max:w-[300px]">
                <FormLabel>Food rating</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a food to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ratings?.map((data) => (
                      <SelectItem key={data} value={`${data}`}>
                        {data} star
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="wastage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food wastage</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {foodWastagePercentage?.map((data) => (
                    <SelectItem key={data} value={`${data}`}>
                      {data} percentage
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foodlike"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Are you like this food please check it</FormLabel>
                <FormDescription>
                  Food ratings helps us to improve our food quality with public
                  user ratings.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          {foodStats?.length > 0 && (
            <Button
              disabled={isPending}
              className="bg-gradient-to-r from-blue-400 to-emerald-400 text-white"
              type="button"
              onClick={handleSubmit}
            >
              {isPending && <Loader2 className="animate-spin mr-2 size-4 " />}
              Submit your response
            </Button>
          )}

          {!isNormalUser && (
            <Button disabled={!!disableFood} variant="secondary" type="submit">
              Add a food
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {foodStats?.map((data) => (
            <StatsCard
              handleRemove={handleRemove}
              data={data}
              key={data?.foodName}
              isPending={isPending}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

export default AnalysisForm;
