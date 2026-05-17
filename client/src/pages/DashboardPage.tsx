import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { removeToken } from "../utils/auth";

interface Lead {
  _id?: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const token =
  localStorage.getItem(
    "token"
  );

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      company: "",
      status: "New",
    });

  const [editingLeadId,
    setEditingLeadId] =
    useState<string | null>(
      null
    );

  const [editStatus,
    setEditStatus] =
    useState("New");

  const [searchTerm,
  setSearchTerm] =
  useState("");

const [filterStatus,
  setFilterStatus] =
  useState("All");  

  function handleLogout() {
    removeToken();

    toast.success(
  "Logged out successfully!"
);

    navigate("/");
  }

  // Fetch Leads
  const fetchLeads =
    async () => {
      try {
        const response =
         await axios.get(
  "http://localhost:5000/api/leads",
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);

        if (
          Array.isArray(
            response.data
          )
        ) {
          setLeads(
            response.data
          );
        } else {
          setLeads([]);
        }
      } catch (error) {
        console.error(
          "Error fetching leads:",
          error
        );

        setLeads([]);
      }
    };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Add Lead
  const handleAddLead =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await axios.post(
  "http://localhost:5000/api/leads",
  formData,
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);

        toast.success(
  "Lead added successfully!"
);

        setFormData({
          name: "",
          email: "",
          company: "",
          status: "New",
        });

        fetchLeads();
      } catch (error) {
        console.error(
          "Error adding lead:",
          error
        );

        toast.error(
  "Failed to add lead"
);
      }
    };

  // Delete Lead
  const handleDeleteLead =
    async (
      id: string
    ) => {
      try {
       await axios.delete(
  `http://localhost:5000/api/leads/${id}`,
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
); 

        toast.success(
  "Lead deleted successfully!"
);

        fetchLeads();
      } catch (error) {
        console.error(
          "Error deleting lead:",
          error
        );

       toast.error(
  "Failed to delete lead"
); 
      }
    };

  // Update Lead
  const handleUpdateLead =
    async (
      id: string
    ) => {
      try {
       await axios.put(
  `http://localhost:5000/api/leads/${id}`,
  {
    status:
      editStatus,
  },
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
); 

        toast.success(
  "Lead added successfully!"
);

        setEditingLeadId(
          null
        );

        fetchLeads();
      } catch (error) {
        console.error(
          "Error updating lead:",
          error
        );

        toast.error(
  "Failed to add lead"
);
      }
    };

const filteredLeads =
  leads.filter(
    (lead) => {
      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        lead.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        lead.company
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        filterStatus ===
          "All" ||
        lead.status ===
          filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

 const chartData = [
  {
    name: "New",
    value:
      leads.filter(
        (
          lead
        ) =>
          lead.status ===
          "New"
      ).length,
  },

  {
    name: "Pending",
    value:
      leads.filter(
        (
          lead
        ) =>
          lead.status ===
          "Pending"
      ).length,
  },

  {
    name:
      "Converted",
    value:
      leads.filter(
        (
          lead
        ) =>
          lead.status ===
          "Converted"
      ).length,
  },
];

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
];

  const stats = [
    {
      title:
        "Total Leads",
      value:
        leads.length,
    },
    {
      title:
        "New Leads",
      value:
        leads.filter(
          (
            lead
          ) =>
            lead.status ===
            "New"
        ).length,
    },
    {
      title:
        "Converted",
      value:
        leads.filter(
          (
            lead
          ) =>
            lead.status ===
            "Converted"
        ).length,
    },
    {
      title:
        "Pending",
      value:
        leads.filter(
          (
            lead
          ) =>
            lead.status ===
            "Pending"
        ).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-5 flex justify-between items-center">
       <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 
          Smart Leads Dashboard
        </h1>

        <button
          onClick={
            handleLogout
          }
          className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
        >
          Logout
        </button>
      </div>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(
            (
              stat,
              index
            ) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <p className="text-slate-300 text-xl">
                  {
                    stat.title
                  }
                </p>

                <h2 className="text-5xl font-bold mt-4 text-cyan-400">
                  {
                    stat.value
                  }
                </h2>
              </div>
            )
          )}
        </div>
        {/* Analytics Chart */}
<div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
  <h2 className="text-3xl font-bold mb-6 text-slate-900">
    Lead Analytics
  </h2>

  <div className="h-[350px]">
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={
            chartData
          }
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={
            110
          }
          label
        >
          {chartData.map(
            (
              entry,
              index
            ) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div className="flex justify-center gap-8 mt-4">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
      <span>
        New
      </span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
      <span>
        Pending
      </span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-green-500"></div>
      <span>
        Converted
      </span>
    </div>
  </div>
</div>

        {/* Add Lead */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mt-8 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white">
  Add New Lead
</h2>  

          <form
            onSubmit={
              handleAddLead
            }
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
              className="border border-white/10 bg-white/10 backdrop-blur-xl p-3 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              className="border border-white/10 bg-white/10 backdrop-blur-xl p-3 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={
                formData.company
              }
              onChange={
                handleChange
              }
              required
              className="border border-white/10 bg-white/10 backdrop-blur-xl p-3 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
              className="border border-white/10 bg-white/10 backdrop-blur-xl p-3 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>New</option>
              <option>Pending</option>
              <option>Converted</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-6 font-semibold lg:col-span-4"
            >
              Add Lead
            </button>
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mt-8 overflow-x-auto shadow-2xl">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
  <h2 className="text-4xl font-bold text-white">
  Leads Overview
</h2>

  <div className="flex gap-4 w-full md:w-auto">
    <input
      type="text"
      placeholder="Search leads..."
      value={
        searchTerm
      }
      onChange={(e) =>
        setSearchTerm(
          e.target.value
        )
      }
      className="border border-white/10 bg-white/10 rounded-xl px-4 py-2 w-full text-white placeholder:text-slate-400"
    />

    <select
      value={
        filterStatus
      }
      onChange={(e) =>
        setFilterStatus(
          e.target.value
        )
      }
      className="border border-white/10 bg-white/10 rounded-xl px-4 py-2 text-white"
    >
      <option>
        All
      </option>
      <option>
        New
      </option>
      <option>
        Pending
      </option>
      <option>
        Converted
      </option>
    </select>
  </div>
</div> 

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-300">
                <th className="py-4 text-xl">
                  Name
                </th>

                <th className="py-4 text-xl">
                  Email
                </th>

                <th className="py-4 text-xl">
                  Company
                </th>

                <th className="py-4 text-xl">
                  Status
                </th>

                <th className="py-4 text-xl">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.length >
0 ? (
                filteredLeads.map(
                  (
                    lead
                  ) => (
                    <tr
                      key={
                        lead._id
                      }
                      className="border-b border-slate-200"
                    >
                      <td className="py-6 text-lg text-white">
                        {
                          lead.name
                        }
                      </td>

                      <td className="py-6 text-lg text-white">
                        {
                          lead.email
                        }
                      </td>

                      <td className="py-6 text-lg text-white">
                        {
                          lead.company
                        }
                      </td>

                      <td className="py-6">
                        {editingLeadId ===
                        lead._id ? (
                          <select
                            value={
                              editStatus
                            }
                            onChange={(
                              e
                            ) =>
                              setEditStatus(
                                e
                                  .target
                                  .value
                              )
                            }
                            className="border rounded-lg px-3 py-2"
                          >
                            <option>
                              New
                            </option>
                            <option>
                              Pending
                            </option>
                            <option>
                              Converted
                            </option>
                          </select>
                        ) : (
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                              lead.status ===
                              "Converted"
                                ? "bg-green-100 text-green-700"
                                : lead.status ===
                                  "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {
                              lead.status
                            }
                          </span>
                        )}
                      </td>

                      <td className="py-6 flex gap-3">
                        {editingLeadId ===
                        lead._id ? (
                          <button
                            onClick={() =>
                              lead._id &&
                              handleUpdateLead(
                                lead._id
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingLeadId(
                                lead._id ||
                                  null
                              );

                              setEditStatus(
                                lead.status
                              );
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>
                        )}

                        <button
                          onClick={() =>
                            lead._id &&
                            handleDeleteLead(
                              lead._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-slate-300"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;