import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import TableView from "@/components/userManagement/TableView";

export default function UserManagement() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any>();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleFetchUsers = async () => {
    try {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();

      console.log(users);
      if (error) throw error;
      setUsers(users);
    } catch (error) {
      toast.error("Error Fetching user");
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.admin.inviteUserByEmail(email);
      if (error) throw error;
      toast.success("User invited successfully");
      setEmail("");
    } catch (error) {
      toast.error("Error inviting user");
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        email,
        data: { role: "admin" },
      });
      if (error) throw error;
      toast.success("User invited successfully");
      setEmail("");
    } catch (error) {
      toast.error("Error inviting user");
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          name,
        },
      });
      if (error) throw error;
      toast.success("User created successfully");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Error creating user");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddUser} className="space-y-4 max-w-md">
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
