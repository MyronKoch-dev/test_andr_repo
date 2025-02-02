/**
 * CopyButton Component
 * A reusable button component that copies text to clipboard with visual feedback
 */
import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@/theme/ui-elements";
import { ButtonProps } from "@chakra-ui/react";

/**
 * Props interface for the CopyButton component
 * @extends ButtonProps from Chakra UI
 * @property {string} text - The text to be copied to clipboard
 * @property {ButtonProps} copiedProps - Optional props to apply when text is copied
 */
interface CopyButtonProps extends ButtonProps {
  text: string;
  copiedProps?: ButtonProps;
}

/**
 * CopyButton component that provides clipboard functionality with visual feedback
 * Features:
 * - Copies text to clipboard on click
 * - Shows "Copied!" feedback for 1 second
 * - Supports custom styling for both normal and copied states
 * - Inherits all Chakra UI Button props
 */
const CopyButton: FC<CopyButtonProps> = (props) => {
  const { text, children, copiedProps = {}, ...buttonProps } = props;
  // State to track whether the copy notification is visible
  const [notification, setNotification] = useState(false);

  /**
   * Handles the copy action
   * - Shows notification
   * - Copies text to clipboard
   */
  const handleCopy = useCallback(() => {
    setNotification(true);
    navigator.clipboard.writeText(text);
  }, [text, setNotification]);

  /**
   * Effect to manage notification timeout
   * - Shows notification for 1 second
   * - Cleans up timeout on unmount or when notification changes
   */
  useEffect(() => {
    if (notification) {
      const tId = setTimeout(() => {
        setNotification(false);
      }, 1000);
      return () => {
        setNotification(false);
        clearInterval(tId);
      };
    }
  }, [notification]);

  // Render copied state with custom props
  if (notification) {
    return (
      <Button onClick={handleCopy} p="1" {...buttonProps} {...copiedProps}>
        Copied!
      </Button>
    );
  }

  // Render normal state
  return (
    <Button onClick={handleCopy} {...buttonProps}>
      {children}
    </Button>
  );
};

export default CopyButton;
