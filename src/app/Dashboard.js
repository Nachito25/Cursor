import React, { useState } from "react";

function generateApiKey() {
  // Example: nacho_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  const random = () =>
    ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  return `nacho_${random()}`;
}

const KEY_TYPES = [
  { label: "Development", value: "dev", info: "Rate limited to 100 requests/minute", enabled: true },
  { label: "Production", value: "prod", info: "Rate limited to 1,000 requests/minute", enabled: false },
];

export default function Dashboard({
  apiKeys,
  loading,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  // Modal and toast state/handlers
  showModal,
  setShowModal,
  showToast,
  setShowToast,
  setToastMsg,
  setToastColor,
}) {
  const [modalKeyName, setModalKeyName] = useState("");
  const [modalLimit, setModalLimit] = useState(false);
  const [modalLimitValue, setModalLimitValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [visibleKeys, setVisibleKeys] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Create
  const handleAdd = async () => {
    if (!modalKeyName.trim()) return;
    const apiKey = generateApiKey();
    const res = await createApiKey({ name: modalKeyName, value: apiKey });
    if (res.success) {
      setShowToast(true);
      setToastMsg("API Key created successfully");
      setToastColor("green");
      setTimeout(() => {
        setShowToast(false);
        setToastMsg("");
      }, 1500);
    }
    setShowModal(false);
    setModalKeyName("");
    setModalLimit(false);
    setModalLimitValue("");
  };

  // Delete
  const handleDelete = async (id) => {
    const res = await deleteApiKey(id);
    if (res.success) {
      setShowToast(true);
      setToastMsg("API Key deleted successfully");
      setToastColor("red");
      setTimeout(() => {
        setShowToast(false);
        setToastMsg("");
      }, 1500);
    }
  };

  // Edit
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  // Update
  const handleUpdate = async (id) => {
    const res = await updateApiKey(id, { name: editingName });
    if (res.success) {
      setShowToast(true);
      setToastMsg("API Key updated successfully");
      setToastColor("green");
      setTimeout(() => {
        setShowToast(false);
        setToastMsg("");
      }, 1500);
    }
    setEditingId(null);
    setEditingName("");
  };

  // Copy
  const handleCopy = async (id, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setShowToast(true);
      setToastMsg("Copied API Key to clipboard");
      setToastColor("green");
      setTimeout(() => {
        setCopiedId(null);
        setShowToast(false);
        setToastMsg("");
      }, 1500);
    } catch (err) {}
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] rounded-2xl p-8 mb-8 shadow flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="uppercase text-xs font-semibold text-gray-700 mb-1">Current Plan</div>
          <div className="text-3xl font-bold mb-2">Researcher</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>API Usage</span>
            <span className="bg-white/60 px-2 py-0.5 rounded text-xs">0 / 1,000 Credits</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-50">Manage Plan</button>
          <span className="flex items-center gap-1 text-green-600 font-medium"><span className="text-lg">●</span> Operational</span>
        </div>
      </div>
      {/* API Keys Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-bold text-black">API Keys</div>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
          onClick={() => setShowModal(true)}
          disabled={loading}
        >
          + Create
        </button>
      </div>
      {loading && <div className="text-center text-gray-400 mb-2">Loading...</div>}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Name</th>
            <th className="py-2">API Key</th>
            <th className="py-2">Usage</th>
            <th className="py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((k) => (
            <tr key={k.id} className="border-b last:border-0 text-black">
              <td className="py-2 font-medium">
                {editingId === k.id ? (
                  <input
                    className="border px-2 py-1 rounded text-sm text-black"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    disabled={loading}
                  />
                ) : (
                  k.name
                )}
              </td>
              <td className="py-2 font-mono">
                {visibleKeys[k.id] ? k.value : "*".repeat(k.value.length)}
              </td>
              <td className="py-2">{k.usage}</td>
              <td className="py-2 flex gap-2">
                {editingId === k.id ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={() => handleUpdate(k.id)}
                      disabled={loading}
                    >
                      💾
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                      onClick={() => setEditingId(null)}
                      disabled={loading}
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <button title={visibleKeys[k.id] ? "Hide" : "View"} className="hover:bg-gray-100 p-1 rounded" onClick={() => toggleKeyVisibility(k.id)}>
                      {visibleKeys[k.id] ? "🙈" : "👁️"}
                    </button>
                    <button
                      title="Copy"
                      className="hover:bg-gray-100 p-1 rounded"
                      onClick={() => handleCopy(k.id, k.value)}
                    >
                      {copiedId === k.id ? "✅" : "📋"}
                    </button>
                    <button title="Edit" className="hover:bg-gray-100 p-1 rounded" onClick={() => handleEdit(k.id, k.name)} disabled={loading}>✏️</button>
                    <button title="Delete" className="hover:bg-gray-100 p-1 rounded" onClick={() => handleDelete(k.id)} disabled={loading}>🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs text-gray-500 mt-4">
        The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
            <div className="text-xl font-bold mb-2 text-center">Create a new API key</div>
            <div className="text-sm text-gray-500 mb-6 text-center">Enter a name for the new API key.</div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1">Key Name <span className="text-gray-400">— A unique name to identify this key</span></label>
              <input
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Key Name"
                value={modalKeyName}
                onChange={e => setModalKeyName(e.target.value)}
                autoFocus
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2 text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={modalLimit}
                  onChange={e => setModalLimit(e.target.checked)}
                  disabled={loading}
                />
                Limit monthly usage*
              </label>
              <input
                className="border px-3 py-2 rounded w-full mt-2 disabled:bg-gray-100"
                placeholder="1000"
                type="number"
                min="1"
                disabled={!modalLimit || loading}
                value={modalLimitValue}
                onChange={e => setModalLimitValue(e.target.value)}
              />
              <div className="text-xs text-gray-400 mt-1">* If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</div>
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600"
              onClick={handleAdd}
              disabled={loading}
            >
              Create
            </button>
            <button
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-200"
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
} 