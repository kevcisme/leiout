import React, { useState, useRef, useEffect } from "react";
import interact from "interactjs";
import FurnitureItem from "./FurnitureItem";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";

interface RoomShape {
  type:
    | "rectangle"
    | "l-shape"
    | "trapezoid"
    | "triangle"
    | "pentagon"
    | "hexagon";
  // For L-shape: main rectangle + extension
  mainWidth?: number;
  mainLength?: number;
  extensionWidth?: number;
  extensionLength?: number;
  extensionPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  // For trapezoid: parallel sides and height
  topWidth?: number;
  bottomWidth?: number;
  height?: number;
  // For triangle: base and height
  base?: number;
  triangleHeight?: number;
  // For polygon shapes: radius and number of sides
  radius?: number;
  sides?: number;
}

interface FloorPlanCanvasProps {
  roomWidth?: number; // in inches
  roomHeight?: number; // in inches
  roomShape?: RoomShape;
  scale?: number; // pixels per inch
  furniture?: FurnitureItemType[];
  onFurnitureUpdate?: (furniture: FurnitureItemType[]) => void;
  selectedFurniture?: string | null;
  onFurniturePlaced?: () => void;
}

export interface FurnitureItemType {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number; // in inches
  height: number; // in inches
  rotation: number;
  image?: string;
}

interface FurnitureItemFromSidebar {
  id: string;
  name: string;
  category: string;
  width: number;
  depth: number;
  image: string;
}

const FloorPlanCanvas: React.FC<FloorPlanCanvasProps> = ({
  roomWidth = 144, // 12 feet default
  roomHeight = 144, // 12 feet default
  roomShape = { type: "rectangle" },
  scale = 2, // 2 pixels per inch default for better visibility
  furniture = [],
  onFurnitureUpdate = () => {},
  selectedFurniture = null,
  onFurniturePlaced = () => {},
}) => {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [items, setItems] = useState<FurnitureItemType[]>(furniture);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [dragOverCell, setDragOverCell] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const gridSize = 24; // 24 inches (2 feet) per grid cell

  // Update items when furniture prop changes
  useEffect(() => {
    setItems(furniture);
  }, [furniture]);

  // Calculate canvas dimensions and proper scale based on room size
  useEffect(() => {
    // Calculate a base scale that ensures the room fits well in the canvas
    // Target canvas size should be reasonable (600-800px for typical rooms)
    const targetCanvasSize = 600;

    let maxRoomDimension;
    let canvasWidth, canvasHeight;

    if (roomShape.type === "l-shape") {
      // For L-shape, calculate the bounding box
      const mainWidth = roomShape.mainWidth || roomWidth;
      const mainLength = roomShape.mainLength || roomHeight;
      const extWidth = roomShape.extensionWidth || 60;
      const extLength = roomShape.extensionLength || 60;

      // Calculate total bounding dimensions
      canvasWidth = Math.max(mainWidth, extWidth);
      canvasHeight = Math.max(mainLength, extLength);

      if (
        roomShape.extensionPosition === "top-right" ||
        roomShape.extensionPosition === "bottom-right"
      ) {
        canvasWidth = mainWidth + extWidth;
      } else if (
        roomShape.extensionPosition === "top-left" ||
        roomShape.extensionPosition === "bottom-left"
      ) {
        canvasWidth = Math.max(mainWidth, extWidth);
      }

      if (
        roomShape.extensionPosition === "top-right" ||
        roomShape.extensionPosition === "top-left"
      ) {
        canvasHeight = mainLength + extLength;
      } else {
        canvasHeight = Math.max(mainLength, extLength);
      }

      maxRoomDimension = Math.max(canvasWidth, canvasHeight);
    } else if (roomShape.type === "trapezoid") {
      canvasWidth = Math.max(
        roomShape.topWidth || 80,
        roomShape.bottomWidth || 120,
      );
      canvasHeight = roomShape.height || 120;
      maxRoomDimension = Math.max(canvasWidth, canvasHeight);
    } else if (roomShape.type === "triangle") {
      canvasWidth = roomShape.base || 120;
      canvasHeight = roomShape.triangleHeight || 120;
      maxRoomDimension = Math.max(canvasWidth, canvasHeight);
    } else if (roomShape.type === "pentagon" || roomShape.type === "hexagon") {
      const radius = roomShape.radius || 80;
      canvasWidth = radius * 2;
      canvasHeight = radius * 2;
      maxRoomDimension = radius * 2;
    } else {
      maxRoomDimension = Math.max(roomWidth, roomHeight);
      canvasWidth = roomWidth;
      canvasHeight = roomHeight;
    }

    const baseScale = targetCanvasSize / maxRoomDimension;

    // Apply the zoom scale on top of the base scale
    const finalScale = baseScale * (scale / 5.6); // Normalize scale since home.tsx uses scale * 5.6

    const width = canvasWidth * finalScale;
    const height = canvasHeight * finalScale;
    setCanvasDimensions({ width, height });
  }, [roomWidth, roomHeight, roomShape, scale]);

  // Handle paste functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "v") {
        event.preventDefault();
        handlePaste();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items, onFurnitureUpdate]);

  // Handle paste functionality
  const handlePaste = () => {
    const copiedItemData = localStorage.getItem("copiedFurnitureItem");
    if (copiedItemData) {
      try {
        const itemData = JSON.parse(copiedItemData);
        // Create new furniture item with unique ID
        const newItem: FurnitureItemType = {
          ...itemData,
          id: `item-${Date.now()}`,
        };

        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        onFurnitureUpdate(updatedItems);

        // Select the newly pasted item
        setSelectedItem(newItem.id);
      } catch (error) {
        console.error("Error parsing copied furniture data:", error);
      }
    }
  };

  // Check if there's copied furniture data available
  const hasCopiedData = () => {
    const copiedItemData = localStorage.getItem("copiedFurnitureItem");
    return copiedItemData !== null;
  };

  // Handle drag and drop from sidebar
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    // Calculate which grid cell the mouse is over
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate the same scale used for canvas dimensions
    const targetCanvasSize = 600;

    let maxRoomDimension;
    if (roomShape.type === "l-shape") {
      const mainWidth = roomShape.mainWidth || roomWidth;
      const mainLength = roomShape.mainLength || roomHeight;
      const extWidth = roomShape.extensionWidth || 60;
      const extLength = roomShape.extensionLength || 60;

      let canvasWidth = Math.max(mainWidth, extWidth);
      let canvasHeight = Math.max(mainLength, extLength);

      if (
        roomShape.extensionPosition === "top-right" ||
        roomShape.extensionPosition === "bottom-right"
      ) {
        canvasWidth = mainWidth + extWidth;
      }

      if (
        roomShape.extensionPosition === "top-right" ||
        roomShape.extensionPosition === "top-left"
      ) {
        canvasHeight = mainLength + extLength;
      }

      maxRoomDimension = Math.max(canvasWidth, canvasHeight);
    } else {
      maxRoomDimension = Math.max(roomWidth, roomHeight);
    }

    const baseScale = targetCanvasSize / maxRoomDimension;
    const finalScale = baseScale * (scale / 5.6);

    const gridX = Math.floor(x / (gridSize * finalScale));
    const gridY = Math.floor(y / (gridSize * finalScale));

    // Only highlight if the cell is within the room bounds
    if (isGridCellInRoom(gridX, gridY)) {
      setDragOverCell({ x: gridX, y: gridY });
    } else {
      setDragOverCell(null);
    }
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverCell(null);

    try {
      const furnitureData: FurnitureItemFromSidebar = JSON.parse(
        e.dataTransfer.getData("application/json"),
      );

      // Calculate drop position and snap to grid
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate the same scale used for canvas dimensions
      const targetCanvasSize = 600;

      let maxRoomDimension;
      if (roomShape.type === "l-shape") {
        const mainWidth = roomShape.mainWidth || roomWidth;
        const mainLength = roomShape.mainLength || roomHeight;
        const extWidth = roomShape.extensionWidth || 60;
        const extLength = roomShape.extensionLength || 60;

        let canvasWidth = Math.max(mainWidth, extWidth);
        let canvasHeight = Math.max(mainLength, extLength);

        if (
          roomShape.extensionPosition === "top-right" ||
          roomShape.extensionPosition === "bottom-right"
        ) {
          canvasWidth = mainWidth + extWidth;
        }

        if (
          roomShape.extensionPosition === "top-right" ||
          roomShape.extensionPosition === "top-left"
        ) {
          canvasHeight = mainLength + extLength;
        }

        maxRoomDimension = Math.max(canvasWidth, canvasHeight);
      } else {
        maxRoomDimension = Math.max(roomWidth, roomHeight);
      }

      const baseScale = targetCanvasSize / maxRoomDimension;
      const finalScale = baseScale * (scale / 5.6);

      const gridX = Math.floor(x / (gridSize * finalScale));
      const gridY = Math.floor(y / (gridSize * finalScale));

      // Only allow drop if the cell is within the room bounds
      if (!isGridCellInRoom(gridX, gridY)) {
        return;
      }

      // Convert grid position to inches
      const positionX = gridX * gridSize;
      const positionY = gridY * gridSize;

      // Create new furniture item
      const newItem: FurnitureItemType = {
        id: `item-${Date.now()}`,
        type: furnitureData.id,
        name: furnitureData.name,
        x: positionX,
        y: positionY,
        width: furnitureData.width,
        height: furnitureData.depth,
        rotation: 0,
      };

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      onFurnitureUpdate(updatedItems);
    } catch (error) {
      console.error("Error parsing dropped furniture data:", error);
    }
  };

  // Handle furniture item updates
  const handleItemUpdate = (updatedItem: FurnitureItemType) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    setItems(updatedItems);
    onFurnitureUpdate(updatedItems);
  };

  // Handle furniture item deletion
  const handleItemDelete = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    onFurnitureUpdate(updatedItems);
    if (selectedItem === itemId) {
      setSelectedItem(null);
    }
  };

  // Check if a grid cell is within the room bounds
  const isGridCellInRoom = (col: number, row: number) => {
    if (roomShape.type === "rectangle") {
      return true; // All cells within bounds are valid for rectangle
    }

    if (roomShape.type === "l-shape") {
      const mainWidth = roomShape.mainWidth || roomWidth;
      const mainLength = roomShape.mainLength || roomHeight;
      const extWidth = roomShape.extensionWidth || 60;
      const extLength = roomShape.extensionLength || 60;

      const mainCols = Math.ceil(mainWidth / gridSize);
      const mainRows = Math.ceil(mainLength / gridSize);
      const extCols = Math.ceil(extWidth / gridSize);
      const extRows = Math.ceil(extLength / gridSize);

      // Check if cell is in main rectangle (always starts at 0,0)
      const inMainRect = col < mainCols && row < mainRows;

      // Check if cell is in extension based on position
      let inExtension = false;
      switch (roomShape.extensionPosition) {
        case "top-right":
          inExtension =
            col >= mainCols && col < mainCols + extCols && row < extRows;
          break;
        case "top-left":
          inExtension =
            col >= Math.max(0, mainCols - extCols) &&
            col < mainCols &&
            row < extRows;
          break;
        case "bottom-right":
          inExtension =
            col >= mainCols &&
            col < mainCols + extCols &&
            row >= mainRows &&
            row < mainRows + extRows;
          break;
        case "bottom-left":
          inExtension =
            col >= Math.max(0, mainCols - extCols) &&
            col < mainCols &&
            row >= mainRows &&
            row < mainRows + extRows;
          break;
      }

      return inMainRect || inExtension;
    }

    if (roomShape.type === "trapezoid") {
      const topWidth = roomShape.topWidth || 80;
      const bottomWidth = roomShape.bottomWidth || 120;
      const height = roomShape.height || 120;

      const totalRows = Math.ceil(height / gridSize);
      const cellY = row * gridSize;
      const progress = cellY / height; // 0 at top, 1 at bottom

      // Linear interpolation between top and bottom widths
      const currentWidth = topWidth + (bottomWidth - topWidth) * progress;
      const maxCols = Math.ceil(currentWidth / gridSize);

      // Center the trapezoid horizontally
      const totalCols = Math.ceil(Math.max(topWidth, bottomWidth) / gridSize);
      const offset = Math.floor((totalCols - maxCols) / 2);

      return row < totalRows && col >= offset && col < offset + maxCols;
    }

    if (roomShape.type === "triangle") {
      const base = roomShape.base || 120;
      const triangleHeight = roomShape.triangleHeight || 120;

      const totalRows = Math.ceil(triangleHeight / gridSize);
      const cellY = row * gridSize;
      const progress = cellY / triangleHeight; // 0 at top, 1 at bottom

      // Width increases linearly from 0 at top to base at bottom
      const currentWidth = base * progress;
      const maxCols = Math.ceil(currentWidth / gridSize);

      // Center the triangle horizontally
      const totalCols = Math.ceil(base / gridSize);
      const offset = Math.floor((totalCols - maxCols) / 2);

      return row < totalRows && col >= offset && col < offset + maxCols;
    }

    if (roomShape.type === "pentagon" || roomShape.type === "hexagon") {
      const radius = roomShape.radius || 80;
      const sides = roomShape.sides || (roomShape.type === "pentagon" ? 5 : 6);

      // Convert grid position to actual coordinates
      const cellX = col * gridSize;
      const cellY = row * gridSize;

      // Center of the polygon
      const centerX = radius;
      const centerY = radius;

      // Check if point is inside polygon using ray casting
      const dx = cellX - centerX;
      const dy = cellY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Simple approximation: check if within radius (will be refined for actual polygon shape)
      return distance <= radius;
    }

    return false;
  };

  // Generate grid cells
  const renderGrid = () => {
    if (!showGrid) return null;

    const gridCells = [];
    // Calculate the same scale used for canvas dimensions
    const targetCanvasSize = 600;

    let maxRoomDimension, canvasWidth, canvasHeight;

    if (roomShape.type === "l-shape") {
      const mainWidth = roomShape.mainWidth || roomWidth;
      const mainLength = roomShape.mainLength || roomHeight;
      const extWidth = roomShape.extensionWidth || 60;
      const extLength = roomShape.extensionLength || 60;

      canvasWidth = Math.max(mainWidth, extWidth);
      canvasHeight = Math.max(mainLength, extLength);

      if (
        roomShape.extensionPosition === "top-right" ||
        roomShape.extensionPosition === "bottom-right"
      ) {
        canvasWidth = mainWidth + extWidth;
      }

      if (
        roomShape.extensionPosition === "top-right" ||
        roomShape.extensionPosition === "top-left"
      ) {
        canvasHeight = mainLength + extLength;
      }

      maxRoomDimension = Math.max(canvasWidth, canvasHeight);
    } else {
      maxRoomDimension = Math.max(roomWidth, roomHeight);
      canvasWidth = roomWidth;
      canvasHeight = roomHeight;
    }

    const baseScale = targetCanvasSize / maxRoomDimension;
    const finalScale = baseScale * (scale / 5.6);
    const cellSize = gridSize * finalScale; // Grid cell size in pixels

    const cols = Math.ceil(canvasWidth / gridSize);
    const rows = Math.ceil(canvasHeight / gridSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Skip cells that are outside the room shape
        if (!isGridCellInRoom(col, row)) {
          continue;
        }

        const x = col * cellSize;
        const y = row * cellSize;

        const isHighlighted =
          dragOverCell && dragOverCell.x === col && dragOverCell.y === row;

        gridCells.push(
          <div
            key={`cell-${row}-${col}`}
            className={`absolute border border-gray-200 transition-colors duration-150 ${
              isHighlighted ? "bg-blue-100 border-blue-300" : "hover:bg-gray-50"
            }`}
            style={{
              left: x,
              top: y,
              width: cellSize,
              height: cellSize,
            }}
          />,
        );
      }
    }

    return <>{gridCells}</>;
  };

  // Generate measurement labels
  const renderMeasurements = () => {
    if (!showMeasurements) return null;

    const footLabelsHorizontal = [];
    const footLabelsVertical = [];
    // Calculate the same scale used for canvas dimensions
    const targetCanvasSize = 600;
    const maxRoomDimension = Math.max(roomWidth, roomHeight);
    const baseScale = targetCanvasSize / maxRoomDimension;
    const finalScale = baseScale * (scale / 5.6);
    const cellSize = gridSize * finalScale;

    // Horizontal measurement labels (every grid cell)
    for (let i = 0; i <= Math.ceil(roomWidth / gridSize); i++) {
      const x = i * cellSize;
      footLabelsHorizontal.push(
        <text
          key={`label-h-${i}`}
          x={x}
          y="15"
          textAnchor="middle"
          fontSize="10"
          fill="#666"
          className="pointer-events-none"
        >
          {i * 2}'
        </text>,
      );
    }

    // Vertical measurement labels (every grid cell)
    for (let i = 0; i <= Math.ceil(roomHeight / gridSize); i++) {
      const y = i * cellSize;
      footLabelsVertical.push(
        <text
          key={`label-v-${i}`}
          x="15"
          y={y + 4}
          textAnchor="start"
          fontSize="10"
          fill="#666"
          className="pointer-events-none"
        >
          {i * 2}'
        </text>,
      );
    }

    return (
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        width={canvasDimensions.width}
        height={canvasDimensions.height}
      >
        {footLabelsHorizontal}
        {footLabelsVertical}
      </svg>
    );
  };

  return (
    <Card className="relative bg-white p-0 overflow-hidden">
      <div className="flex justify-between p-2 border-b">
        <div>
          {roomShape.type === "rectangle" ? (
            <>
              <span className="text-sm font-medium">
                Room: {roomWidth}" × {roomHeight}"
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                ({Math.floor(roomWidth / 12)}' × {Math.floor(roomHeight / 12)}')
              </span>
            </>
          ) : roomShape.type === "trapezoid" ? (
            <>
              <span className="text-sm font-medium">Trapezoid Room</span>
              <span className="text-xs text-muted-foreground ml-2">
                Top: {roomShape.topWidth}", Bottom: {roomShape.bottomWidth}",
                Height: {roomShape.height}"
              </span>
            </>
          ) : roomShape.type === "triangle" ? (
            <>
              <span className="text-sm font-medium">Triangle Room</span>
              <span className="text-xs text-muted-foreground ml-2">
                Base: {roomShape.base}", Height: {roomShape.triangleHeight}"
              </span>
            </>
          ) : roomShape.type === "pentagon" ? (
            <>
              <span className="text-sm font-medium">Pentagon Room</span>
              <span className="text-xs text-muted-foreground ml-2">
                Radius: {roomShape.radius}"
              </span>
            </>
          ) : roomShape.type === "hexagon" ? (
            <>
              <span className="text-sm font-medium">Hexagon Room</span>
              <span className="text-xs text-muted-foreground ml-2">
                Radius: {roomShape.radius}"
              </span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">L-Shape Room</span>
              <span className="text-xs text-muted-foreground ml-2">
                Main: {roomShape.mainWidth}"×{roomShape.mainLength}", Ext:{" "}
                {roomShape.extensionWidth}"×{roomShape.extensionLength}"
              </span>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={hasCopiedData() ? "default" : "secondary"}
            size="sm"
            onClick={handlePaste}
            disabled={!hasCopiedData()}
            className="text-xs px-2 py-1"
          >
            <Clipboard size={12} className="mr-1" />
            Paste
          </Button>
          <button
            className={`text-xs px-2 py-1 rounded ${showGrid ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => setShowGrid(!showGrid)}
          >
            Grid
          </button>
          <button
            className={`text-xs px-2 py-1 rounded ${showMeasurements ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
            onClick={() => setShowMeasurements(!showMeasurements)}
          >
            Measurements
          </button>
        </div>
      </div>
      <div
        ref={canvasRef}
        className="relative bg-white border-2 border-dashed border-muted-foreground/20 overflow-hidden"
        style={{
          width: canvasDimensions.width,
          height: canvasDimensions.height,
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Grid cells */}
        {renderGrid()}

        {/* Measurement labels */}
        {renderMeasurements()}

        {/* Render furniture items */}
        {items.map((item) => {
          // Calculate the same scale used for canvas dimensions
          const targetCanvasSize = 600;

          let maxRoomDimension;
          if (roomShape.type === "l-shape") {
            const mainWidth = roomShape.mainWidth || roomWidth;
            const mainLength = roomShape.mainLength || roomHeight;
            const extWidth = roomShape.extensionWidth || 60;
            const extLength = roomShape.extensionLength || 60;

            let canvasWidth = Math.max(mainWidth, extWidth);
            let canvasHeight = Math.max(mainLength, extLength);

            if (
              roomShape.extensionPosition === "top-right" ||
              roomShape.extensionPosition === "bottom-right"
            ) {
              canvasWidth = mainWidth + extWidth;
            }

            if (
              roomShape.extensionPosition === "top-right" ||
              roomShape.extensionPosition === "top-left"
            ) {
              canvasHeight = mainLength + extLength;
            }

            maxRoomDimension = Math.max(canvasWidth, canvasHeight);
          } else {
            maxRoomDimension = Math.max(roomWidth, roomHeight);
          }

          const baseScale = targetCanvasSize / maxRoomDimension;
          const finalScale = baseScale * (scale / 5.6);

          return (
            <FurnitureItem
              key={item.id}
              item={item}
              scale={finalScale}
              isSelected={selectedItem === item.id}
              onSelect={() => setSelectedItem(item.id)}
              onUpdate={handleItemUpdate}
              onDelete={handleItemDelete}
            />
          );
        })}

        {/* Drop zone indicator */}
        {dragOverCell &&
          (() => {
            // Calculate the same scale used for canvas dimensions
            const targetCanvasSize = 600;

            let maxRoomDimension;
            if (roomShape.type === "l-shape") {
              const mainWidth = roomShape.mainWidth || roomWidth;
              const mainLength = roomShape.mainLength || roomHeight;
              const extWidth = roomShape.extensionWidth || 60;
              const extLength = roomShape.extensionLength || 60;

              let canvasWidth = Math.max(mainWidth, extWidth);
              let canvasHeight = Math.max(mainLength, extLength);

              if (
                roomShape.extensionPosition === "top-right" ||
                roomShape.extensionPosition === "bottom-right"
              ) {
                canvasWidth = mainWidth + extWidth;
              }

              if (
                roomShape.extensionPosition === "top-right" ||
                roomShape.extensionPosition === "top-left"
              ) {
                canvasHeight = mainLength + extLength;
              }

              maxRoomDimension = Math.max(canvasWidth, canvasHeight);
            } else {
              maxRoomDimension = Math.max(roomWidth, roomHeight);
            }

            const baseScale = targetCanvasSize / maxRoomDimension;
            const finalScale = baseScale * (scale / 5.6);

            return (
              <div
                className="absolute border-2 border-blue-500 bg-blue-100/50 pointer-events-none z-20"
                style={{
                  left: dragOverCell.x * gridSize * finalScale,
                  top: dragOverCell.y * gridSize * finalScale,
                  width: gridSize * finalScale,
                  height: gridSize * finalScale,
                }}
              />
            );
          })()}
      </div>
    </Card>
  );
};

export default FloorPlanCanvas;
