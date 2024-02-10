import React from "react";
import Sidebar from "./Sidebar";
import Tasks from "./Tasks";

export default function All() {
  return (
    <Sidebar>
      <Tasks />
    </Sidebar>
  );
}
