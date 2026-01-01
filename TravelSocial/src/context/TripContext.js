import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const useTrips = () => {
  const ctx = useContext(TripContext);
  if (!ctx) {
    throw new Error("useTrips must be used inside TripProvider");
  }
  return ctx;
};

/* 🔹 Helper: date ko safe string banane ke liye */
const formatDate = (date) => {
  if (!date) return null;
  if (typeof date === "string") return date; // backward support
  return date.toDateString();
};

export const TripProvider = ({ children }) => {
  /* ✅ INITIAL FRONTEND DATA */
  const [trips, setTrips] = useState([
    {
      id: "1",
      title: "Goa Trip",
      from: "Delhi",
      to: "Goa",
      startDate: "Mon Feb 12 2025",
      endDate: "Sun Feb 18 2025",
      status: "Planned",
      planningProgress: 60,
    },
    {
      id: "2",
      title: "Himachal Backpacking",
      from: "Chandigarh",
      to: "Kasol",
      startDate: "Wed Mar 20 2025",
      endDate: null,
      status: "Ongoing",
      planningProgress: 30,
    },
  ]);

  /* ➕ ADD */
  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      startDate: formatDate(trip.startDate),
      endDate: formatDate(trip.endDate),
    };
    setTrips((prev) => [...prev, newTrip]);
  };

  /* ✏️ UPDATE */
  const updateTrip = (id, updatedTrip) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updatedTrip,
              startDate: formatDate(updatedTrip.startDate),
              endDate: formatDate(updatedTrip.endDate),
            }
          : t
      )
    );
  };

  /* ❌ DELETE */
  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  /* ✅ COMPLETE */
  const completeTrip = (id) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "Completed",
              planningProgress: 100,
            }
          : t
      )
    );
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        completeTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};