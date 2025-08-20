import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";

type HabitDeleteConfirmDialogProps = Pick<
  AlertDialogProps,
  "open" | "onOpenChange"
> & {
  onConfirm: () => void;
};

export function HabitDeleteConfirmDialog(props: HabitDeleteConfirmDialogProps) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your habit and all information related
            to it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={props.onConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
