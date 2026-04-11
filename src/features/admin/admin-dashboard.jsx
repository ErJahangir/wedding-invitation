import { useState, useEffect } from "react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { supabase } from "@/core/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Save,
  CheckCircle,
  Image as ImageIcon,
  Music,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  Users,
  Settings,
  ArrowLeft,
} from "lucide-react";

export default function AdminDashboard() {
  const config = useConfig();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (config) {
      setFormData({
        uid: config.uid,
        title: config.title,
        description: config.description,
        groom_name: config.groomName,
        bride_name: config.brideName,
        parent_groom: config.parentGroom,
        parent_bride: config.parentBride,
        wedding_date: config.date,
        time: config.time,
        location: config.location,
        address: config.address,
        couple_image: config.coupleImage,
        groom_image: config.groomImage,
        bride_image: config.brideImage,
        og_image: config.ogImage,
        favicon: config.favicon,
        audio: config.audio || {
          src: "",
          title: "",
          autoplay: true,
          loop: true,
        },
        agenda: config.agenda || [],
        banks: config.banks || [],
      });
    }
  }, [config]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- AGENDA MANAGEMENT ---------------- */
  const updateAgendaItem = (index, field, value) => {
    const newAgenda = [...formData.agenda];
    newAgenda[index] = { ...newAgenda[index], [field]: value };
    setFormData((prev) => ({ ...prev, agenda: newAgenda }));
  };

  const addAgendaItem = () => {
    const newItem = {
      title: "New Event",
      date: "",
      start_time: "",
      location: "",
      address: "",
    };
    setFormData((prev) => ({ ...prev, agenda: [...prev.agenda, newItem] }));
  };

  const removeAgendaItem = (index) => {
    const newAgenda = formData.agenda.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, agenda: newAgenda }));
  };

  /* ---------------- BANK MANAGEMENT ---------------- */
  const updateBankItem = (index, field, value) => {
    const newBanks = [...formData.banks];
    newBanks[index] = { ...newBanks[index], [field]: value };
    setFormData((prev) => ({ ...prev, banks: newBanks }));
  };

  const addBankItem = () => {
    setFormData((prev) => ({
      ...prev,
      banks: [
        ...prev.banks,
        { bank: "", account_number: "", account_name: "" },
      ],
    }));
  };

  /* ---------------- FILE UPLOADS ---------------- */
  const uploadFile = async (file, fieldName, fileName) => {
    try {
      setLoading(true);
      setStatus(`Uploading ${fieldName}...`);

      const uniqueFileName = `${Date.now()}_${fileName}`;
      const { data, error } = await supabase.storage
        .from("weding-bucket")
        .upload(uniqueFileName, file, {
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("weding-bucket").getPublicUrl(data.path);

      setFormData((prev) => {
        const updated =
          fieldName === "audio_src"
            ? { ...prev, audio: { ...prev.audio, src: publicUrl } }
            : { ...prev, [fieldName]: publicUrl };

        // Instant DB Sync for media
        supabase
          .from("invitations")
          .update(updated)
          .eq("uid", updated.uid)
          .then(() => setStatus("Media uploaded & synced to Cloud!"));

        return updated;
      });
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("Upload failed: " + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const queryClient = useQueryClient();

  const handleSave = async () => {
    try {
      setLoading(true);
      setStatus("Syncing with Supabase...");

      const { error } = await supabase
        .from("invitations")
        .upsert(formData, { onConflict: "uid" });

      if (error) throw error;

      // Refresh global data
      await queryClient.invalidateQueries({ queryKey: ["invitation"] });

      setStatus("All settings synchronized!");
    } catch (error) {
      setStatus("Save failed: " + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  if (!formData)
    return (
      <div className="p-20 text-center font-serif text-emerald-900">
        Initialising Sacred Records...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fcfdfc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div
              className="flex items-center gap-2 text-emerald-600 mb-2 cursor-pointer hover:text-emerald-800 transition-colors"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Back to Invitation
              </span>
            </div>
            <h1 className="text-4xl font-serif text-emerald-950">
              Grand Administration
            </h1>
            <p className="text-emerald-700/60">
              Configure every detail of your sacred union.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-emerald-950 text-gold-400 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gold-400 border-t-transparent animate-spin rounded-full" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Publish to Cloud
          </button>
        </div>

        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 p-4 bg-emerald-900 text-gold-400 rounded-2xl flex items-center gap-3 shadow-2xl border border-gold-500/20"
          >
            <CheckCircle className="w-5 h-5 text-gold-400" />
            <span className="font-bold tracking-tight">{status}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primary Details */}
            <section className="glass-card p-8 rounded-[2.5rem] border-emerald-100/50 space-y-8">
              <div className="flex items-center gap-3 text-emerald-900 border-b border-emerald-50 pb-4">
                <Settings className="w-6 h-6" />
                <h2 className="text-2xl font-serif">General Configuration</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest ml-1">
                    Event Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest ml-1">
                    Formal Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest ml-1">
                    Groom Name
                  </label>
                  <input
                    name="groom_name"
                    value={formData.groom_name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest ml-1">
                    Bride Name
                  </label>
                  <input
                    name="bride_name"
                    value={formData.bride_name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest ml-1">
                    Groom's Parents
                  </label>
                  <input
                    name="parent_groom"
                    value={formData.parent_groom}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-900/50 uppercase tracking-widest ml-1">
                    Bride's Parents
                  </label>
                  <input
                    name="parent_bride"
                    value={formData.parent_bride}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 focus:bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Event Manager */}
            <section className="glass-card p-8 rounded-[2.5rem] border-emerald-100/50 space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
                <div className="flex items-center gap-3 text-emerald-900">
                  <Calendar className="w-6 h-6" />
                  <h2 className="text-2xl font-serif">Ceremony Manager</h2>
                </div>
                <button
                  onClick={addAgendaItem}
                  className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-200 transition-all font-bold text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Event
                </button>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {formData.agenda.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-6 bg-emerald-50/40 rounded-[2rem] border border-emerald-100 relative group"
                    >
                      <button
                        onClick={() => removeAgendaItem(idx)}
                        className="absolute top-4 right-4 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                          <input
                            placeholder="Event Title (e.g., Tilak)"
                            value={event.title}
                            onChange={(e) =>
                              updateAgendaItem(idx, "title", e.target.value)
                            }
                            className="w-full bg-transparent border-b border-emerald-200 p-2 font-serif text-xl outline-none focus:border-emerald-600 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-tighter ml-1">
                            Date
                          </label>
                          <input
                            type="date"
                            value={event.date}
                            onChange={(e) =>
                              updateAgendaItem(idx, "date", e.target.value)
                            }
                            className="w-full bg-white p-3 rounded-xl border border-emerald-50 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-tighter ml-1">
                            Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300" />
                            <input
                              placeholder="06:00 PM"
                              value={event.start_time}
                              onChange={(e) =>
                                updateAgendaItem(
                                  idx,
                                  "start_time",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white pl-10 pr-3 py-3 rounded-xl border border-emerald-50 text-sm"
                            />
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <label className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-tighter ml-1">
                            Venue Details
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-emerald-300" />
                            <textarea
                              placeholder="Location Name & Address"
                              value={event.location}
                              onChange={(e) =>
                                updateAgendaItem(
                                  idx,
                                  "location",
                                  e.target.value,
                                )
                              }
                              rows="2"
                              className="w-full bg-white pl-10 pr-3 py-3 rounded-xl border border-emerald-50 text-sm outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* Side Configuration */}
          <div className="space-y-8">
            {/* Visual Assets */}
            <section className="glass-card p-8 rounded-[2.5rem] border-emerald-100/50 space-y-6">
              <div className="flex items-center gap-3 text-emerald-900 border-b border-emerald-50 pb-4">
                <ImageIcon className="w-6 h-6" />
                <h2 className="text-xl font-serif">Visual Assets</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: "couple_image",
                    label: "Main Couple Card",
                    file: "couple.png",
                  },
                  {
                    id: "groom_image",
                    label: "Groom Photo",
                    file: "groom.png",
                  },
                  {
                    id: "bride_image",
                    label: "Bride Photo",
                    file: "bride.png",
                  },
                  {
                    id: "og_image",
                    label: "WhatsApp Preview (OG)",
                    file: "og.jpg",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-emerald-50 rounded-2xl flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-sm font-bold text-emerald-950">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-emerald-600/60 truncate max-w-[120px]">
                        {formData[item.id]}
                      </p>
                    </div>
                    <label
                      htmlFor={item.id}
                      className="cursor-pointer bg-gold-500/10 text-gold-600 p-2 rounded-xl hover:bg-gold-500 hover:text-white transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        id={item.id}
                        className="hidden"
                        onChange={(e) =>
                          uploadFile(e.target.files[0], item.id, item.file)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* Audio Content */}
            <section className="glass-card p-8 rounded-[2.5rem] border-emerald-100/50 space-y-6">
              <div className="flex items-center gap-3 text-emerald-900 border-b border-emerald-50 pb-4">
                <Music className="w-6 h-6" />
                <h2 className="text-xl font-serif">Music Setting</h2>
              </div>
              <div className="p-4 bg-emerald-950 rounded-2xl text-gold-400">
                <p className="text-xs uppercase tracking-widest font-bold mb-2">
                  Active Track
                </p>
                <p className="text-sm truncate opacity-70 mb-4">
                  {formData.audio?.src || "No Audio Uploaded"}
                </p>
                <label className="w-full flex items-center justify-center gap-2 bg-gold-500 text-emerald-950 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-gold-400 transition-all">
                  <Upload className="w-3 h-3" /> Replace Audio
                  <input
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={(e) =>
                      uploadFile(
                        e.target.files[0],
                        "audio_src",
                        "background.mp3",
                      )
                    }
                  />
                </label>
              </div>
            </section>

            {/* Gifts & Banks */}
            <section className="glass-card p-8 rounded-[2.5rem] border-emerald-100/50 space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
                <div className="flex items-center gap-3 text-emerald-900">
                  <CreditCard className="w-6 h-6" />
                  <h2 className="text-xl font-serif">Gifts Support</h2>
                </div>
                <button
                  onClick={addBankItem}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {formData.banks.map((bank, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-emerald-100 rounded-2xl space-y-3"
                  >
                    <input
                      placeholder="Bank Name"
                      value={bank.bank}
                      onChange={(e) =>
                        updateBankItem(idx, "bank", e.target.value)
                      }
                      className="w-full text-sm font-bold border-b border-emerald-50 outline-none p-1"
                    />
                    <input
                      placeholder="Account Number"
                      value={bank.account_number}
                      onChange={(e) =>
                        updateBankItem(idx, "account_number", e.target.value)
                      }
                      className="w-full text-xs outline-none p-1"
                    />
                    <input
                      placeholder="Account Name"
                      value={bank.account_name}
                      onChange={(e) =>
                        updateBankItem(idx, "account_name", e.target.value)
                      }
                      className="w-full text-xs text-emerald-600 outline-none p-1"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
