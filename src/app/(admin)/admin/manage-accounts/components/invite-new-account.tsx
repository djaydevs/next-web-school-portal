"use client";

import { FC, useState } from "react";

import { cn } from "@/lib/utils";
import { statuses, roles } from "@/lib/options";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InviteNewAccountProps {}

const InviteNewAccount: FC<InviteNewAccountProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-[200px]">
          <Icons.UserPlus2 className="mr-2" />
          Invite New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite New Acount</DialogTitle>
          <DialogDescription>
            Add new user by inviting them with invitation link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col justify-between space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-left">
              E-mail
            </Label>
            <Input id="email" placeholder="some@example.com" />
          </div>
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? roles.find((role) => role.value === value)?.label
                    : "Select role..."}
                  <Icons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search roles..." />
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Icons.Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === role.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {role.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteNewAccount;
