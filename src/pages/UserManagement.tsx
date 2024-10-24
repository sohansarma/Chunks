import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function UserManagement() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
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
    </div>
  );
}
