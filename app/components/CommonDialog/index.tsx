import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

interface CommonDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}
const CommonDialog = ({
  title,
  description,
  children,
  trigger = "Open",
}: CommonDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
