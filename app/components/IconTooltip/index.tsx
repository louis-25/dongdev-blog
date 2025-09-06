import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { IconPicker, IconType } from "../../utils/IconPicker";
import { cn } from "@/app/lib/utils";

interface IconTooltipProps {
  icon: IconType;
  isShowTooltip?: boolean;
  iconPrev?: React.ReactNode;
  iconNext?: React.ReactNode;
  width?: number;
  height?: number;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}
const IconTooltip = ({
  icon,
  isShowTooltip = true,
  iconPrev,
  iconNext,
  width,
  height,
  href,
  className,
  children,
}: IconTooltipProps) => {
  const Icon = IconPicker({ icon, width, height });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`${cn("flex items-center gap-2")} ${className}`}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-fit flex items-center gap-2`}
          >
            {iconPrev}
            {Icon}
            {iconNext}
          </a>
        </TooltipTrigger>
        {/* 툴팁 내용 */}
        <TooltipContent className={`${isShowTooltip ? "block" : "hidden"}`}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default IconTooltip;
