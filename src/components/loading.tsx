import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      <Skeleton className="w-full h-8 p-2" />
      <div className="flex-center space-x-4">
        <Skeleton className="h-10 w-10 mt-2 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="h-10 w-10 mt-2 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="h-10 w-10 mt-2 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="h-10 w-10 mt-2 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
      </div>
      <div className="flex-center space-x-4">
        <Skeleton className="h-10 w-10 mt-2 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[250px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
        <Skeleton className="hidden md:block h-4 w-[150px]" />
      </div>
    </div>
  );
}
