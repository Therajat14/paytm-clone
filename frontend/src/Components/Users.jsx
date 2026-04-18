import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Heading from "./Heading";
import SubHeading from "./Subheading";
import Button from "./Button";
import { useNavigate } from "react-router";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }
      fetchUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/auth/bulk?filter=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔤 Avatar initials
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-md mx-auto space-y-6">
        {/* 🧠 Header (reused components) */}
        <div className="space-y-1">
          <Heading title="Find Users" />
          <SubHeading text="Search and send money to users" />
        </div>

        {/* 🔍 Search */}
        <InputField
          label="Search"
          name="search"
          placeholder="Type a name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ⏳ Loading */}
        {loading && <p className="text-sm text-gray-500">Searching...</p>}

        {/* 👥 Users List */}
        <div className="space-y-2">
          {!loading && search && users.length === 0 && (
            <div className="text-center text-sm text-gray-400 py-6">
              No users found for <span className="text-black">{search}</span>
            </div>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="
                flex justify-between items-center
                p-3
                border border-gray-200
                rounded-md
                hover:bg-gray-50
                transition
              "
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                  {getInitials(user.name)}
                </div>

                <div>
                  <p className="font-medium text-black">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Right (reused Button) */}
              <div className="w-[110px]">
                <Button
                  onClick={() =>
                    navigate(`/send?to=${user._id}&name=${user.name}`)
                  }
                >
                  Send
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
