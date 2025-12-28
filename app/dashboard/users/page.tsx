"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/users/UserTable";
import { UserForm } from "@/components/users/UserForm";
import { DeleteUserDialog } from "@/components/users/DeleteUserDialog";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPublicKeyQuery,
  useLazyExportUsersProtobufQuery,
} from "@/store/services/users";
import { User, CreateUserRequest } from "@/types/user";
import { hashEmail, verifyUserSignature } from "@/utils/crypto";
import { toast } from "sonner";
import { decodeProtobuf } from "@/utils/proto";

const PAGE_SIZE = 10;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: usersData, isLoading } = useGetUsersQuery({ page, limit: PAGE_SIZE });
  const { data: publicKeyData } = useGetPublicKeyQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [triggerExport, { isLoading: isExporting }] = useLazyExportUsersProtobufQuery();

  const handleCreate = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: CreateUserRequest) => {
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser.id, data }).unwrap();
        toast.success("User updated successfully");
      } else {
        await createUser(data).unwrap();
        toast.success("User created successfully");
      }
      setFormOpen(false);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to save user";
      toast.error(message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.id).unwrap();
      toast.success("User deleted successfully");
      setDeleteOpen(false);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to delete user";
      toast.error(message);
    }
  };

  const handleExport = async () => {
    const loadingToast = toast.loading("Exporting users...");
    try {
      const result = await triggerExport(undefined, false).unwrap();
      const decoded = await decodeProtobuf(result);
      const validUsers = await verifyUsers(decoded.users);

      downloadProtobufFile(result);
      toast.success(`Export successful! Verified ${validUsers.length} of ${decoded.users.length} users.`, { id: loadingToast });
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to export users";
      toast.error(message, { id: loadingToast });
    }
  };

  const downloadProtobufFile = (arrayBuffer: ArrayBuffer) => {
    const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `users-export-${new Date().toISOString()}.pb`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  const verifyUsers = async (users: any[]): Promise<User[]> => {
    if (!publicKeyData?.publicKey) throw new Error("Public key not available");

    const verificationPromises = users.map(async (user) => {
      try {
        const computedHash = await hashEmail(user.email);
        const isValid = await verifyUserSignature(
          computedHash,
          user.signature,
          publicKeyData.publicKey
        );

        if (isValid && computedHash === user.emailHash) {
          return user;
        }
        return null
      } catch (error) {
        console.error("Failed to verify user", user.email, error);
        return null;
      }
    });
    const results = await Promise.all(verificationPromises);
    return results.filter((user): user is User => user !== null);
  };

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={handleExport} disabled={isExporting} className="flex-1 sm:flex-none">
            {isExporting ? "Exporting..." : "Export"}
          </Button>
          <Button onClick={handleCreate} className="flex-1 sm:flex-none">Create User</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : usersData?.users.length ? (
            <>
              <div className="overflow-x-auto">
                <UserTable
                  users={usersData.users}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto"
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {page} of {Math.ceil((usersData?.total || 0) / 10)}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= Math.ceil((usersData?.total || 0) / 10)}
                  className="w-full sm:w-auto"
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <div>No users found</div>
          )}
        </CardContent>
      </Card>

      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isCreating || isUpdating}
      />

      <DeleteUserDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        user={selectedUser}
        isLoading={isDeleting}
      />
    </div>
  );
}
