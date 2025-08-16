import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Save,
  Trash2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Plus,
  Download,
  Upload,
  FileDown,
} from "lucide-react";
import FloorPlanCanvas, { FurnitureItemType } from "./FloorPlanCanvas";
import FurnitureSidebar from "./FurnitureSidebar";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";

interface RoomDimensions {
  width: number;
  length: number;
}

interface FloorPlanData {
  roomDimensions: RoomDimensions;
  furniture: FurnitureItemType[];
  exportDate: string;
  version: string;
}

const Home = () => {
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    width: 120,
    length: 120,
  }); // Default 10ft x 10ft in inches
  const [appliedDimensions, setAppliedDimensions] = useState<RoomDimensions>({
    width: 120,
    length: 120,
  }); // Dimensions currently applied to the canvas
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(
    null,
  );
  const [furniture, setFurniture] = useState<FurnitureItemType[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDimensionChange = (
    dimension: keyof RoomDimensions,
    value: string,
  ) => {
    const numValue = parseInt(value) || 0;
    setRoomDimensions((prev) => ({ ...prev, [dimension]: numValue }));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleClearCanvas = () => {
    setFurniture([]);
    setSelectedFurniture(null);
  };

  const handleSaveLayout = () => {
    // This would be implemented to save the current layout
    console.log("Saving layout");
  };

  const handleApplyDimensions = () => {
    setAppliedDimensions({ ...roomDimensions });
    // Clear furniture when room dimensions change
    setFurniture([]);
  };

  const handleExport = async (format: "png" | "jpg" | "pdf") => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current.querySelector(".floor-plan-canvas");
      if (!canvas) return;

      const fileName = `floor-plan-${Date.now()}`;

      if (format === "png") {
        const dataUrl = await toPng(canvas as HTMLElement, {
          quality: 1.0,
          backgroundColor: "#ffffff",
        });
        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
      } else if (format === "jpg") {
        const dataUrl = await toJpeg(canvas as HTMLElement, {
          quality: 0.95,
          backgroundColor: "#ffffff",
        });
        const link = document.createElement("a");
        link.download = `${fileName}.jpg`;
        link.href = dataUrl;
        link.click();
      } else if (format === "pdf") {
        const dataUrl = await toPng(canvas as HTMLElement, {
          quality: 1.0,
          backgroundColor: "#ffffff",
        });

        const img = new Image();
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: img.width > img.height ? "landscape" : "portrait",
            unit: "px",
            format: [img.width, img.height],
          });

          pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
          pdf.save(`${fileName}.pdf`);
        };
        img.src = dataUrl;
      }
    } catch (error) {
      console.error("Error exporting floor plan:", error);
    }
  };

  const handleExportFloorPlan = () => {
    const floorPlanData: FloorPlanData = {
      roomDimensions: appliedDimensions,
      furniture: furniture,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(floorPlanData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `floor-plan-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportFloorPlan = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const floorPlanData: FloorPlanData = JSON.parse(content);

        // Validate the imported data structure
        if (
          !floorPlanData.roomDimensions ||
          !Array.isArray(floorPlanData.furniture) ||
          typeof floorPlanData.roomDimensions.width !== "number" ||
          typeof floorPlanData.roomDimensions.length !== "number"
        ) {
          alert("Invalid floor plan file format");
          return;
        }

        // Validate each furniture item has required position properties
        const validFurniture = floorPlanData.furniture.filter((item) => {
          return (
            item &&
            typeof item.id === "string" &&
            typeof item.x === "number" &&
            typeof item.y === "number" &&
            typeof item.width === "number" &&
            typeof item.height === "number" &&
            typeof item.rotation === "number"
          );
        });

        if (validFurniture.length !== floorPlanData.furniture.length) {
          console.warn(
            `Filtered out ${floorPlanData.furniture.length - validFurniture.length} invalid furniture items`,
          );
        }

        // Apply the imported data with validated furniture
        setRoomDimensions(floorPlanData.roomDimensions);
        setAppliedDimensions(floorPlanData.roomDimensions);
        setFurniture(validFurniture);

        console.log(
          `Imported floor plan from ${floorPlanData.exportDate} with ${validFurniture.length} furniture items`,
        );
        alert(
          `Successfully imported floor plan with ${validFurniture.length} furniture items`,
        );
      } catch (error) {
        console.error("Error importing floor plan:", error);
        alert("Error reading floor plan file. Please check the file format.");
      }
    };
    reader.readAsText(file);

    // Reset the input value so the same file can be imported again
    event.target.value = "";
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportIndividualItems = async (format: "png" | "jpg") => {
    if (!canvasRef.current || furniture.length === 0) {
      alert("No furniture items to export");
      return;
    }

    try {
      const canvas = canvasRef.current.querySelector(".floor-plan-canvas");
      if (!canvas) return;

      // Create a temporary container for individual exports
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.background = "white";
      document.body.appendChild(tempContainer);

      const timestamp = Date.now();
      let exportCount = 0;

      for (const item of furniture) {
        try {
          // Calculate item bounds with some padding
          const padding = 50; // pixels
          const itemScale = zoomLevel * 5.6;
          const itemWidth = item.width * itemScale + padding * 2;
          const itemHeight = item.height * itemScale + padding * 2;

          // Create a temporary canvas for this item
          tempContainer.innerHTML = `
            <div style="
              width: ${itemWidth}px;
              height: ${itemHeight}px;
              position: relative;
              background: white;
              border: 1px solid #e5e7eb;
            ">
              <!-- Grid background -->
              <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                  linear-gradient(to right, #f3f4f6 1px, transparent 1px),
                  linear-gradient(to bottom, #f3f4f6 1px, transparent 1px);
                background-size: ${24 * itemScale}px ${24 * itemScale}px;
                opacity: 0.5;
              "></div>
              
              <!-- Item container -->
              <div style="
                position: absolute;
                left: ${padding}px;
                top: ${padding}px;
                width: ${item.width * itemScale}px;
                height: ${item.height * itemScale}px;
                transform: rotate(${item.rotation}deg);
                transform-origin: center;
              ">
                <div style="
                  width: 100%;
                  height: 100%;
                  background: white;
                  border: 2px solid #374151;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                ">
                  ${generateFurnitureDrawing(item.type, item.width * itemScale, item.height * itemScale)}
                  <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: #1f2937;
                    color: white;
                    font-size: 10px;
                    padding: 2px 4px;
                    border-radius: 0 0 4px 0;
                  ">${item.type}</div>
                </div>
              </div>
              
              <!-- Item info -->
              <div style="
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 12px;
                text-align: center;
              ">
                ${item.name || item.type}<br>
                ${Math.round(item.width)}" × ${Math.round(item.height)}"
              </div>
            </div>
          `;

          // Wait a moment for rendering
          await new Promise((resolve) => setTimeout(resolve, 100));

          const itemElement = tempContainer.firstElementChild as HTMLElement;
          if (itemElement) {
            const dataUrl =
              format === "png"
                ? await toPng(itemElement, {
                    quality: 1.0,
                    backgroundColor: "#ffffff",
                  })
                : await toJpeg(itemElement, {
                    quality: 0.95,
                    backgroundColor: "#ffffff",
                  });

            const link = document.createElement("a");
            const fileName = `${item.name || item.type}-${timestamp}-${exportCount + 1}.${format}`;
            link.download = fileName.replace(/[^a-z0-9.-]/gi, "_");
            link.href = dataUrl;
            link.click();

            exportCount++;
          }
        } catch (error) {
          console.error(`Error exporting item ${item.name}:`, error);
        }
      }

      // Clean up
      document.body.removeChild(tempContainer);

      alert(
        `Successfully exported ${exportCount} furniture items as ${format.toUpperCase()} files`,
      );
    } catch (error) {
      console.error("Error exporting individual items:", error);
      alert("Error exporting individual items. Please try again.");
    }
  };

  // Helper function to generate furniture SVG (same as in FurnitureSidebar)
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
        return `
          <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="position: absolute; top: 0; left: 0;">
            <rect x="2" y="2" width="${width - 4}" height="${height - 4}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" />
            <rect x="2" y="2" width="${width - 4}" height="8" stroke="${stroke}" stroke-width="${strokeWidth}" fill="#f3f4f6" />
            <rect x="6" y="6" width="${Math.min(width / 3, 20)}" height="6" stroke="${stroke}" stroke-width="1" fill="${fill}" />
            <rect x="${width - Math.min(width / 3, 20) - 6}" y="6" width="${Math.min(width / 3, 20)}" height="6" stroke="${stroke}" stroke-width="1" fill="${fill}" />
          </svg>
        `;

      case "sofa":
      case "sectional":
      case "loveseat":
        return `
          <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="position: absolute; top: 0; left: 0;">
            <rect x="4" y="4" width="${width - 8}" height="${height - 8}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" />
            <rect x="6" y="6" width="${width - 12}" height="6" stroke="${stroke}" stroke-width="1" fill="${fill}" />
            <rect x="6" y="${height / 2 - 2}" width="${(width - 12) / 2 - 2}" height="${height / 2 - 6}" stroke="${stroke}" stroke-width="1" fill="${fill}" />
            <rect x="${width / 2 + 2}" y="${height / 2 - 2}" width="${(width - 12) / 2 - 2}" height="${height / 2 - 6}" stroke="${stroke}" stroke-width="1" fill="${fill}" />
            <rect x="2" y="4" width="4" height="${height - 8}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" />
            <rect x="${width - 6}" y="4" width="4" height="${height - 8}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" />
          </svg>
        `;

      default:
        return `
          <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="position: absolute; top: 0; left: 0;">
            <rect x="2" y="2" width="${width - 4}" height="${height - 4}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" />
            <line x1="2" y1="2" x2="${width - 2}" y2="${height - 2}" stroke="${stroke}" stroke-width="1" />
            <line x1="${width - 2}" y1="2" x2="2" y2="${height - 2}" stroke="${stroke}" stroke-width="1" />
          </svg>
        `;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card p-4 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Floor Planner</h1>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Label htmlFor="width" className="whitespace-nowrap">
                Width (inches):
              </Label>
              <Input
                id="width"
                type="number"
                value={roomDimensions.width}
                onChange={(e) => handleDimensionChange("width", e.target.value)}
                className="w-20"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="length" className="whitespace-nowrap">
                Length (inches):
              </Label>
              <Input
                id="length"
                type="number"
                value={roomDimensions.length}
                onChange={(e) =>
                  handleDimensionChange("length", e.target.value)
                }
                className="w-20"
              />
            </div>

            <Button onClick={handleApplyDimensions}>
              <Plus className="h-4 w-4 mr-2" />
              Create Room
            </Button>

            <Button variant="outline" onClick={handleClearCanvas}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>

            <Button onClick={handleSaveLayout}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            <Button variant="outline" onClick={handleExportFloorPlan}>
              <FileDown className="h-4 w-4 mr-2" />
              Export Plan
            </Button>

            <Button variant="outline" onClick={handleImportClick}>
              <Upload className="h-4 w-4 mr-2" />
              Import Plan
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFloorPlan}
              style={{ display: "none" }}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Image
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("png")}>
                  Export Full Plan as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("jpg")}>
                  Export Full Plan as JPG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  Export Full Plan as PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExportIndividualItems("png")}
                >
                  Export Each Item as PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExportIndividualItems("jpg")}
                >
                  Export Each Item as JPG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card overflow-y-auto flex-shrink-0">
          <FurnitureSidebar onSelectFurniture={setSelectedFurniture} />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Zoom Controls */}
          <div className="flex justify-between items-center p-3 border-b bg-card">
            <div className="text-sm text-muted-foreground">
              Room: {appliedDimensions.width}" × {appliedDimensions.length}" (
              {Math.floor(appliedDimensions.width / 12)}' ×{" "}
              {Math.floor(appliedDimensions.length / 12)}')
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleResetZoom}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div ref={canvasRef} className="flex-1 overflow-auto bg-muted/10 p-6">
            <div className="floor-plan-canvas flex justify-center items-start min-h-full">
              <FloorPlanCanvas
                roomWidth={appliedDimensions.width}
                roomHeight={appliedDimensions.length}
                scale={zoomLevel * 5.6}
                furniture={furniture}
                onFurnitureUpdate={setFurniture}
                selectedFurniture={selectedFurniture}
                onFurniturePlaced={() => setSelectedFurniture(null)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t p-2 text-center text-sm text-muted-foreground">
        <p>
          Drag and drop furniture items to design your floor plan. All
          measurements are in inches.
        </p>
      </footer>
    </div>
  );
};

export default Home;
