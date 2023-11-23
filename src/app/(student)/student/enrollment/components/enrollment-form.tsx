"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Enrollment, Student, enrollmentSchema } from "@/types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

interface EnrollmentFormProps {
  initialValue?: Student;
}

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: [
      "lastName",
      "firstName",
      "middleName",
      "sex",
      "age",
      "dateOfBirth",
      "address",
    ],
  },
  {
    id: "Step 2",
    name: "Parent/Guardian Information",
    fields: [
      "parentGuardianName",
      "parentGuardianAddress",
      "parentGuardianOccupation",
      "contactNumber",
    ],
  },
  { id: "Step 3", name: "Pre-Registration" },
];

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth: Date) {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const m = today.getMonth() - dateOfBirth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() <= dateOfBirth.getDate())) {
    age--;
  }
  return age;
}

const EnrollmentForm: FC<EnrollmentFormProps> = ({ initialValue }) => {
  const studentProfile = {
    dateOfBirth: initialValue?.studentProfile.dateOfBirth,
    age: calculateAge(
      new Date(initialValue?.studentProfile.dateOfBirth || "2000-01-01"),
    ),
  };
  const router = useRouter();
  const { toast } = useToast();

  // states
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(studentProfile.dateOfBirth || "2000-01-01"),
  );
  const [age, setAge] = useState(
    studentProfile.age ||
      calculateAge(new Date(studentProfile.dateOfBirth || "2000-01-01")),
  );

  // useForm and submit handler
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Enrollment>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      dateOfBirth: dateOfBirth,
    },
  });

  const { mutate: enrollmentData, isPending: isLoadingSubmit } = useMutation({
    mutationFn: (enrollment: Enrollment) => {
      return axios.put("/api/current-user", enrollment);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast({
            title: "Error",
            description:
              "Something went wrong! Please check if required fields are answered, or try again later.",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successful Pre-Registration!",
      });
      router.push("/student/enrollment");
      router.refresh();
    },
  });

  const onSubmit = (data: z.infer<typeof enrollmentSchema>) => {
    enrollmentData(data);
  };

  // for navigation
  type FieldName = keyof Enrollment;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(onSubmit)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  // useEffects
  useEffect(() => {
    setDateOfBirth(new Date(studentProfile.dateOfBirth || "2000-01-01"));
    const calculatedAge = calculateAge(
      new Date(studentProfile.dateOfBirth || "2000-01-01"),
    );
    setAge(calculatedAge);
    setValue("age", calculatedAge);
  }, [studentProfile.dateOfBirth, studentProfile.age, setValue]);

  return (
    <section className="flex flex-col justify-between pt-4">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-brown-500 py-2 pl-4 transition-colors dark:border-gold-500 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-brown-500 transition-colors dark:text-gold-500 ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-brown-500 py-2 pl-4 dark:border-gold-500 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-brown-500 dark:text-gold-500">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* form */}
      <form className="py-8" onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Check and provide your personal details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                  {/* lastName */}
                  <div className="sm:col-span-3 md:col-span-2">
                    <Label>Last Name</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="lastName"
                        defaultValue={initialValue?.studentProfile?.lastName}
                        {...register("lastName")}
                        disabled
                      />
                      {errors.lastName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* firstName */}
                  <div className="sm:col-span-3 md:col-span-2">
                    <Label>First Name</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="firstName"
                        defaultValue={initialValue?.studentProfile?.firstName}
                        {...register("firstName")}
                        disabled
                      />
                      {errors.firstName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* middleName */}
                  <div className="sm:col-span-3 md:col-span-2">
                    <Label>Middle Name</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="middleName"
                        defaultValue={
                          initialValue?.studentProfile?.middleName || ""
                        }
                        {...register("middleName")}
                        disabled
                      />
                      {errors.middleName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.middleName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* age */}
                  <div className="sm:col-span-3 md:col-span-2">
                    <Label>Age</Label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name="age"
                        defaultValue={age}
                        render={({ field }) => (
                          <Input
                            {...field}
                            onChange={(e) => setAge(Number(e.target.value))}
                            disabled
                          />
                        )}
                      />
                      {errors.age?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.age.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* dateOfBirth */}
                  <div className="w-full sm:col-span-3 md:col-span-2">
                    <Label>Date of Birth</Label>
                    <div className="mt-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !dateOfBirth && "text-muted-foreground",
                            )}
                          >
                            {dateOfBirth &&
                            !isNaN(new Date(dateOfBirth).valueOf()) ? (
                              format(dateOfBirth, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Icons.CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            {...register("dateOfBirth")}
                            selected={dateOfBirth}
                            defaultMonth={dateOfBirth || new Date()} // Add this line
                            onSelect={(date: Date | undefined) => {
                              if (date) {
                                setDateOfBirth(date);
                                // Calculate age and set it to the age field
                                const age = calculateAge(date);
                                setValue("age", age);
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.dateOfBirth?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* sex */}
                  <div className="sm:col-span-3 md:col-span-2">
                    <Label>Sex</Label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name="sex"
                        defaultValue={initialValue?.studentProfile.sex}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select sex option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="M">Male</SelectItem>
                              <SelectItem value="F">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.sex?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.sex.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* address */}
                  <div className="sm:col-span-3 md:col-span-6">
                    <Label>Address</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="address"
                        placeholder="House/Lot No., Street, Barangay, City/Town/Province"
                        defaultValue={initialValue?.studentProfile?.address}
                        {...register("address")}
                      />
                      {errors.address?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Parent/Guardian Information</CardTitle>
                <CardDescription>
                  Check and provide the parent or guardian details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                  {/* parentGuardianName */}
                  <div className="sm:col-span-3">
                    <Label>Parent/Guardian Name</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="parentGuardianName"
                        defaultValue={
                          initialValue?.studentProfile?.parentGuardianName || ""
                        }
                        {...register("parentGuardianName")}
                      />
                      {errors.parentGuardianName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.parentGuardianName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* parentGuardianOccupation */}
                  <div className="sm:col-span-3">
                    <Label>Parent/Guardian Occupation</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="parentGuardianOccupation"
                        defaultValue={
                          initialValue?.studentProfile
                            ?.parentGuardianOccupation || ""
                        }
                        {...register("parentGuardianOccupation")}
                      />
                      {errors.parentGuardianOccupation?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.parentGuardianOccupation.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* parentGuardianAddress */}
                  <div className="sm:col-span-3">
                    <Label>Parent/Guardian Address</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="parentGuardianAddress"
                        defaultValue={
                          initialValue?.studentProfile?.parentGuardianAddress ||
                          ""
                        }
                        {...register("parentGuardianAddress")}
                      />
                      {errors.parentGuardianAddress?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.parentGuardianAddress.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* contactNumber */}
                  <div className="sm:col-span-3">
                    <Label>Contact Number</Label>
                    <div className="mt-2">
                      <Input
                        type="text"
                        id="contactNumber"
                        defaultValue={
                          initialValue?.studentProfile?.contactNumber || ""
                        }
                        {...register("contactNumber")}
                      />
                      {errors.contactNumber?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.contactNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex w-full justify-end">
                <Button type="submit" disabled={isLoadingSubmit}>
                  {isLoadingSubmit ? (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}{" "}
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Pre-Registration</CardTitle>
                <CardDescription>
                  Your pre-registration for grade 12 is successful.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </motion.div>
        )}
      </form>

      {/* navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          disabled={currentStep === 0}
        >
          <Icons.ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={next}
          disabled={currentStep === steps.length - 1}
        >
          <Icons.ArrowRight className="mr-2 h-4 w-4" /> Next
        </Button>
      </div>
    </section>
  );
};

export default EnrollmentForm;
