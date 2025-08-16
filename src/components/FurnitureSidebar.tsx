import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Search,
  Bed,
  Table,
  Armchair,
  Sofa,
  BookOpen,
  Lamp,
  Bath,
  Utensils,
  Dumbbell,
  Package,
  Shapes,
  Home,
} from "lucide-react";
import { Input } from "./ui/input";

// Function to generate SVG line drawings for different furniture types
const generateFurnitureDrawing = (
  type: string,
  width: number,
  height: number,
) => {
  const strokeWidth = 2;
  const stroke = "#374151";
  const fill = "none";

  switch (type?.toLowerCase() || "") {
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

    case "floor-lamp":
    case "table-lamp":
    case "arc-lamp":
    case "pendant-light":
    case "chandelier":
    case "desk-lamp":
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

    case "dishwasher":
    case "microwave":
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
          {/* Door */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          {/* Handle */}
          <rect
            x={width - 6}
            y={height / 2 - 2}
            width="2"
            height="4"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "kitchen-island":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Main surface */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Cabinets underneath */}
          <rect
            x="4"
            y={height / 2}
            width={width / 3 - 2}
            height={height / 2 - 4}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <rect
            x={width / 3 + 2}
            y={height / 2}
            width={width / 3 - 4}
            height={height / 2 - 4}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <rect
            x={(width * 2) / 3 + 2}
            y={height / 2}
            width={width / 3 - 4}
            height={height / 2 - 4}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
        </svg>
      );

    case "pantry-cabinet":
    case "filing-cabinet":
    case "linen-cabinet":
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
          {/* Shelves/Drawers */}
          <line
            x1="4"
            y1={height / 3}
            x2={width - 4}
            y2={height / 3}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="4"
            y1={(height * 2) / 3}
            x2={width - 4}
            y2={(height * 2) / 3}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Handle */}
          <circle
            cx={width - 6}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "sink":
    case "vanity":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Counter/Vanity */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Sink basin */}
          <ellipse
            cx={width / 2}
            cy={height / 3}
            rx={width / 4}
            ry={height / 6}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          {/* Faucet */}
          <circle
            cx={width / 2}
            cy={height / 6}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "shower":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Shower enclosure */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Door */}
          <line
            x1={width / 2}
            y1="2"
            x2={width / 2}
            y2={height - 2}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Shower head */}
          <circle
            cx={width * 0.75}
            cy={height * 0.25}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "conference-table":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Table surface */}
          <ellipse
            cx={width / 2}
            cy={height / 2}
            rx={width / 2 - 2}
            ry={height / 2 - 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Legs */}
          <circle
            cx={width * 0.25}
            cy={height * 0.25}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.25}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width * 0.25}
            cy={height * 0.75}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.75}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "wardrobe":
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
            x1={width / 2}
            y1="2"
            x2={width / 2}
            y2={height - 2}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Handles */}
          <circle
            cx={width / 2 - 4}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width / 2 + 4}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          {/* Hanging rod */}
          <line
            x1="6"
            y1={height / 4}
            x2={width - 6}
            y2={height / 4}
            stroke={stroke}
            strokeWidth="1"
          />
        </svg>
      );

    case "bench":
    case "ottoman":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Seat */}
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
            y={height - 6}
            width="2"
            height="4"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <rect
            x={width - 6}
            y={height - 6}
            width="2"
            height="4"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "tv-stand":
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
          {/* Shelves */}
          <line
            x1="4"
            y1={height / 2}
            x2={width - 4}
            y2={height / 2}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* TV representation */}
          <rect
            x={width / 4}
            y="4"
            width={width / 2}
            height={height / 3}
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
        </svg>
      );

    case "bar-cart":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Top shelf */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Bottom shelf */}
          <rect
            x="2"
            y={height - 6}
            width={width - 4}
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Frame */}
          <line
            x1="2"
            y1="6"
            x2="2"
            y2={height - 6}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line
            x1={width - 2}
            y1="6"
            x2={width - 2}
            y2={height - 6}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          {/* Wheels */}
          <circle
            cx="4"
            cy={height - 2}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
          <circle
            cx={width - 4}
            cy={height - 2}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={fill}
          />
        </svg>
      );

    case "treadmill":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Base */}
          <rect
            x="2"
            y={height * 0.6}
            width={width - 4}
            height={height * 0.4 - 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Running belt */}
          <rect
            x="6"
            y={height * 0.3}
            width={width - 12}
            height={height * 0.3}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#f3f4f6"
          />
          {/* Console */}
          <rect
            x={width * 0.3}
            y="2"
            width={width * 0.4}
            height={height * 0.3}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Handrails */}
          <line
            x1="4"
            y1={height * 0.3}
            x2="4"
            y2={height * 0.1}
            stroke={stroke}
            strokeWidth="2"
          />
          <line
            x1={width - 4}
            y1={height * 0.3}
            x2={width - 4}
            y2={height * 0.1}
            stroke={stroke}
            strokeWidth="2"
          />
        </svg>
      );

    case "exercise-bike":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Base */}
          <ellipse
            cx={width / 2}
            cy={height * 0.8}
            rx={width / 2 - 4}
            ry={height * 0.2 - 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Seat */}
          <rect
            x={width * 0.6}
            y={height * 0.4}
            width={width * 0.25}
            height={height * 0.15}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Handlebars */}
          <rect
            x={width * 0.15}
            y={height * 0.2}
            width={width * 0.3}
            height={height * 0.1}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Support post */}
          <line
            x1={width * 0.3}
            y1={height * 0.3}
            x2={width * 0.3}
            y2={height * 0.7}
            stroke={stroke}
            strokeWidth="3"
          />
          <line
            x1={width * 0.7}
            y1={height * 0.55}
            x2={width * 0.7}
            y2={height * 0.7}
            stroke={stroke}
            strokeWidth="3"
          />
        </svg>
      );

    case "weight-bench":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Bench surface */}
          <rect
            x="4"
            y={height * 0.4}
            width={width - 8}
            height={height * 0.2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Legs */}
          <rect
            x="6"
            y={height * 0.6}
            width="3"
            height={height * 0.3}
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <rect
            x={width - 9}
            y={height * 0.6}
            width="3"
            height={height * 0.3}
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          {/* Backrest */}
          <rect
            x={width * 0.7}
            y={height * 0.1}
            width={width * 0.15}
            height={height * 0.4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "dumbbells":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Left dumbbell */}
          <circle
            cx={width * 0.2}
            cy={height / 2}
            r="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <line
            x1={width * 0.2 + 6}
            y1={height / 2}
            x2={width * 0.4}
            y2={height / 2}
            stroke={stroke}
            strokeWidth="3"
          />
          <circle
            cx={width * 0.4}
            cy={height / 2}
            r="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Right dumbbell */}
          <circle
            cx={width * 0.6}
            cy={height / 2}
            r="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <line
            x1={width * 0.6 + 6}
            y1={height / 2}
            x2={width * 0.8}
            y2={height / 2}
            stroke={stroke}
            strokeWidth="3"
          />
          <circle
            cx={width * 0.8}
            cy={height / 2}
            r="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "pull-up-bar":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Vertical supports */}
          <rect
            x="4"
            y="4"
            width="4"
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <rect
            x={width - 8}
            y="4"
            width="4"
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Top bar */}
          <rect
            x="8"
            y="4"
            width={width - 16}
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Pull-up bar */}
          <line
            x1="8"
            y1={height * 0.3}
            x2={width - 8}
            y2={height * 0.3}
            stroke={stroke}
            strokeWidth="4"
          />
        </svg>
      );

    case "yoga-mat":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Mat */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#e5f3ff"
          />
          {/* Mat texture lines */}
          <line
            x1="6"
            y1={height * 0.2}
            x2={width - 6}
            y2={height * 0.2}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="6"
            y1={height * 0.4}
            x2={width - 6}
            y2={height * 0.4}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="6"
            y1={height * 0.6}
            x2={width - 6}
            y2={height * 0.6}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="6"
            y1={height * 0.8}
            x2={width - 6}
            y2={height * 0.8}
            stroke={stroke}
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      );

    case "piano":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Piano body */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Keys */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height / 3}
            stroke={stroke}
            strokeWidth="1"
            fill="#f9f9f9"
          />
          {/* Key divisions */}
          <line
            x1={width * 0.2}
            y1="4"
            x2={width * 0.2}
            y2={height / 3 + 4}
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            x1={width * 0.4}
            y1="4"
            x2={width * 0.4}
            y2={height / 3 + 4}
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            x1={width * 0.6}
            y1="4"
            x2={width * 0.6}
            y2={height / 3 + 4}
            stroke={stroke}
            strokeWidth="0.5"
          />
          <line
            x1={width * 0.8}
            y1="4"
            x2={width * 0.8}
            y2={height / 3 + 4}
            stroke={stroke}
            strokeWidth="0.5"
          />
          {/* Black keys */}
          <rect
            x={width * 0.15}
            y="4"
            width={width * 0.1}
            height={height / 5}
            stroke={stroke}
            strokeWidth="0.5"
            fill={stroke}
          />
          <rect
            x={width * 0.35}
            y="4"
            width={width * 0.1}
            height={height / 5}
            stroke={stroke}
            strokeWidth="0.5"
            fill={stroke}
          />
          <rect
            x={width * 0.65}
            y="4"
            width={width * 0.1}
            height={height / 5}
            stroke={stroke}
            strokeWidth="0.5"
            fill={stroke}
          />
        </svg>
      );

    case "fireplace":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Fireplace frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Firebox */}
          <rect
            x="6"
            y={height * 0.3}
            width={width - 12}
            height={height * 0.5}
            stroke={stroke}
            strokeWidth="1"
            fill="#2d2d2d"
          />
          {/* Mantel */}
          <rect
            x="2"
            y={height * 0.25}
            width={width - 4}
            height={height * 0.1}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Flames */}
          <path
            d={`M${width * 0.3} ${height * 0.7} Q${width * 0.35} ${height * 0.4} ${width * 0.4} ${height * 0.7}`}
            stroke="#ff6b35"
            strokeWidth="1"
            fill="none"
          />
          <path
            d={`M${width * 0.5} ${height * 0.7} Q${width * 0.55} ${height * 0.35} ${width * 0.6} ${height * 0.7}`}
            stroke="#ff6b35"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "pool-table":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Table surface */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#0f5132"
          />
          {/* Rails */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <rect
            x="2"
            y={height - 6}
            width={width - 4}
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <rect
            x="2"
            y="6"
            width="4"
            height={height - 12}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <rect
            x={width - 6}
            y="6"
            width="4"
            height={height - 12}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Pockets */}
          <circle
            cx="6"
            cy="6"
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill="#000"
          />
          <circle
            cx={width - 6}
            cy="6"
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill="#000"
          />
          <circle
            cx="6"
            cy={height - 6}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill="#000"
          />
          <circle
            cx={width - 6}
            cy={height - 6}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill="#000"
          />
        </svg>
      );

    case "bar":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Bar counter */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Bar top */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height * 0.2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#8b4513"
          />
          {/* Shelves */}
          <line
            x1="4"
            y1={height * 0.4}
            x2={width - 4}
            y2={height * 0.4}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="4"
            y1={height * 0.7}
            x2={width - 4}
            y2={height * 0.7}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Bottles */}
          <rect
            x="8"
            y={height * 0.25}
            width="2"
            height={height * 0.12}
            stroke={stroke}
            strokeWidth="0.5"
            fill={fill}
          />
          <rect
            x="12"
            y={height * 0.25}
            width="2"
            height={height * 0.12}
            stroke={stroke}
            strokeWidth="0.5"
            fill={fill}
          />
          <rect
            x="16"
            y={height * 0.25}
            width="2"
            height={height * 0.12}
            stroke={stroke}
            strokeWidth="0.5"
            fill={fill}
          />
        </svg>
      );

    case "wine-rack":
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
          {/* Horizontal dividers */}
          <line
            x1="2"
            y1={height / 3}
            x2={width - 2}
            y2={height / 3}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="2"
            y1={(height * 2) / 3}
            x2={width - 2}
            y2={(height * 2) / 3}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Wine bottles */}
          <circle
            cx={width * 0.25}
            cy={height * 0.17}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#722f37"
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.17}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#722f37"
          />
          <circle
            cx={width * 0.25}
            cy={height * 0.5}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#722f37"
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.5}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#722f37"
          />
          <circle
            cx={width * 0.25}
            cy={height * 0.83}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#722f37"
          />
          <circle
            cx={width * 0.75}
            cy={height * 0.83}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#722f37"
          />
        </svg>
      );

    case "safe":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Safe body */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#4a5568"
          />
          {/* Door */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#2d3748"
          />
          {/* Handle */}
          <circle
            cx={width - 8}
            cy={height / 2}
            r="3"
            stroke={stroke}
            strokeWidth="1"
            fill="#718096"
          />
          {/* Lock */}
          <circle
            cx={width / 2}
            cy={height / 2}
            r="4"
            stroke={stroke}
            strokeWidth="1"
            fill="#2d3748"
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill="#718096"
          />
        </svg>
      );

    case "aquarium":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Tank */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#e6f3ff"
          />
          {/* Water level */}
          <rect
            x="4"
            y="6"
            width={width - 8}
            height={height - 12}
            stroke="none"
            fill="#b3d9ff"
            opacity="0.7"
          />
          {/* Fish */}
          <ellipse
            cx={width * 0.3}
            cy={height * 0.4}
            rx="3"
            ry="2"
            stroke={stroke}
            strokeWidth="0.5"
            fill="#ff6b35"
          />
          <ellipse
            cx={width * 0.7}
            cy={height * 0.6}
            rx="3"
            ry="2"
            stroke={stroke}
            strokeWidth="0.5"
            fill="#4299e1"
          />
          {/* Plants */}
          <path
            d={`M${width * 0.15} ${height - 6} Q${width * 0.18} ${height * 0.7} ${width * 0.15} ${height * 0.5}`}
            stroke="#38a169"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={`M${width * 0.85} ${height - 6} Q${width * 0.82} ${height * 0.6} ${width * 0.85} ${height * 0.4}`}
            stroke="#38a169"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );

    case "plant-stand":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Stand base */}
          <circle
            cx={width / 2}
            cy={height - 4}
            r="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Stand pole */}
          <line
            x1={width / 2}
            y1={height - 10}
            x2={width / 2}
            y2={height * 0.3}
            stroke={stroke}
            strokeWidth="3"
          />
          {/* Plant pot */}
          <ellipse
            cx={width / 2}
            cy={height * 0.3}
            rx="8"
            ry="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#8b4513"
          />
          {/* Plant */}
          <path
            d={`M${width / 2 - 6} ${height * 0.3} Q${width / 2 - 8} ${height * 0.15} ${width / 2 - 4} ${height * 0.1}`}
            stroke="#38a169"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={`M${width / 2} ${height * 0.3} Q${width / 2 - 2} ${height * 0.1} ${width / 2 + 2} ${height * 0.05}`}
            stroke="#38a169"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={`M${width / 2 + 6} ${height * 0.3} Q${width / 2 + 8} ${height * 0.15} ${width / 2 + 4} ${height * 0.1}`}
            stroke="#38a169"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );

    case "coat-rack":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Base */}
          <circle
            cx={width / 2}
            cy={height - 4}
            r="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Central pole */}
          <line
            x1={width / 2}
            y1={height - 10}
            x2={width / 2}
            y2="8"
            stroke={stroke}
            strokeWidth="3"
          />
          {/* Hooks */}
          <line
            x1={width / 2}
            y1={height * 0.2}
            x2={width / 2 + 8}
            y2={height * 0.2}
            stroke={stroke}
            strokeWidth="2"
          />
          <line
            x1={width / 2}
            y1={height * 0.35}
            x2={width / 2 - 8}
            y2={height * 0.35}
            stroke={stroke}
            strokeWidth="2"
          />
          <line
            x1={width / 2}
            y1={height * 0.5}
            x2={width / 2 + 6}
            y2={height * 0.5}
            stroke={stroke}
            strokeWidth="2"
          />
          <line
            x1={width / 2}
            y1={height * 0.65}
            x2={width / 2 - 6}
            y2={height * 0.65}
            stroke={stroke}
            strokeWidth="2"
          />
          {/* Hook ends */}
          <circle
            cx={width / 2 + 8}
            cy={height * 0.2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width / 2 - 8}
            cy={height * 0.35}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
        </svg>
      );

    case "mirror":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Mirror frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Mirror surface */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke="none"
            fill="#e2e8f0"
          />
          {/* Reflection lines */}
          <line
            x1="6"
            y1="6"
            x2={width - 6}
            y2={height - 6}
            stroke="#cbd5e0"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1={width - 6}
            y1="6"
            x2="6"
            y2={height - 6}
            stroke="#cbd5e0"
            strokeWidth="0.5"
            opacity="0.5"
          />
          {/* Stand */}
          <rect
            x={width / 2 - 2}
            y={height - 6}
            width="4"
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "elliptical":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Base */}
          <ellipse
            cx={width / 2}
            cy={height * 0.8}
            rx={width / 2 - 4}
            ry={height * 0.2 - 2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Console */}
          <rect
            x={width * 0.35}
            y="2"
            width={width * 0.3}
            height={height * 0.25}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Support post */}
          <line
            x1={width / 2}
            y1={height * 0.27}
            x2={width / 2}
            y2={height * 0.6}
            stroke={stroke}
            strokeWidth="4"
          />
          {/* Pedals */}
          <ellipse
            cx={width * 0.3}
            cy={height * 0.6}
            rx="8"
            ry="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          <ellipse
            cx={width * 0.7}
            cy={height * 0.6}
            rx="8"
            ry="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "rowing-machine":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Base rail */}
          <rect
            x="2"
            y={height * 0.6}
            width={width - 4}
            height={height * 0.1}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Seat */}
          <rect
            x={width * 0.4}
            y={height * 0.45}
            width={width * 0.15}
            height={height * 0.15}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Flywheel */}
          <circle
            cx={width * 0.15}
            cy={height * 0.4}
            r={height * 0.2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Handle */}
          <line
            x1={width * 0.3}
            y1={height * 0.4}
            x2={width * 0.7}
            y2={height * 0.4}
            stroke={stroke}
            strokeWidth="3"
          />
          {/* Footrests */}
          <rect
            x={width * 0.8}
            y={height * 0.5}
            width={width * 0.15}
            height={height * 0.2}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "circle":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <circle
            cx={width / 2}
            cy={height / 2}
            r={Math.min(width, height) / 2 - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "square":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "triangle":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <polygon
            points={`${width / 2},4 ${width - 4},${height - 4} 4,${height - 4}`}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "rectangle":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "diamond":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <polygon
            points={`${width / 2},4 ${width - 4},${height / 2} ${width / 2},${height - 4} 4,${height / 2}`}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "hexagon":
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 4;
      const hexPoints = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        hexPoints.push(`${x},${y}`);
      }
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <polygon
            points={hexPoints.join(" ")}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "door":
    case "interior-door":
    case "exterior-door":
    case "sliding-door":
    case "french-door":
    case "pocket-door":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Door frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Door panel */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#f8f9fa"
          />
          {/* Door handle */}
          <circle
            cx={width - 8}
            cy={height / 2}
            r="2"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          {/* Door swing arc for hinged doors */}
          {!type?.includes("sliding") && !type?.includes("pocket") && (
            <path
              d={`M 4 4 A ${width - 8} ${width - 8} 0 0 1 ${width - 4} ${Math.min(width - 4, height - 4)}`}
              stroke={stroke}
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2,2"
              opacity="0.5"
            />
          )}
        </svg>
      );

    case "window":
    case "casement-window":
    case "double-hung-window":
    case "sliding-window":
    case "bay-window":
    case "picture-window":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Window frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Window glass */}
          <rect
            x="4"
            y="4"
            width={width - 8}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#e6f3ff"
            opacity="0.7"
          />
          {/* Window mullions */}
          <line
            x1={width / 2}
            y1="4"
            x2={width / 2}
            y2={height - 4}
            stroke={stroke}
            strokeWidth="1"
          />
          <line
            x1="4"
            y1={height / 2}
            x2={width - 4}
            y2={height / 2}
            stroke={stroke}
            strokeWidth="1"
          />
          {/* Window sill */}
          <rect
            x="2"
            y={height - 6}
            width={width - 4}
            height="4"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
        </svg>
      );

    case "closet":
    case "walk-in-closet":
    case "reach-in-closet":
    case "linen-closet":
    case "coat-closet":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Closet frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Closet doors */}
          <rect
            x="4"
            y="4"
            width={(width - 8) / 2 - 1}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#f8f9fa"
          />
          <rect
            x={(width - 8) / 2 + 5}
            y="4"
            width={(width - 8) / 2 - 1}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#f8f9fa"
          />
          {/* Door handles */}
          <circle
            cx={(width - 8) / 4 + 2}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width - (width - 8) / 4 - 2}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          {/* Hanging rod */}
          <line
            x1="6"
            y1={height / 4}
            x2={width - 6}
            y2={height / 4}
            stroke={stroke}
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      );

    case "stairs":
    case "staircase":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Stair steps */}
          {Array.from(
            { length: Math.min(8, Math.floor(height / 8)) },
            (_, i) => {
              const stepHeight =
                (height - 4) / Math.min(8, Math.floor(height / 8));
              const stepY = 2 + i * stepHeight;
              return (
                <g key={i}>
                  <rect
                    x="2"
                    y={stepY}
                    width={width - 4}
                    height={stepHeight - 1}
                    stroke={stroke}
                    strokeWidth="1"
                    fill={fill}
                  />
                  <line
                    x1="2"
                    y1={stepY + stepHeight - 1}
                    x2={width - 2}
                    y2={stepY + stepHeight - 1}
                    stroke={stroke}
                    strokeWidth="1"
                  />
                </g>
              );
            },
          )}
          {/* Handrail */}
          <line
            x1={width - 6}
            y1="6"
            x2={width - 6}
            y2={height - 6}
            stroke={stroke}
            strokeWidth="2"
          />
        </svg>
      );

    case "fireplace-insert":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Fireplace opening */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="#2d2d2d"
          />
          {/* Hearth */}
          <rect
            x="2"
            y={height - 8}
            width={width - 4}
            height="6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Flames */}
          <path
            d={`M${width * 0.3} ${height * 0.7} Q${width * 0.35} ${height * 0.4} ${width * 0.4} ${height * 0.7}`}
            stroke="#ff6b35"
            strokeWidth="1"
            fill="none"
          />
          <path
            d={`M${width * 0.5} ${height * 0.7} Q${width * 0.55} ${height * 0.35} ${width * 0.6} ${height * 0.7}`}
            stroke="#ff6b35"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );

    case "built-in-cabinet":
    case "kitchen-cabinet":
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Cabinet frame */}
          <rect
            x="2"
            y="2"
            width={width - 4}
            height={height - 4}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill={fill}
          />
          {/* Cabinet doors */}
          <rect
            x="4"
            y="4"
            width={(width - 10) / 2}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#f8f9fa"
          />
          <rect
            x={(width - 10) / 2 + 6}
            y="4"
            width={(width - 10) / 2}
            height={height - 8}
            stroke={stroke}
            strokeWidth="1"
            fill="#f8f9fa"
          />
          {/* Handles */}
          <circle
            cx={(width - 10) / 4 + 2}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
          />
          <circle
            cx={width - (width - 10) / 4 - 2}
            cy={height / 2}
            r="1"
            stroke={stroke}
            strokeWidth="1"
            fill={stroke}
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

interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  width: number; // in inches
  depth: number; // in inches
  image: string;
}

interface FurnitureCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: FurnitureItem[];
}

interface FurnitureSidebarProps {
  onDragStart?: (item: FurnitureItem) => void;
}

const FurnitureSidebar: React.FC<FurnitureSidebarProps> = ({
  onDragStart = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock furniture data
  const furnitureCategories: FurnitureCategory[] = [
    {
      id: "bedroom",
      name: "Bedroom",
      icon: <Bed className="h-5 w-5" />,
      items: [
        {
          id: "queen-bed",
          name: "Queen Bed",
          category: "bedroom",
          width: 60,
          depth: 80,
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80",
        },
        {
          id: "king-bed",
          name: "King Bed",
          category: "bedroom",
          width: 76,
          depth: 80,
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80",
        },
        {
          id: "twin-bed",
          name: "Twin Bed",
          category: "bedroom",
          width: 38,
          depth: 75,
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80",
        },
        {
          id: "nightstand",
          name: "Nightstand",
          category: "bedroom",
          width: 20,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=300&q=80",
        },
        {
          id: "dresser",
          name: "Dresser",
          category: "bedroom",
          width: 60,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
        },
        {
          id: "wardrobe",
          name: "Wardrobe",
          category: "bedroom",
          width: 48,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
        },
        {
          id: "bench",
          name: "Bedroom Bench",
          category: "bedroom",
          width: 48,
          depth: 16,
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
        },
      ],
    },
    {
      id: "living",
      name: "Living Room",
      icon: <Sofa className="h-5 w-5" />,
      items: [
        {
          id: "sofa",
          name: "Sofa",
          category: "living",
          width: 84,
          depth: 38,
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
        },
        {
          id: "loveseat",
          name: "Loveseat",
          category: "living",
          width: 58,
          depth: 38,
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
        },
        {
          id: "sectional",
          name: "Sectional Sofa",
          category: "living",
          width: 120,
          depth: 84,
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
        },
        {
          id: "armchair",
          name: "Armchair",
          category: "living",
          width: 32,
          depth: 34,
          image:
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&q=80",
        },
        {
          id: "recliner",
          name: "Recliner",
          category: "living",
          width: 36,
          depth: 40,
          image:
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&q=80",
        },
        {
          id: "coffee-table",
          name: "Coffee Table",
          category: "living",
          width: 48,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1565191999001-68237f3219a0?w=300&q=80",
        },
        {
          id: "side-table",
          name: "Side Table",
          category: "living",
          width: 20,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1565191999001-68237f3219a0?w=300&q=80",
        },
        {
          id: "tv-stand",
          name: "TV Stand",
          category: "living",
          width: 60,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
        },
        {
          id: "bookshelf",
          name: "Bookshelf",
          category: "living",
          width: 36,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
        {
          id: "ottoman",
          name: "Ottoman",
          category: "living",
          width: 24,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&q=80",
        },
      ],
    },
    {
      id: "dining",
      name: "Dining Room",
      icon: <Armchair className="h-5 w-5" />,
      items: [
        {
          id: "dining-table",
          name: "Dining Table",
          category: "dining",
          width: 72,
          depth: 36,
          image:
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&q=80",
        },
        {
          id: "round-dining-table",
          name: "Round Table",
          category: "dining",
          width: 48,
          depth: 48,
          image:
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&q=80",
        },
        {
          id: "dining-chair",
          name: "Dining Chair",
          category: "dining",
          width: 20,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&q=80",
        },
        {
          id: "bar-stool",
          name: "Bar Stool",
          category: "dining",
          width: 16,
          depth: 16,
          image:
            "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&q=80",
        },
        {
          id: "buffet",
          name: "Buffet",
          category: "dining",
          width: 72,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
        },
        {
          id: "china-cabinet",
          name: "China Cabinet",
          category: "dining",
          width: 48,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
        {
          id: "bar-cart",
          name: "Bar Cart",
          category: "dining",
          width: 30,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1565191999001-68237f3219a0?w=300&q=80",
        },
      ],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: <Utensils className="h-5 w-5" />,
      items: [
        {
          id: "refrigerator",
          name: "Refrigerator",
          category: "kitchen",
          width: 36,
          depth: 32,
          image:
            "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=80",
        },
        {
          id: "stove",
          name: "Stove",
          category: "kitchen",
          width: 30,
          depth: 28,
          image:
            "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&q=80",
        },
        {
          id: "dishwasher",
          name: "Dishwasher",
          category: "kitchen",
          width: 24,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=80",
        },
        {
          id: "microwave",
          name: "Microwave",
          category: "kitchen",
          width: 24,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=300&q=80",
        },
        {
          id: "kitchen-island",
          name: "Kitchen Island",
          category: "kitchen",
          width: 72,
          depth: 36,
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",
        },
        {
          id: "pantry-cabinet",
          name: "Pantry Cabinet",
          category: "kitchen",
          width: 24,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
        {
          id: "breakfast-table",
          name: "Breakfast Table",
          category: "kitchen",
          width: 36,
          depth: 36,
          image:
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&q=80",
        },
      ],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      icon: <Bath className="h-5 w-5" />,
      items: [
        {
          id: "toilet",
          name: "Toilet",
          category: "bathroom",
          width: 20,
          depth: 30,
          image:
            "https://images.unsplash.com/photo-1581876955680-802ef07f234f?w=300&q=80",
        },
        {
          id: "sink",
          name: "Sink",
          category: "bathroom",
          width: 24,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80",
        },
        {
          id: "bathtub",
          name: "Bathtub",
          category: "bathroom",
          width: 60,
          depth: 32,
          image:
            "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&q=80",
        },
        {
          id: "shower",
          name: "Shower",
          category: "bathroom",
          width: 36,
          depth: 36,
          image:
            "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&q=80",
        },
        {
          id: "vanity",
          name: "Vanity",
          category: "bathroom",
          width: 48,
          depth: 22,
          image:
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80",
        },
        {
          id: "linen-cabinet",
          name: "Linen Cabinet",
          category: "bathroom",
          width: 18,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
      ],
    },
    {
      id: "office",
      name: "Office",
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        {
          id: "desk",
          name: "Desk",
          category: "office",
          width: 60,
          depth: 30,
          image:
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300&q=80",
        },
        {
          id: "l-shaped-desk",
          name: "L-Shaped Desk",
          category: "office",
          width: 72,
          depth: 60,
          image:
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300&q=80",
        },
        {
          id: "office-chair",
          name: "Office Chair",
          category: "office",
          width: 25,
          depth: 25,
          image:
            "https://images.unsplash.com/photo-1561131989-b8112bafbd43?w=300&q=80",
        },
        {
          id: "filing-cabinet",
          name: "Filing Cabinet",
          category: "office",
          width: 15,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
        {
          id: "bookcase",
          name: "Bookcase",
          category: "office",
          width: 36,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
        {
          id: "conference-table",
          name: "Conference Table",
          category: "office",
          width: 96,
          depth: 42,
          image:
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&q=80",
        },
        {
          id: "credenza",
          name: "Credenza",
          category: "office",
          width: 72,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
        },
      ],
    },
    {
      id: "lighting",
      name: "Lighting",
      icon: <Lamp className="h-5 w-5" />,
      items: [
        {
          id: "floor-lamp",
          name: "Floor Lamp",
          category: "lighting",
          width: 18,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&q=80",
        },
        {
          id: "table-lamp",
          name: "Table Lamp",
          category: "lighting",
          width: 12,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
        },
        {
          id: "arc-lamp",
          name: "Arc Lamp",
          category: "lighting",
          width: 20,
          depth: 20,
          image:
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&q=80",
        },
        {
          id: "pendant-light",
          name: "Pendant Light",
          category: "lighting",
          width: 12,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
        },
        {
          id: "chandelier",
          name: "Chandelier",
          category: "lighting",
          width: 36,
          depth: 36,
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
        },
        {
          id: "desk-lamp",
          name: "Desk Lamp",
          category: "lighting",
          width: 8,
          depth: 8,
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80",
        },
      ],
    },
    {
      id: "gym",
      name: "Gym",
      icon: <Dumbbell className="h-5 w-5" />,
      items: [
        {
          id: "treadmill",
          name: "Treadmill",
          category: "gym",
          width: 84,
          depth: 36,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
        },
        {
          id: "exercise-bike",
          name: "Exercise Bike",
          category: "gym",
          width: 48,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
        },
        {
          id: "elliptical",
          name: "Elliptical",
          category: "gym",
          width: 72,
          depth: 30,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
        },
        {
          id: "weight-bench",
          name: "Weight Bench",
          category: "gym",
          width: 48,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",
        },
        {
          id: "dumbbells",
          name: "Dumbbell Set",
          category: "gym",
          width: 36,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",
        },
        {
          id: "pull-up-bar",
          name: "Pull-up Station",
          category: "gym",
          width: 48,
          depth: 48,
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",
        },
        {
          id: "rowing-machine",
          name: "Rowing Machine",
          category: "gym",
          width: 96,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
        },
        {
          id: "yoga-mat",
          name: "Yoga Mat",
          category: "gym",
          width: 72,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&q=80",
        },
      ],
    },
    {
      id: "miscellaneous",
      name: "Miscellaneous",
      icon: <Package className="h-5 w-5" />,
      items: [
        {
          id: "piano",
          name: "Piano",
          category: "miscellaneous",
          width: 58,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&q=80",
        },
        {
          id: "fireplace",
          name: "Fireplace",
          category: "miscellaneous",
          width: 48,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&q=80",
        },
        {
          id: "pool-table",
          name: "Pool Table",
          category: "miscellaneous",
          width: 100,
          depth: 56,
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80",
        },
        {
          id: "bar",
          name: "Home Bar",
          category: "miscellaneous",
          width: 72,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&q=80",
        },
        {
          id: "wine-rack",
          name: "Wine Rack",
          category: "miscellaneous",
          width: 24,
          depth: 12,
          image:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&q=80",
        },
        {
          id: "safe",
          name: "Safe",
          category: "miscellaneous",
          width: 24,
          depth: 24,
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
        },
        {
          id: "aquarium",
          name: "Aquarium",
          category: "miscellaneous",
          width: 48,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&q=80",
        },
        {
          id: "plant-stand",
          name: "Plant Stand",
          category: "miscellaneous",
          width: 16,
          depth: 16,
          image:
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",
        },
        {
          id: "coat-rack",
          name: "Coat Rack",
          category: "miscellaneous",
          width: 18,
          depth: 18,
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
        },
        {
          id: "mirror",
          name: "Floor Mirror",
          category: "miscellaneous",
          width: 24,
          depth: 6,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        },
      ],
    },
    {
      id: "house",
      name: "House",
      icon: <Home className="h-5 w-5" />,
      items: [
        {
          id: "interior-door",
          name: "Interior Door",
          category: "house",
          width: 32,
          depth: 6,
          image: "",
        },
        {
          id: "exterior-door",
          name: "Exterior Door",
          category: "house",
          width: 36,
          depth: 8,
          image: "",
        },
        {
          id: "french-door",
          name: "French Door",
          category: "house",
          width: 72,
          depth: 8,
          image: "",
        },
        {
          id: "sliding-door",
          name: "Sliding Door",
          category: "house",
          width: 72,
          depth: 6,
          image: "",
        },
        {
          id: "pocket-door",
          name: "Pocket Door",
          category: "house",
          width: 32,
          depth: 6,
          image: "",
        },
        {
          id: "casement-window",
          name: "Casement Window",
          category: "house",
          width: 36,
          depth: 6,
          image: "",
        },
        {
          id: "double-hung-window",
          name: "Double Hung Window",
          category: "house",
          width: 36,
          depth: 6,
          image: "",
        },
        {
          id: "sliding-window",
          name: "Sliding Window",
          category: "house",
          width: 48,
          depth: 6,
          image: "",
        },
        {
          id: "bay-window",
          name: "Bay Window",
          category: "house",
          width: 72,
          depth: 24,
          image: "",
        },
        {
          id: "picture-window",
          name: "Picture Window",
          category: "house",
          width: 60,
          depth: 6,
          image: "",
        },
        {
          id: "walk-in-closet",
          name: "Walk-in Closet",
          category: "house",
          width: 72,
          depth: 48,
          image: "",
        },
        {
          id: "reach-in-closet",
          name: "Reach-in Closet",
          category: "house",
          width: 48,
          depth: 24,
          image: "",
        },
        {
          id: "linen-closet",
          name: "Linen Closet",
          category: "house",
          width: 24,
          depth: 18,
          image: "",
        },
        {
          id: "coat-closet",
          name: "Coat Closet",
          category: "house",
          width: 36,
          depth: 24,
          image: "",
        },
        {
          id: "stairs",
          name: "Stairs",
          category: "house",
          width: 36,
          depth: 120,
          image: "",
        },
        {
          id: "fireplace-insert",
          name: "Fireplace Insert",
          category: "house",
          width: 48,
          depth: 18,
          image: "",
        },
        {
          id: "built-in-cabinet",
          name: "Built-in Cabinet",
          category: "house",
          width: 48,
          depth: 18,
          image: "",
        },
      ],
    },
    {
      id: "shapes",
      name: "Shapes",
      icon: <Shapes className="h-5 w-5" />,
      items: [
        {
          id: "circle",
          name: "Circle",
          category: "shapes",
          width: 24,
          depth: 24,
          image: "",
        },
        {
          id: "square",
          name: "Square",
          category: "shapes",
          width: 24,
          depth: 24,
          image: "",
        },
        {
          id: "rectangle",
          name: "Rectangle",
          category: "shapes",
          width: 36,
          depth: 24,
          image: "",
        },
        {
          id: "triangle",
          name: "Triangle",
          category: "shapes",
          width: 24,
          depth: 24,
          image: "",
        },
        {
          id: "diamond",
          name: "Diamond",
          category: "shapes",
          width: 24,
          depth: 24,
          image: "",
        },
        {
          id: "hexagon",
          name: "Hexagon",
          category: "shapes",
          width: 24,
          depth: 24,
          image: "",
        },
      ],
    },
  ];

  // Filter furniture items based on search query
  const filteredCategories = furnitureCategories
    .map((category) => {
      return {
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      };
    })
    .filter((category) => category.items.length > 0);

  const handleDragStart = (e: React.DragEvent, item: FurnitureItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    onDragStart(item);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">Furniture</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search furniture..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Accordion type="multiple" className="w-full">
          {filteredCategories.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 p-2">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      className="cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      <div className="p-2 flex flex-col items-center">
                        <div className="w-full h-24 bg-muted rounded-md overflow-hidden mb-2 flex items-center justify-center">
                          <div className="w-20 h-20">
                            {generateFurnitureDrawing(item.id, 80, 80)}
                          </div>
                        </div>
                        <div className="text-xs text-center">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.width}" × {item.depth}"
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>

      <div className="p-3 border-t">
        <div className="text-xs text-muted-foreground text-center">
          Drag furniture items onto the canvas
        </div>
      </div>
    </div>
  );
};

export default FurnitureSidebar;
