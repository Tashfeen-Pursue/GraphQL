"use client";

import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <div className="mt-20 flex justify-center items-center flex-col max-w-[95%] md:max-w-5xl mx-auto">
      {/* TYPOGRAPHY - used for text */}
      <Typography variant="h3" color="blue" sx={{ fontWeight: "bold" }}>
        Material UI
      </Typography>

      {/* BUTTONS */}
      <Button variant="outlined" onClick={() => alert("Hello World!")}>
        Click Me
      </Button>

      {/* INPUT FIELD */}
      <TextField
        type="text"
        size="small"
        variant="outlined"
        label="Name"
        placeholder="Please enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={name.length < 3}
        required
        sx={{ my: "10px" }}
      />
    </div>
  );
}
