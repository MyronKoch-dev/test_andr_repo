/**
 * ProgressBar Component
 * A visual indicator showing progress through multiple stages
 * Renders a series of bars with different opacities to show current progress
 */
import { Box, BoxProps } from "@chakra-ui/react";
import { FC, memo } from "react";

/**
 * Props interface for the ProgressBar component
 * @property {string} background - Optional custom background color for the bars
 * @property {number} stages - Total number of stages in the progress
 * @property {number} currentStage - Current stage (0-based index)
 */
interface ProgressBarProps {
  background?: string;
  stages: number;
  currentStage: number;
}

/**
 * ProgressBar component that visualizes multi-stage progress
 * Features:
 * - Memoized to prevent unnecessary re-renders
 * - Responsive grid layout
 * - Customizable appearance through props
 * - Visual distinction between completed and pending stages
 */
const ProgressBar: FC<ProgressBarProps & BoxProps> = memo(function ProgressBar({
  background,
  stages,
  currentStage,
  ...props
}) {
  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${stages}, 1fr)`, // Create equal columns for each stage
        gridGap: "10px",
        padding: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...props.sx,
      }}
    >
      {/* Generate array of stage indicators */}
      {Array.apply(null, [...Array(stages)]).map((_, idx) => (
        <Box
          key={`progress-${idx}`}
          style={{
            height: "6px",
            borderRadius: "8px",
            background: background ?? "#4277FF", // Use custom background or default blue
            opacity: currentStage >= idx ? 1 : 0.5, // Full opacity for completed stages
          }}
        />
      ))}
    </Box>
  );
});

export default ProgressBar;
