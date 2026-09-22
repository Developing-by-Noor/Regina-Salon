
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
  query,
  updateDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { fireDB, auth } from "../firebase/FirebaseConfig";

import {
  CalendarDays,
  Check,
  Clock,
  Mail,
  Phone,
  Search,
  Trash2,
  X,
  Scissors,
  Menu,
  LayoutDashboard,
  Tag,
  Plus,
  Pencil,
  LogOut,
} from "lucide-react";

const ADMIN_EMAIL = "admin@gmail.com";

const AdminDashboard = () => {
  // =====================================================
  // AUTH STATES
  // =====================================================

  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [authMode, setAuthMode] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] =
    useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // =====================================================
  // DASHBOARD STATES
  // =====================================================

  const [appointments, setAppointments] = useState([]);
  const [deals, setDeals] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [dealsLoading, setDealsLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [showDealForm, setShowDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const [dealForm, setDealForm] = useState({
    title: "",
    category: "",
    description: "",
    originalPrice: "",
    dealPrice: "",
  });

  const [error, setError] = useState("");

  // =====================================================
  // AUTH STATE LISTENER
  // =====================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAdminUser(null);
        setAuthLoading(false);
        return;
      }

      const email = user.email?.trim().toLowerCase();
      const allowedEmail = ADMIN_EMAIL.trim().toLowerCase();

      if (email === allowedEmail) {
        setAdminUser(user);
        setLoginError("");
      } else {
        await signOut(auth);
        setAdminUser(null);
        setLoginError(
          "This account is not authorized to access the admin dashboard."
        );
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // =====================================================
  // ADMIN LOGIN
  // =====================================================

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    setLoginError("");

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError("Please enter your email and password.");
      return;
    }

    try {
      setLoginLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        loginEmail.trim(),
        loginPassword
      );

      const loggedInEmail = result.user.email
        ?.trim()
        .toLowerCase();

      if (loggedInEmail !== ADMIN_EMAIL.trim().toLowerCase()) {
        await signOut(auth);

        setAdminUser(null);
        setLoginError(
          "This account is not authorized to access the admin dashboard."
        );

        return;
      }

      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");
    } catch (err) {
      console.error("Admin login error:", err);

      if (err.code === "auth/invalid-credential") {
        setLoginError("Incorrect email or password.");
      } else if (err.code === "auth/user-not-found") {
        setLoginError("No admin account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setLoginError("Incorrect password.");
      } else if (err.code === "auth/too-many-requests") {
        setLoginError(
          "Too many login attempts. Please try again later."
        );
      } else if (err.code === "auth/invalid-email") {
        setLoginError("Please enter a valid email address.");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // =====================================================
  // ADMIN SIGNUP
  // =====================================================

  const handleAdminSignup = async (e) => {
    e.preventDefault();

    setSignupError("");

    if (!signupEmail.trim() || !signupPassword) {
      setSignupError("Please enter email and password.");
      return;
    }

    if (
      signupEmail.trim().toLowerCase() !==
      ADMIN_EMAIL.trim().toLowerCase()
    ) {
      setSignupError(
        "Please use the authorized admin email."
      );
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    try {
      setSignupLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        signupEmail.trim(),
        signupPassword
      );

      await signOut(auth);

      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirmPassword("");

      setSignupError("");
      setLoginError(
        "Account created successfully. Please login."
      );

      setAuthMode("login");
    } catch (err) {
      console.error("Admin signup error:", err);

      if (err.code === "auth/email-already-in-use") {
        setSignupError(
          "This admin account already exists. Please login."
        );

        setAuthMode("login");
      } else if (err.code === "auth/invalid-email") {
        setSignupError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setSignupError(
          "Password must be at least 6 characters."
        );
      } else {
        setSignupError("Signup failed. Please try again.");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  // =====================================================
  // ADMIN LOGOUT
  // =====================================================

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);

      setAdminUser(null);
      setActivePage("dashboard");
      setSidebarOpen(false);
      setAppointments([]);
      setDeals([]);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Logout nahi ho saka.");
    }
  };

  // =====================================================
  // FETCH APPOINTMENTS
  // =====================================================

  useEffect(() => {
    if (!adminUser) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const appointmentsRef = collection(
      fireDB,
      "appointments"
    );

    const unsubscribe = onSnapshot(
      appointmentsRef,
      (snapshot) => {
        const appointmentData = snapshot.docs
          .map((appointment) => ({
            id: appointment.id,
            ...appointment.data(),
          }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;

            return bTime - aTime;
          });

        setAppointments(appointmentData);
        setLoading(false);
      },
      (err) => {
        console.error("Appointments error:", err);
        setError("Appointments load nahi ho sakin.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [adminUser]);

  // =====================================================
  // FETCH DEALS
  // =====================================================

  useEffect(() => {
    if (!adminUser) {
      setDeals([]);
      setDealsLoading(false);
      return;
    }

    setDealsLoading(true);

    const dealsRef = collection(fireDB, "deals");

    const unsubscribe = onSnapshot(
      query(dealsRef),
      (snapshot) => {
        const dealData = snapshot.docs.map((deal) => ({
          id: deal.id,
          ...deal.data(),
        }));

        dealData.sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() || 0;
          const bTime = b.createdAt?.toMillis?.() || 0;

          return bTime - aTime;
        });

        setDeals(dealData);
        setDealsLoading(false);
      },
      async (err) => {
        console.error("Deals realtime error:", err);

        try {
          const snapshot = await getDocs(dealsRef);

          const dealData = snapshot.docs.map((deal) => ({
            id: deal.id,
            ...deal.data(),
          }));

          dealData.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;

            return bTime - aTime;
          });

          setDeals(dealData);
          setError("");
        } catch (fallbackError) {
          console.error(
            "Deals fallback error:",
            fallbackError
          );

          setError("Deals load nahi ho sakin.");
        } finally {
          setDealsLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [adminUser]);

  // =====================================================
  // UPDATE APPOINTMENT STATUS
  // =====================================================

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await updateDoc(
        doc(fireDB, "appointments", id),
        {
          status,
        }
      );
    } catch (err) {
      console.error(err);
      setError("Appointment update nahi ho saki.");
    } finally {
      setUpdatingId("");
    }
  };

  // =====================================================
  // DELETE APPOINTMENT
  // =====================================================

  const deleteAppointment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this appointment?"
    );

    if (!confirmed) return;

    try {
      setUpdatingId(id);

      await deleteDoc(
        doc(fireDB, "appointments", id)
      );
    } catch (err) {
      console.error(err);
      setError("Appointment delete nahi ho saki.");
    } finally {
      setUpdatingId("");
    }
  };

  // =====================================================
  // DEAL FORM CHANGE
  // =====================================================

  const handleDealChange = (e) => {
    const { name, value } = e.target;

    setDealForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD DEAL
  // =====================================================

  const handleAddDeal = async (e) => {
    e.preventDefault();

    if (
      !dealForm.title.trim() ||
      !dealForm.category.trim() ||
      !dealForm.dealPrice
    ) {
      setError(
        "Please title, category aur deal price enter karein."
      );
      return;
    }

    try {
      setError("");

      const dealData = {
        title: dealForm.title.trim(),
        category: dealForm.category.trim(),
        description: dealForm.description.trim(),
        originalPrice: dealForm.originalPrice,
        dealPrice: dealForm.dealPrice,
        createdAt: serverTimestamp(),
      };

      await addDoc(
        collection(fireDB, "deals"),
        dealData
      );

      setDealForm({
        title: "",
        category: "",
        description: "",
        originalPrice: "",
        dealPrice: "",
      });

      setShowDealForm(false);
      setEditingDeal(null);
    } catch (err) {
      console.error("Add deal error:", err);
      setError("Deal add nahi ho saki.");
    }
  };

  // =====================================================
  // EDIT DEAL
  // =====================================================

  const startEditDeal = (deal) => {
    setEditingDeal(deal);

    setDealForm({
      title: deal.title || "",
      category: deal.category || "",
      description: deal.description || "",
      originalPrice: deal.originalPrice || "",
      dealPrice: deal.dealPrice || "",
    });

    setShowDealForm(true);
  };

  // =====================================================
  // UPDATE DEAL
  // =====================================================

  const handleUpdateDeal = async (e) => {
    e.preventDefault();

    if (!editingDeal) return;

    if (
      !dealForm.title.trim() ||
      !dealForm.category.trim() ||
      !dealForm.dealPrice
    ) {
      setError(
        "Please title, category aur deal price enter karein."
      );
      return;
    }

    try {
      setError("");

      await updateDoc(
        doc(fireDB, "deals", editingDeal.id),
        {
          title: dealForm.title.trim(),
          category: dealForm.category.trim(),
          description: dealForm.description.trim(),
          originalPrice: dealForm.originalPrice,
          dealPrice: dealForm.dealPrice,
        }
      );

      setDealForm({
        title: "",
        category: "",
        description: "",
        originalPrice: "",
        dealPrice: "",
      });

      setEditingDeal(null);
      setShowDealForm(false);
    } catch (err) {
      console.error("Update deal error:", err);
      setError("Deal update nahi ho saki.");
    }
  };

  // =====================================================
  // DELETE DEAL
  // =====================================================

  const deleteDeal = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this deal?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(fireDB, "deals", id)
      );
    } catch (err) {
      console.error(err);
      setError("Deal delete nahi ho saki.");
    }
  };

  // =====================================================
  // CLOSE DEAL FORM
  // =====================================================

  const closeDealForm = () => {
    setShowDealForm(false);
    setEditingDeal(null);

    setDealForm({
      title: "",
      category: "",
      description: "",
      originalPrice: "",
      dealPrice: "",
    });
  };

  // =====================================================
  // FILTER APPOINTMENTS
  // =====================================================

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        appointment.name
          ?.toLowerCase()
          .includes(searchText) ||
        appointment.phone
          ?.toLowerCase()
          .includes(searchText) ||
        appointment.email
          ?.toLowerCase()
          .includes(searchText) ||
        appointment.service
          ?.toLowerCase()
          .includes(searchText) ||
        appointment.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesFilter =
        activeFilter === "All" ||
        appointment.status?.toLowerCase() ===
          activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [appointments, search, activeFilter]);

  // =====================================================
  // COUNTS
  // =====================================================

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedAppointments = appointments.filter(
    (item) => item.status === "Approved"
  ).length;

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Not selected";

    const dateObject = new Date(
      `${date}T00:00:00`
    );

    if (Number.isNaN(dateObject.getTime())) {
      return date;
    }

    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS
  // =====================================================

  const statusBadge = (status) => {
    if (status === "Approved") {
      return "border-green-200 bg-green-50 text-green-700";
    }

    if (status === "Rejected") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    return "border-yellow-200 bg-yellow-50 text-yellow-700";
  };

  // =====================================================
  // SIDEBAR NAVIGATION
  // =====================================================

  const navigation = [
    {
      name: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Appointments",
      value: "appointments",
      icon: CalendarDays,
    },
    {
      name: "Deals",
      value: "deals",
      icon: Tag,
    },
  ];

  // =====================================================
  // AUTH LOADING
  // =====================================================

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#8b0017]" />

          <p className="text-sm text-gray-500">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ADMIN LOGIN / SIGNUP
  // =====================================================

  if (!adminUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5 py-10">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-[0.16em] text-[#96031b] sm:text-4xl">
              REGINA
            </h1>

            <p className="mt-2 text-[9px] uppercase tracking-[0.4em] text-gray-600">
              SALON ADMIN
            </p>

            <h2 className="mt-7 text-2xl font-light text-black">
              {authMode === "login"
                ? "Admin Login"
                : "Create Admin Account"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {authMode === "login"
                ? "Sign in to access your dashboard."
                : "Create your admin account first."}
            </p>
          </div>

          {/* AUTH CARD */}
          <div className="border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            {authMode === "login" ? (
              <form
                onSubmit={handleAdminLogin}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) =>
                      setLoginEmail(e.target.value)
                    }
                    placeholder="Admin email"
                    autoComplete="email"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#780014]"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Password
                  </label>

                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) =>
                      setLoginPassword(e.target.value)
                    }
                    placeholder="Admin password"
                    autoComplete="current-password"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#780014]"
                  />
                </div>

                {/* SUCCESS / ERROR */}
                {loginError && (
                  <div
                    className={`border px-4 py-3 text-sm leading-5 ${
                      loginError.includes(
                        "successfully"
                      )
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {loginError}
                  </div>
                )}

                {/* LOGIN */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#92071f] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loginLoading
                    ? "Signing In..."
                    : "Sign In"}
                </button>

                {/* SIGNUP */}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setLoginError("");
                  }}
                  className="w-full text-center text-xs font-semibold text-[#780014] transition hover:underline"
                >
                  First time? Create Admin Account
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleAdminSignup}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Admin Email
                  </label>

                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) =>
                      setSignupEmail(e.target.value)
                    }
                    placeholder="admin@gmail.com"
                    autoComplete="email"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#780014]"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Password
                  </label>

                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) =>
                      setSignupPassword(e.target.value)
                    }
                    placeholder="Create password"
                    autoComplete="new-password"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#780014]"
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) =>
                      setSignupConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#780014]"
                  />
                </div>

                {/* SIGNUP ERROR */}
                {signupError && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                    {signupError}
                  </div>
                )}

                {/* SIGNUP BUTTON */}
                <button
                  type="submit"
                  disabled={signupLoading}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#92071f] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {signupLoading
                    ? "Creating Account..."
                    : "Create Admin Account"}
                </button>

                {/* BACK TO LOGIN */}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setSignupError("");
                  }}
                  className="w-full text-center text-xs font-semibold text-gray-500 transition hover:text-[#780014]"
                >
                  ← Back to Login
                </button>
              </form>
            )}

            {/* BACK TO WEBSITE */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-5 w-full text-center text-xs font-medium text-gray-500 transition hover:text-[#780014]"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-white text-black">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* LOGO */}
        <div className="flex h-[88px] items-center justify-between border-b border-gray-100 px-7">

          <div>
            <h1 className="text-2xl font-semibold tracking-[0.16em] text-[#92021a]">
              REGINA
            </h1>

            <p className="mt-1 text-[8px] uppercase tracking-[0.38em] text-gray-400">
              SALON ADMIN
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 px-4 py-7">

          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
            Management
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.value}
                  onClick={() => {
                    setActivePage(item.value);
                    setSidebarOpen(false);
                  }}
                 className={`group flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium transition ${
  activePage === item.value
    ? "bg-[#f1f1f1] text-[#780014]"
    : "text-gray-600 hover:bg-gray-50 hover:text-[#780014]"
}`}
                 
                >
                 
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR BOTTOM */}
        <div className="border-t border-gray-100 p-5">

          <button
            onClick={handleAdminLogout}
            className="flex w-full items-center gap-3 px-3 py-3 text-sm text-gray-600 transition hover:text-[#780014]"
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="mt-1 flex w-full items-center gap-3 px-3 py-3 text-sm text-gray-400 transition hover:text-[#780014]"
          >
            <ArrowBackIcon />

            <span>Back to Website</span>
          </button>

        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="lg:ml-[270px]">

        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8 lg:px-10">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-gray-200 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Regina Salon
              </p>

              <h2 className="mt-0.5 text-sm font-semibold">
                {activePage === "dashboard"
                  ? "Dashboard"
                  : activePage === "appointments"
                  ? "Appointments"
                  : "Deals Management"}
              </h2>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-black">
              {adminUser.email}
            </p>

            <p className="text-[11px] text-gray-400">
              Admin Panel
            </p>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="px-5 py-7 sm:px-8 lg:px-10 lg:py-10">

          {/* ERROR */}
          {error && (
            <div className="mb-6 flex items-center justify-between border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">

              <span>{error}</span>

              <button onClick={() => setError("")}>
                <X size={17} />
              </button>

            </div>
          )}

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {activePage === "dashboard" && (
            <>

              <div className="mb-8">

                <div className="mb-4 flex items-center gap-3">

                  <span className="h-px w-10 bg-[#050505]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1a1617]">
                    Overview
                  </span>

                </div>

                <h1 className="text-3xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
                  Welcome to Regina
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                  Manage appointments and salon deals from your
                  dashboard.
                </p>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

                <div className="border border-gray-200 bg-white p-5 sm:p-7">

                 
                  <p className="text-3xl font-light">
                    {totalAppointments}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Total Appointments
                  </p>

                </div>

                <div className="border border-gray-200 bg-white p-5 sm:p-7">

                 

                  <p className="text-3xl font-light">
                    {pendingAppointments}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Pending Requests
                  </p>

                </div>

                <div className="border border-gray-200 bg-white p-5 sm:p-7">

                  

                  <p className="text-3xl font-light">
                    {approvedAppointments}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Approved
                  </p>

                </div>

                <div className="border border-gray-200 bg-white p-5 sm:p-7">

                  

                  <p className="text-3xl font-light">
                    {deals.length}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Active Deals
                  </p>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

                <button
                  onClick={() =>
                    setActivePage("appointments")
                  }
                  className="group border border-gray-200 bg-white p-6 text-left transition duration-300 hover:border-[#780014]"
                >

               

                  <h3 className="text-lg font-semibold">
                    Manage Appointments
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    View, approve, reject and manage customer
                    appointment requests.
                  </p>

                  <span className="mt-5 inline-flex text-xs font-semibold text-[#780014]">
                    View Appointments →
                  </span>

                </button>

                <button
                  onClick={() =>
                    setActivePage("deals")
                  }
                  className="group border border-gray-200 bg-white p-6 text-left transition duration-300 hover:border-[#780014]"
                >

                 

                  <h3 className="text-lg font-semibold">
                    Manage Salon Deals
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Add, edit and remove current salon deals and
                    special offers.
                  </p>

                  <span className="mt-5 inline-flex text-xs font-semibold text-[#780014]">
                    Manage Deals →
                  </span>

                </button>

              </div>

              {/* CURRENT SALON DEALS */}

              <div className="mt-8">

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                  <div>

                    <div className="mb-3 flex items-center gap-3">

                     
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#000000]">
                        Offers
                      </span>

                    </div>

                    <h2 className="text-2xl font-medium sm:text-3xl">
                      Current Salon Deals
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Your currently added salon offers.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setActivePage("deals")
                    }
                    className="w-fit text-xs font-semibold text-[#780014] hover:underline"
                  >
                    Manage All Deals →
                  </button>

                </div>

                {dealsLoading ? (

                  <div className="border border-gray-200 bg-white py-16 text-center">

                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#780014]" />

                    <p className="text-sm text-gray-500">
                      Loading deals...
                    </p>

                  </div>

                ) : deals.length === 0 ? (

                  <div className="border border-dashed border-gray-200 bg-white py-16 text-center">

                    

                    <h3 className="text-lg font-light">
                      No Deals Added
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Your salon deals will appear here after you add them.
                    </p>

                    <button
                      onClick={() => {
                        setActivePage("deals");
                        setShowDealForm(true);
                      }}
                      className="mt-5 inline-flex items-center gap-2 bg-[#96041d] px-5 py-3 text-xs font-semibold text-white transition"
                    >
                      <Plus size={16} />
                      Add New Deal
                    </button>

                  </div>

                ) : (

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {deals.slice(0, 6).map((deal) => (

                      <div
                        key={deal.id}
                        className="group border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#91041b] hover:shadow-[0_15px_40px_rgba(120,0,20,0.07)]"
                      >

                        <div className="mb-5 flex items-start justify-between">

                          <div className="flex h-11 w-11 items-center justify-center bg-[#780014]/10 text-[#99031c]">
                            <Tag size={20} />
                          </div>

                          {deal.category && (
                            <span className="bg-[#780014] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
                              {deal.category}
                            </span>
                          )}

                        </div>

                        <h3 className="text-xl font-semibold text-black">
                          {deal.title}
                        </h3>

                        <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-500">
                          {deal.description ||
                            "Special Regina Salon offer."}
                        </p>

                        <div className="mt-5 flex items-baseline gap-3">

                          {deal.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              Rs.{" "}
                              {Number(
                                deal.originalPrice
                              ).toLocaleString()}
                            </span>
                          )}

                          <span className="text-2xl font-semibold text-[#9c001a]">
                            Rs.{" "}
                            {Number(
                              deal.dealPrice || 0
                            ).toLocaleString()}
                          </span>

                        </div>

                        <button
                          onClick={() => {
                            setActivePage("deals");
                            startEditDeal(deal);
                          }}
                          className="mt-5 inline-flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs font-semibold transition hover:border-[#99011a] hover:text-[#a1011b]"
                        >
                          <Pencil size={14} />
                          Edit Deal
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </>
          )}

          {/* =================================================
              APPOINTMENTS PAGE
          ================================================= */}

          {activePage === "appointments" && (
            <>

              <div className="mb-7">

                <div className="mb-4 flex items-center gap-3">

                  
                </div>

                <h1 className="text-3xl font-medium sm:text-4xl">
                  Appointments
                </h1>

              </div>

              {/* SEARCH + FILTER */}

              <div className="mb-6 border border-gray-200 bg-white p-4">

                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                  <div className="relative w-full xl:max-w-md">

                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search appointments..."
                      className="w-full border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#221d1d]"
                    />

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {[
                      "All",
                      "Pending",
                      "Approved",
                      "Rejected",
                    ].map((filter) => (

                      <button
                        key={filter}
                        onClick={() =>
                          setActiveFilter(filter)
                        }
                        className={`px-4 py-2.5 text-xs font-semibold transition ${
                          activeFilter === filter
                            ? "bg-[#96041d] text-white"
                            : "border border-gray-200 text-gray-600 hover:border-[#96041d]"
                        }`}
                      >
                        {filter}
                      </button>

                    ))}

                  </div>

                </div>

              </div>

              {/* APPOINTMENT LIST */}

              {loading ? (

                <div className="border border-gray-200 bg-white py-20 text-center">

                  <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#a5041f]" />

                  <p className="text-sm text-gray-500">
                    Loading appointments...
                  </p>

                </div>

              ) : filteredAppointments.length === 0 ? (

                <div className="border border-gray-200 bg-white py-20 text-center">

                

                  <h3 className="text-xl font-light">
                    No appointments found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    No appointments match your current filter.
                  </p>

                </div>

              ) : (

                <div className="space-y-5">

                  {filteredAppointments.map(
                    (appointment) => (

                      <div
                        key={appointment.id}
                        className="border border-gray-200 bg-white"
                      >

                        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

                          <div className="flex items-start gap-4">

                        
                            <div>

                              <h3 className="text-lg font-semibold">
                                {appointment.name ||
                                  "No Name"}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500">
                                {appointment.category ||
                                  "No Category"}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`w-fit border px-3 py-1.5 text-xs font-semibold ${statusBadge(
                              appointment.status
                            )}`}
                          >
                            {appointment.status ||
                              "Pending"}
                          </span>

                        </div>

                        <div className="p-5 sm:p-6">

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                            {/* CUSTOMER */}

                            <div>

                              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Customer
                              </p>

                              <div className="space-y-2">

                                <div className="flex gap-2 text-sm text-gray-700">

                                  <Phone
                                    size={15}
                                    className="mt-0.5 text-[#252021]"
                                  />

                                  <span>
                                    {appointment.phone ||
                                      "Not provided"}
                                  </span>

                                </div>

                                {appointment.email && (
                                  <div className="flex gap-2 text-sm text-gray-700">

                                    <Mail
                                      size={15}
                                      className="mt-0.5 shrink-0 text-[#2b2627]"
                                    />

                                    <span className="break-all">
                                      {appointment.email}
                                    </span>

                                  </div>
                                )}

                              </div>

                            </div>

                            {/* SERVICE */}

                            <div>

                              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Service
                              </p>

                              <p className="text-sm font-semibold">
                                {appointment.service ||
                                  "Not selected"}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {appointment.category}
                              </p>

                            </div>

                            {/* APPOINTMENT */}

                            <div>

                              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Appointment
                              </p>

                              <div className="flex items-center gap-2 text-sm">

                                <CalendarDays
                                  size={16}
                                  className="text-[#332f30]"
                                />

                                {formatDate(
                                  appointment.date
                                )}

                              </div>

                              <div className="mt-2 flex items-center gap-2 text-sm">

                                <Clock
                                  size={16}
                                  className="text-[#252525]"
                                />

                                {appointment.time ||
                                  "Not selected"}

                              </div>

                            </div>

                            {/* MESSAGE */}

                            <div>

                              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Message
                              </p>

                              <p className="text-sm leading-6 text-gray-500">
                                {appointment.message ||
                                  "No additional message."}
                              </p>

                            </div>

                          </div>

                          {/* ACTION BUTTONS */}

                          <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:flex-wrap">

                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "Approved"
                                )
                              }
                              disabled={
                                updatingId ===
                                appointment.id
                              }
                              className="inline-flex items-center justify-center gap-2 bg-green-600 px-5 py-3 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                            >
                              <Check size={16} />
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  appointment.id,
                                  "Rejected"
                                )
                              }
                              disabled={
                                updatingId ===
                                appointment.id
                              }
                              className="inline-flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 text-xs font-semibold hover:border-red-500 hover:text-red-600 disabled:opacity-50"
                            >
                              <X size={16} />
                              Reject
                            </button>

                            {appointment.status !==
                              "Pending" && (

                              <button
                                onClick={() =>
                                  updateStatus(
                                    appointment.id,
                                    "Pending"
                                  )
                                }
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 text-xs font-semibold text-gray-600 hover:border-[#780014] hover:text-[#780014]"
                              >
                                <Clock size={16} />
                                Mark Pending
                              </button>

                            )}

                            <button
                              onClick={() =>
                                deleteAppointment(
                                  appointment.id
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 border border-red-200 px-5 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 sm:ml-auto"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </>
          )}

          {/* =================================================
              DEALS PAGE
          ================================================= */}

          {activePage === "deals" && (
            <>

              <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>

                  <div className="mb-4 flex items-center gap-3">

                  

                  </div>

                  <h1 className="text-3xl font-medium sm:text-4xl">
                    Salon Deals
                  </h1>

                  <p className="mt-3 text-sm text-gray-500">
                    Add and manage your salon special offers.
                  </p>

                </div>

                <button
                  onClick={() => {
                    setEditingDeal(null);

                    setDealForm({
                      title: "",
                      category: "",
                      description: "",
                      originalPrice: "",
                      dealPrice: "",
                    });

                    setShowDealForm(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#9e021c] px-6 py-3.5 text-xs font-semibold text-white transition"
                >
                  <Plus size={17} />
                  Add New Deal
                </button>

              </div>

              {/* DEAL FORM */}

              {showDealForm && (
                <div className="mb-8 border border-gray-200 bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.04)] sm:p-8">

                  <div className="mb-7 flex items-center justify-between">

                    <div>

                      <h2 className="text-xl font-semibold">
                        {editingDeal
                          ? "Edit Deal"
                          : "Create New Deal"}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        Add the offer details below.
                      </p>

                    </div>

                    <button
                      onClick={closeDealForm}
                      className="flex h-9 w-9 items-center justify-center border border-gray-200 hover:border-black"
                    >
                      <X size={17} />
                    </button>

                  </div>

                  <form
                    onSubmit={
                      editingDeal
                        ? handleUpdateDeal
                        : handleAddDeal
                    }
                    className="space-y-6"
                  >

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                      <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                          Deal Title
                        </label>

                        <input
                          name="title"
                          value={dealForm.title}
                          onChange={handleDealChange}
                          placeholder="e.g. Bridal Makeup Deal"
                          required
                          className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#780014]"
                        />

                      </div>

                      <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                          Category
                        </label>

                        <input
                          name="category"
                          value={dealForm.category}
                          onChange={handleDealChange}
                          placeholder="e.g. Makeup"
                          required
                          className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#780014]"
                        />

                      </div>

                    </div>

                    <div>

                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={dealForm.description}
                        onChange={handleDealChange}
                        rows="4"
                        placeholder="Write deal description..."
                        className="w-full resize-none border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#780014]"
                      />

                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                      <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                          Original Price
                        </label>

                        <input
                          name="originalPrice"
                          type="number"
                          value={
                            dealForm.originalPrice
                          }
                          onChange={handleDealChange}
                          placeholder="25000"
                          className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#780014]"
                        />

                      </div>

                      <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                          Deal Price
                        </label>

                        <input
                          name="dealPrice"
                          type="number"
                          value={dealForm.dealPrice}
                          onChange={handleDealChange}
                          placeholder="19999"
                          required
                          className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#780014]"
                        />

                      </div>

                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#9e051e] px-7 py-3.5 text-xs font-semibold text-white transition"
                      >

                        {editingDeal ? (
                          <>
                            <Check size={16} />
                            Update Deal
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            Add Deal
                          </>
                        )}

                      </button>

                      <button
                        type="button"
                        onClick={closeDealForm}
                        className="border border-gray-300 px-7 py-3.5 text-xs font-semibold text-black transition hover:border-black"
                      >
                        Cancel
                      </button>

                    </div>

                  </form>
                </div>
              )}

              {/* DEALS */}

              {dealsLoading ? (

                <div className="border border-gray-200 bg-white py-20 text-center">

                  <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#780014]" />

                  <p className="text-sm text-gray-500">
                    Loading deals...
                  </p>

                </div>

              ) : deals.length === 0 ? (

                <div className="border border-gray-200 bg-white py-20 text-center">

                 
                  

                  <h3 className="text-xl font-light">
                    No deals yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Create your first salon deal using the button above.
                  </p>

                  <button
                    onClick={() =>
                      setShowDealForm(true)
                    }
                    className="mt-6 inline-flex items-center gap-2 bg-[#221f20] px-6 py-3 text-xs font-semibold text-white hover:bg-black"
                  >
                    <Plus size={16} />
                    Create Deal
                  </button>

                </div>

              ) : (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {deals.map((deal) => (

                    <div
                      key={deal.id}
                      className="group border border-gray-200 bg-white p-6 transition duration-300 hover:border-[#780014]"
                    >

                      <div className="mb-6 flex items-start justify-between">

                        <div className="flex h-11 w-11 items-center justify-center bg-[#780014]/10 text-[#780014]">
                          <Tag size={20} />
                        </div>

                        <span className="bg-[#780014] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          {deal.category}
                        </span>

                      </div>

                      <h3 className="text-xl font-semibold">
                        {deal.title}
                      </h3>

                      <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-500">
                        {deal.description ||
                          "Special Regina Salon offer."}
                      </p>

                      <div className="mt-6 flex items-end gap-3">

                        {deal.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            Rs.{" "}
                            {Number(
                              deal.originalPrice
                            ).toLocaleString()}
                          </span>
                        )}

                        <span className="text-2xl font-semibold text-[#8f031a]">
                          Rs.{" "}
                          {Number(
                            deal.dealPrice || 0
                          ).toLocaleString()}
                        </span>

                      </div>

                      <div className="mt-6 flex gap-2 border-t border-gray-100 pt-5">

                        <button
                          onClick={() =>
                            startEditDeal(deal)
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 border border-gray-200 px-4 py-3 text-xs font-semibold transition hover:border-[#9b011a] hover:text-[#780014]"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteDeal(deal.id)
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 border border-red-200 px-4 py-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </>
          )}

        </main>
      </div>
    </div>
  );
};

// =====================================================
// SIMPLE BACK ICON
// =====================================================

const ArrowBackIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
};

export default AdminDashboard;

