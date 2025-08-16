import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCw, Maximize2, Move, Copy, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Function to generate SVG line drawings for different furniture types
const generateFurnitureDrawing = (
  type: string,
  width: number,
  height: number,
) => {
  const strokeWidth = 2;
  const stroke = "#374151";
  const fill = "none";

  switch ((type || "").toLowerCase()) {
    case "bed":
    case "queen-bed":
    case "king-bed":
    case "twin-bed":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Bed frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Headboard */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height="8"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#f3f4f6"
          />
          {/* Pillows */}
          <rect
            x="6"
            y="6"
            width={Math.min(width / 3, 20)}
            height="6"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <rect
            x={width - Math.min(width / 3, 20) - 6}
            y="6"
            width={Math.min(width / 3, 20)}
            height="6"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
        </svg>
      );

    case "sofa":
    case "sectional":
    case "loveseat":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Main body */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Back cushions */}
          <rect
            x="6"
            y="6"
            width={width - 12}
            height="6"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          {/* Seat cushions */}
          <rect
            x="6"
            y={height / 2 - 2}
            width={(width - 12) / 2 - 2}
            height={height / 2 - 6}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <rect
            x={width / 2 + 2}
            y={height / 2 - 2}
            width={(width - 12) / 2 - 2}
            height={height / 2 - 6}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          {/* Arms */}
          <rect
            x="2"
            y="4"
            width="4"
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <rect
            x={width - 6}
            y="4"
            width="4"
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "armchair":
    case "recliner":
    case "office-chair":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Seat */}
          <rect
            x="4"
            y={height / 2}
            width={width - 8}
            height={height / 2 - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Back */}
          <rect
            x="6"
            y="4"
            width={width - 12}
            height={height / 2 + 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Arms */}
          <rect
            x="2"
            y={height / 3}
            width="4"
            height={height / 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <rect
            x={width - 6}
            y={height / 3}
            width="4"
            height={height / 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "dining-table":
    case "coffee-table":
    case "side-table":
    case "round-dining-table":
    case "breakfast-table":
      if (type?.includes("round")) {
        const radius = Math.min(width, height) / 2 - 4;
        const centerX = width / 2;
        const centerY = height / 2;
        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill={fill}
            />
            {/* Table legs */}
            <circle
              cx={centerX - radius / 2}
              cy={centerY - radius / 2}
              r="2"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
            <circle
              cx={centerX + radius / 2}
              cy={centerY - radius / 2}
              r="2"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
            <circle
              cx={centerX - radius / 2}
              cy={centerY + radius / 2}
              r="2"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
            <circle
              cx={centerX + radius / 2}
              cy={centerY + radius / 2}
              r="2"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
          </svg>
        );
      }
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Table top */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Table legs */}
          <circle
            cx="6"
            cy="6"
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width - 6}
            cy="6"
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx="6"
            cy={height - 6}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width - 6}
            cy={height - 6}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "dining-chair":
    case "bar-stool":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Seat */}
          <rect
            x="2"
            y={height / 2}
            width={width - 4}
            height={height / 2 - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Back */}
          <rect
            x="4"
            y="2"
            width={width - 8}
            height={height / 2 + 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "desk":
    case "l-shaped-desk":
      if (type?.includes("l-shaped")) {
        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
            {/* Main desk surface */}
            <rect
              x="2"
              y="2"
              width={width * 0.7}
              height={height - 4}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill={fill}
            />
            {/* L extension */}
            <rect
              x={width * 0.7}
              y="2"
              width={width * 0.3 - 2}
              height={height * 0.6}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill={fill}
            />
            {/* Legs */}
            <rect
              x="4"
              y={height - 8}
              width="3"
              height="6"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
            <rect
              x={width * 0.7 - 6}
              y={height - 8}
              width="3"
              height="6"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
            <rect
              x={width - 6}
              y="4"
              width="3"
              height="6"
              stroke={stroke}
              strokeWidth="1"
              fill={stroke}
            />
          </svg>
        );
      }
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Desk surface */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Legs */}
          <rect
            x="4"
            y={height - 8}
            width="3"
            height="6"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <rect
            x={width - 7}
            y={height - 8}
            width="3"
            height="6"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "nightstand":
    case "dresser":
    case "buffet":
    case "credenza":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Main body */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Drawers */}
          <line
            x1="6"
            y1={height / 3}
            x2={width - 6}
            y2={height / 3}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="6"
            y1={(height * 2) / 3}
            x2={width - 6}
            y2={(height * 2) / 3}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Handles */}
          <circle
            cx={width - 8}
            cy={height / 6}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width - 8}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width - 8}
            cy={(height * 5) / 6}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "bookshelf":
    case "bookcase":
    case "china-cabinet":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Shelves */}
          <line
            x1="2"
            y1={height / 4}
            x2={width - 2}
            y2={height / 4}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="2"
            y1={height / 2}
            x2={width - 2}
            y2={height / 2}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="2"
            y1={(height * 3) / 4}
            x2={width - 2}
            y2={(height * 3) / 4}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Books representation */}
          <rect
            x="4"
            y="4"
            width="3"
            height={height / 4 - 6}
            stroke={stroke}
            strokeWidth="0.5"
            fill={fill}
          />
          <rect
            x="8"
            y="4"
            width="2"
            height={height / 4 - 6}
            stroke={stroke}
            strokeWidth="0.5"
            fill={fill}
          />
          <rect
            x="11"
            y="4"
            width="4"
            height={height / 4 - 6}
            stroke={stroke}
            strokeWidth="0.5"
            fill={fill}
          />
        </svg>
      );

    case "refrigerator":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Main body */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Door split */}
          <line
            x1="2"
            y1={height * 0.6}
            x2={width - 2}
            y2={height * 0.6}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Handles */}
          <rect
            x={width - 6}
            y={height * 0.3}
            width="2"
            height="4"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <rect
            x={width - 6}
            y={height * 0.8}
            width="2"
            height="4"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "stove":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Main body */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Burners */}
          <circle
            cx={width * 0.25}
            cy={height * 0.25}
            r="4"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.25}
            r="4"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <circle
            cx={width * 0.25}
            cy={height * 0.75}
            r="4"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.75}
            r="4"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
        </svg>
      );

    case "toilet":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Tank */}
          <rect
            x="4"
            y="2"
            width={width - 8}
            height={height * 0.4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Bowl */}
          <ellipse
            cx={width / 2}
            cy={height * 0.75}
            rx={width / 2 - 4}
            ry={height * 0.25 - 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "bathtub":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Tub outline */}
          <ellipse
            cx={width / 2}
            cy={height / 2}
            rx={width / 2 - 2}
            ry={height / 2 - 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Faucet */}
          <circle
            cx={width * 0.8}
            cy={height * 0.3}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "lamp":
    case "floor-lamp":
    case "table-lamp":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Base */}
          <circle
            cx={width / 2}
            cy={height - 4}
            r="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Pole */}
          <line
            x1={width / 2}
            y1={height - 8}
            x2={width / 2}
            y2="8"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          {/* Shade */}
          <ellipse
            cx={width / 2}
            cy="6"
            rx={width / 2 - 2}
            ry="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    default:
      // Generic furniture representation
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <line
            x1="2"
            y1="2"
            x2={width - 2}
            y2={height - 2}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1={width - 2}
            y1="2"
            x2="2"
            y2={height - 2}
            stroke={stroke}
            strokeWidth="1"
          />
        </svg>
      );
  }
};

interface FurnitureItemProps {
  item: {
    id: string;
    name: string;
    type: string;
    width: number; // width in inches
    height: number; // height in inches
    x: number;
    y: number;
    rotation: number;
    image?: string;
  };
  scale?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdate?: (item: any) => void;
  onDelete?: (id: string) => void;
}

const FurnitureItem: React.FC<FurnitureItemProps> = ({
  item,
  scale = 1,
  isSelected = false,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  // Return null if item is not provided
  if (!item) {
    return null;
  }

  const { id, name, type, width, height, x, y, rotation } = item;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isEditingDimensions, setIsEditingDimensions] = useState(false);
  const [editWidth, setEditWidth] = useState(width.toString());
  const [editHeight, setEditHeight] = useState(height.toString());

  // Handle copy functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isSelected && (event.metaKey || event.ctrlKey) && event.key === "c") {
        event.preventDefault();
        handleDuplicate();
      }
    };

    if (isSelected) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelected, item]);

  // Handle duplicate functionality
  const handleDuplicate = () => {
    // Store the item data in localStorage for copying
    const itemData = {
      ...item,
      // Add a small offset so the pasted item doesn't overlap exactly
      x: item.x + 12, // 12 inches offset
      y: item.y + 12, // 12 inches offset
    };
    localStorage.setItem("copiedFurnitureItem", JSON.stringify(itemData));
  };

  // Scale dimensions based on the provided scale factor
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  // Update edit values when item dimensions change
  React.useEffect(() => {
    setEditWidth(width.toString());
    setEditHeight(height.toString());
  }, [width, height]);

  // Handle drag end to update position
  const handleDragEnd = (
    event: any,
    info: { offset: { x: number; y: number } },
  ) => {
    setIsDragging(false);
    if (onUpdate) {
      const newX = x + info.offset.x / scale;
      const newY = y + info.offset.y / scale;
      onUpdate({ ...item, x: newX, y: newY });
    }
  };

  // Handle rotation from corner touchpoints
  const handleRotateFromCorner = (
    event: React.MouseEvent,
    corner: "tl" | "tr" | "bl" | "br",
  ) => {
    event.stopPropagation();
    setIsRotating(true);

    const startRotation = rotation;
    const furnitureElement = event.currentTarget.closest(
      ".furniture-item",
    ) as HTMLElement;
    const rect = furnitureElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the initial angle from center to the corner touchpoint
    const startAngle =
      Math.atan2(event.clientY - centerY, event.clientX - centerX) *
      (180 / Math.PI);

    const handleMouseMove = (e: MouseEvent) => {
      const currentAngle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      let deltaAngle = currentAngle - startAngle;

      // Normalize the delta angle to prevent large jumps
      while (deltaAngle > 180) deltaAngle -= 360;
      while (deltaAngle < -180) deltaAngle += 360;

      let newRotation = startRotation + deltaAngle;

      // Normalize rotation to 0-360 range
      while (newRotation < 0) newRotation += 360;
      while (newRotation >= 360) newRotation -= 360;

      if (onUpdate) {
        onUpdate({ ...item, rotation: newRotation });
      }
    };

    const handleMouseUp = () => {
      setIsRotating(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle dimension editing
  const handleDimensionDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditingDimensions(true);
  };

  const handleDimensionSubmit = () => {
    const newWidth = Math.max(6, parseFloat(editWidth) || width); // Minimum 6 inches
    const newHeight = Math.max(6, parseFloat(editHeight) || height); // Minimum 6 inches

    if (onUpdate && (newWidth !== width || newHeight !== height)) {
      onUpdate({ ...item, width: newWidth, height: newHeight });
    }

    setIsEditingDimensions(false);
  };

  const handleDimensionCancel = () => {
    setEditWidth(width.toString());
    setEditHeight(height.toString());
    setIsEditingDimensions(false);
  };

  const handleDimensionKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleDimensionSubmit();
    } else if (event.key === "Escape") {
      handleDimensionCancel();
    }
  };

  // Handle blur with delay to allow clicking between inputs
  const handleInputBlur = (event: React.FocusEvent) => {
    // Use setTimeout to allow the focus to move to the other input
    setTimeout(() => {
      // Check if focus is still within the dimension editing container
      const activeElement = document.activeElement;
      const isStillEditing =
        activeElement &&
        (activeElement.classList.contains("dimension-input") ||
          activeElement.closest(".dimension-editing-container"));

      if (!isStillEditing && isEditingDimensions) {
        handleDimensionSubmit();
      }
    }, 100);
  };

  // Handle resize
  const handleResize = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsResizing(true);

    const startWidth = width;
    const startHeight = height;
    const startX = event.clientX;
    const startY = event.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate new dimensions based on mouse movement
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newWidth = Math.max(6, startWidth + deltaX / scale); // Minimum 6 inches
      const newHeight = Math.max(6, startHeight + deltaY / scale); // Minimum 6 inches

      if (onUpdate) {
        onUpdate({ ...item, width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <TooltipProvider>
      <motion.div
        className={`furniture-item absolute bg-white border ${isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"}`}
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: isSelected ? 10 : 1,
        }}
        initial={{ x: x * scale, y: y * scale, rotate: rotation }}
        animate={{ x: x * scale, y: y * scale, rotate: rotation }}
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onClick={() => onSelect && onSelect()}
      >
        {/* Furniture content */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="w-full h-full">
            {generateFurnitureDrawing(type, scaledWidth, scaledHeight)}
          </div>

          {/* Type indicator */}
          <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs px-1 rounded-br">
            {type}
          </div>
        </div>

        {/* Controls that appear when selected */}
        {isSelected && (
          <div className="absolute -top-8 left-0 flex space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="bg-white p-1 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100"
                  onClick={handleDuplicate}
                >
                  <Copy size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicate</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="bg-white p-1 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100"
                  onMouseDown={handleResize}
                >
                  <Maximize2 size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Resize</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className="bg-white p-1 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100">
                  <Move size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Drag to move</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="bg-white p-1 rounded-full border border-gray-300 shadow-sm hover:bg-red-100 text-red-600"
                  onClick={() => onDelete && onDelete(id)}
                >
                  <Trash2 size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* Dimensions display */}
        {isSelected && (
          <div className="absolute -bottom-6 left-0 right-0 text-center text-xs bg-white border border-gray-300 rounded px-1">
            {isEditingDimensions ? (
              <div className="dimension-editing-container flex items-center justify-center space-x-1 py-1">
                <input
                  type="number"
                  value={editWidth}
                  onChange={(e) => setEditWidth(e.target.value)}
                  onKeyDown={handleDimensionKeyDown}
                  onBlur={handleInputBlur}
                  className="dimension-input w-12 text-xs text-center border border-gray-300 rounded px-1"
                  min="6"
                  step="1"
                  autoFocus
                />
                <span>" ×</span>
                <input
                  type="number"
                  value={editHeight}
                  onChange={(e) => setEditHeight(e.target.value)}
                  onKeyDown={handleDimensionKeyDown}
                  onBlur={handleInputBlur}
                  className="dimension-input w-12 text-xs text-center border border-gray-300 rounded px-1"
                  min="6"
                  step="1"
                />
                <span>"</span>
              </div>
            ) : (
              <div
                onDoubleClick={handleDimensionDoubleClick}
                className="cursor-pointer hover:bg-gray-100 px-1 py-1 rounded"
                title="Double-click to edit dimensions"
              >
                {Math.round(width)}" × {Math.round(height)}"
              </div>
            )}
          </div>
        )}

        {/* Corner rotation touchpoints */}
        {isSelected && (
          <>
            {/* Top-left corner */}
            <div
              className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-grab hover:bg-green-600 shadow-sm"
              onMouseDown={(e) => handleRotateFromCorner(e, "tl")}
              title="Rotate from top-left corner"
            />
            {/* Top-right corner */}
            <div
              className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-grab hover:bg-green-600 shadow-sm"
              onMouseDown={(e) => handleRotateFromCorner(e, "tr")}
              title="Rotate from top-right corner"
            />
            {/* Bottom-left corner */}
            <div
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-grab hover:bg-green-600 shadow-sm"
              onMouseDown={(e) => handleRotateFromCorner(e, "bl")}
              title="Rotate from bottom-left corner"
            />
            {/* Bottom-right corner */}
            <div
              className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-grab hover:bg-green-600 shadow-sm"
              onMouseDown={(e) => handleRotateFromCorner(e, "br")}
              title="Rotate from bottom-right corner"
            />
          </>
        )}

        {/* Resize handle */}
        {isSelected && (
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white cursor-se-resize"
            onMouseDown={handleResize}
          />
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default FurnitureItem;
