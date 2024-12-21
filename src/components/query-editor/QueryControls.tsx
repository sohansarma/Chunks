import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Input } from "@/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { Copy, Play, RefreshCw, Save } from "lucide-react";

interface QueryControlsProps {
  tables: Array<{ label: string; value: string }>;
  columns: string[];
  selectedTable: string;
  selectedOperation: string;
  selectedColumns: string[];
  whereClause: string;
  setClause: string;
  valuesClause: string;
  limit: number;
  offset: number;
  onTableChange: (value: string) => void;
  onOperationChange: (value: string) => void;
  onColumnsChange: (value: string) => void;
  onWhereClauseChange: (value: string) => void;
  onSetClauseChange: (value: string) => void;
  onValuesClauseChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onOffsetChange: (value: number) => void;
  onExecute: () => void;
  onSave: () => void;
  onCopy: () => void;
  onClear: () => void;
}

const QueryControls = ({
  tables,
  columns,
  selectedTable,
  selectedOperation,
  selectedColumns,
  whereClause,
  setClause,
  valuesClause,
  limit,
  offset,
  onTableChange,
  onOperationChange,
  onColumnsChange,
  onWhereClauseChange,
  onSetClauseChange,
  onValuesClauseChange,
  onLimitChange,
  onOffsetChange,
  onExecute,
  onSave,
  onCopy,
  onClear,
}: QueryControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={selectedTable} onValueChange={onTableChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Table" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table.value} value={table.value}>
                {table.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedOperation} onValueChange={onOperationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SELECT">Select</SelectItem>
            <SelectItem value="INSERT">Insert</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedColumns[0] || ""}
          onValueChange={onColumnsChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Column" />
          </SelectTrigger>
          <SelectContent>
            {columns.map((column) => (
              <SelectItem key={column} value={column}>
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedOperation === "UPDATE" && (
        <Input
          placeholder="SET Clause"
          value={setClause}
          onChange={(e) => onSetClauseChange(e.target.value)}
        />
      )}

      {["SELECT", "UPDATE", "DELETE"].includes(selectedOperation) && (
        <Input
          placeholder="WHERE Clause"
          value={whereClause}
          onChange={(e) => onWhereClauseChange(e.target.value)}
        />
      )}

      {selectedOperation === "INSERT" && (
        <Input
          placeholder="VALUES Clause"
          value={valuesClause}
          onChange={(e) => onValuesClauseChange(e.target.value)}
        />
      )}

      {selectedOperation === "SELECT" && (
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Limit"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Offset"
            value={offset}
            onChange={(e) => onOffsetChange(Number(e.target.value))}
          />
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={onExecute}>
          <Play className="w-4 h-4 mr-2" />
          Execute
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onSave}>
                <Save className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save Query</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Query</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onClear}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Query</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default QueryControls;
