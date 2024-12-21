import { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import TableView from "@/components/userManagement/TableView";

export default function UserManagement() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any>();

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  useEffect(() => {}, []);

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Input
                type="name"
                placeholder="New user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="New user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="New user password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Add User</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-10">
        <TableView users={users} />
      </div>
    </div>
  );
}
