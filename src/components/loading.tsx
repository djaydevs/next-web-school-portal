import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full p-2" />
      <div className="flex-center space-x-4">
        <Skeleton className="mt-2 h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden h-4 w-[250px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="mt-2 h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden h-4 w-[250px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="mt-2 h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden h-4 w-[250px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="mt-2 h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden h-4 w-[250px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="mt-2 h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden h-4 w-[250px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
        <Skeleton className="hidden h-4 w-[150px] md:block" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-4">
      <Card className="flex-center m-4 flex-col">
        <Skeleton className="mt-2 h-20 w-20 rounded-full" />
        <Skeleton className="m-4 h-8 w-[500px] p-4" />
        <Skeleton className="m-4 h-8 w-[450px] p-4" />
        <Skeleton className="m-4 h-8 w-[200px] p-4" />
        <Skeleton className="m-4 h-8 w-[300px] p-4" />
        <Skeleton className="m-4 h-8 w-[100px] p-4" />
      </Card>
    </div>
  );
}
