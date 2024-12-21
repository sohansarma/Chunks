import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import { Card } from "@/ui/card";
import QueryControls from "@/components/query-editor/QueryControls";
import ResultsTable from "@/components/query-editor/ResultsTable";

const QueryEditor = () => {
  const [tables, setTables] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [whereClause, setWhereClause] = useState("");
  const [setClause, setSetClause] = useState("");
  const [valuesClause, setValuesClause] = useState("");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [savedQueries, setSavedQueries] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    if (selectedTable) fetchColumns(selectedTable);
  }, [selectedTable]);

  useEffect(() => {
    generateQuery();
  }, [
    selectedTable,
    selectedOperation,
    selectedColumns,
    whereClause,
    setClause,
    valuesClause,
    limit,
    offset,
  ]);

  const fetchTables = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockTables = ["users", "posts", "comments"].map((name) => ({
        label: name,
        value: name,
      }));
      setTables(mockTables);
    } catch (error) {
      toast.error("Failed to fetch tables");
    }
  };

  const fetchColumns = async (tableName: string) => {
    try {
      // Mock data for now - replace with actual API call
      const mockColumns = ["id", "name", "email", "created_at"];
      setColumns(mockColumns);
    } catch (error) {
      toast.error("Failed to fetch columns");
    }
  };

  const generateQuery = () => {
    if (!selectedTable || !selectedOperation) return setQuery("");

    const columnsString = selectedColumns.length
      ? selectedColumns.join(", ")
      : "*";

    let generatedQuery = "";
    switch (selectedOperation) {
      case "SELECT":
        generatedQuery = `SELECT ${columnsString} FROM ${selectedTable}`;
        if (whereClause) generatedQuery += ` WHERE ${whereClause}`;
        if (limit) generatedQuery += ` LIMIT ${limit}`;
        if (offset) generatedQuery += ` OFFSET ${offset}`;
        break;
      case "INSERT":
        generatedQuery = `INSERT INTO ${selectedTable} (${columnsString}) VALUES (${valuesClause})`;
        break;
      case "UPDATE":
        generatedQuery = `UPDATE ${selectedTable} SET ${setClause}`;
        if (whereClause) generatedQuery += ` WHERE ${whereClause}`;
        break;
      case "DELETE":
        generatedQuery = `DELETE FROM ${selectedTable}`;
        if (whereClause) generatedQuery += ` WHERE ${whereClause}`;
        break;
      default:
        break;
    }
    setQuery(generatedQuery);
  };

  const handleExecute = async () => {
    try {
      // Replace with actual query execution
      const mockResults = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];
      setResults(mockResults);
      toast.success("Query executed successfully!");
    } catch (error) {
      toast.error("Failed to execute query");
    }
  };

  const handleSave = () => {
    setSavedQueries([...savedQueries, query]);
    toast.success("Query saved successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    toast.success("Query copied to clipboard!");
  };

  const handleClear = () => {
    setSelectedTable("");
    setSelectedColumns([]);
    setSelectedOperation("");
    setWhereClause("");
    setSetClause("");
    setValuesClause("");
    setQuery("");
    setLimit(20);
    setOffset(0);
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Query Editor</h2>

      <Card className="p-6">
        <QueryControls
          tables={tables}
          columns={columns}
          selectedTable={selectedTable}
          selectedOperation={selectedOperation}
          selectedColumns={selectedColumns}
          whereClause={whereClause}
          setClause={setClause}
          valuesClause={valuesClause}
          limit={limit}
          offset={offset}
          onTableChange={setSelectedTable}
          onOperationChange={setSelectedOperation}
          onColumnsChange={(value) => setSelectedColumns([value])}
          onWhereClauseChange={setWhereClause}
          onSetClauseChange={setSetClause}
          onValuesClauseChange={setValuesClause}
          onLimitChange={setLimit}
          onOffsetChange={setOffset}
          onExecute={handleExecute}
          onSave={handleSave}
          onCopy={handleCopy}
          onClear={handleClear}
        />

        <div className="mt-4">
          <Editor
            height="200px"
            defaultLanguage="sql"
            theme="vs-dark"
            value={query}
            onChange={(value) => setQuery(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16, bottom: 16 },
              suggestOnTriggerCharacters: true,
            }}
          />
        </div>

        <ResultsTable data={results} />
      </Card>
    </div>
  );
};

export default QueryEditor;
