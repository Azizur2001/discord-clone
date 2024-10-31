import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFriendRequest } from "../../../../convex/functions/friend";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

export function AddFriend() {
  const [open, setOpen] = useState(false);
  const createFriendRequest = useMutation(
    api.functions.friend.createFriendRequest
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createFriendRequest({ username: e.currentTarget.username.value });
      toast.success("Friend request sent");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to send friend request", {
        description:
          error instanceof Error ? error.message : "An unknown error occured",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Friend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            You can add a friend by their username.
          </DialogDescription>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>
          <DialogFooter>
            <Button>Send Friend Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// export function AddFriend() {
//   const [open, setOpen] = useState(false);
//   const createFriendRequest =
//     // useMutation();
//     // api.functions.friends.createFriendRequest
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await createFriendRequest({ username: e.currentTarget.username.value });
//       toast.success("Friend request sent");
//       setOpen(false);
//     } catch (error) {
//       toast.error("Failed to send friend request", {
//         description: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   };

// export default function FriendsPage() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button size="sm">Add Friend</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle className="text-center">Add Friend</DialogTitle>
//           <DialogDescription className="text-center">
//             You can add friends by entering their username below.
//           </DialogDescription>
//         </DialogHeader>
//         <form className="contents">
//           <div className="flex flex-col gap-1">
//             <Label htmlFor="username">Username</Label>
//             <Input id="username" type="text" />
//           </div>
//           <DialogFooter>
//             <Button className="w-full">Send Friend Request</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
