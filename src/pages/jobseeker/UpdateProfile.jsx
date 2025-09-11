import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

export const UpdateProfile = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/profile", {
          withCredentials: true,
        });
        const data = res.data;
        setFormData({
          fullName: data.fullName || "",
          phone: data.phone || "",
          address: data.address || "",
          education: data.education || "",
          exp: data.exp || "",
          skills: data.skills || [],
          projects: data.projects || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !formData) return <div className="p-6 text-center">Loading...</div>;

  // Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (i, value) => {
    const updated = [...formData.skills];
    updated[i] = value;
    setFormData({ ...formData, skills: updated });
  };

  const addSkill = () => setFormData({ ...formData, skills: [...formData.skills, ""] });
  const removeSkill = (i) =>
    setFormData({ ...formData, skills: formData.skills.filter((_, idx) => idx !== i) });

  const handleProjectChange = (i, field, value) => {
    const updated = [...formData.projects];
    updated[i][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const addProject = () =>
    setFormData({
      ...formData,
      projects: [...formData.projects, { projectName: "", description: "" }],
    });

  const removeProject = (i) =>
    setFormData({ ...formData, projects: formData.projects.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(
        "http://localhost:8080/users/profile",
        formData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/job-profile"); // go back to profile view after save
      } else {
        alert("Failed to save profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
   <div className="relative w-full h-full overflow-auto">
    <motion.img src="/images/profile.png"
    className="fixed h-full w-full object-cover blur-sm brightness-50"
    initial={{scale:1.3}}
    animate={{scale:1}}
    transition={{duration:10, ease:"easeInOut", repeat:Infinity, repeatType:"reverse"}}
    alt="" />
     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100 ">
      <div className="z-10  bg-white/25 p-6 rounded-xl shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh] scrollbar-hide mt-14">
        <h2 className="text-2xl font-bold text-emerald-600">Update Profile</h2>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded bg-transparent/15"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded bg-transparent"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded bg-transparent"
        />
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Education"
          className="w-full p-2 border rounded bg-transparent"
        />
        <input
          type="text"
          name="exp"
          value={formData.exp}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full p-2 border rounded bg-transparent"
        />

        {/* Skills */}
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          {formData.skills.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={s}
                onChange={(e) => handleSkillChange(i, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="px-2 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="px-3 py-1 bg-emerald-500 text-white rounded"
          >
            + Add Skill
          </button>
        </div>

        {/* Projects */}
        <div>
          <label className="block font-semibold mb-1">Projects</label>
          {formData.projects.map((p, i) => (
            <div key={i} className="border p-3 rounded mb-2 space-y-2 bg-gray-50">
              <input
                type="text"
                value={p.projectName}
                onChange={(e) => handleProjectChange(i, "projectName", e.target.value)}
                placeholder="Project Name"
                className="w-full p-2 border rounded"
              />
              <textarea
                value={p.description}
                onChange={(e) => handleProjectChange(i, "description", e.target.value)}
                placeholder="Project Description"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeProject(i)}
                className="px-2 bg-red-500 text-white rounded"
              >
                ✕ Remove Project
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="px-3 py-1 bg-emerald-500 text-white rounded"
          >
            + Add Project
          </button>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/job-profile")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
   </div>
  );
};
