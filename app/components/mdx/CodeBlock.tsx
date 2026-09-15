import { useState } from "react";
import { motion } from "framer-motion";
import { CopyButton } from "../CopyButton";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative my-6 rounded-lg bg-muted overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
          <span className="text-sm text-muted-foreground">{filename}</span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <CopyButton value={children} />
          </motion.div>
        </div>
      )}
      <pre tabIndex={0} className="p-4 overflow-x-auto">
        <code className={language ? `language-${language}` : ""}>
          {children}
        </code>
      </pre>
    </motion.div>
  );
}
