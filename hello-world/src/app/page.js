"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  const [nama, setNama] = useState ("");
  const [error, setError] = useState("");   //error kl format nama salah

  function handleSubmit(e){
    e.preventDefault();
    const namaBersih = nama.trim().replace(/\s+/g, " ");
    
    if (namaBersih.length === 0){
      setError("Nama tidak boleh kosong!");
      return;
    }
    if (namaBersih.length <3){
      setError("Nama minimal 3 karakter!");
      return;
    }
    setError("");
    router.push(
      `/${"Kesehatan/PenghitungBMI/" + encodeURIComponent(namaBersih)}`,  
    );
  }

  return(
    <main style={{maxWidth:360, margin: "40px auto", padding:"0 16px"}}>
      <h1>Hai, perkenalkan dirimu</h1>

      <form onSubmit={handleSubmit} style={{display: "grid", gap:12, marginTop: 16}}>
        <label>
          <span>Nama Lengkap</span>
          <input type="text" value={nama} onChange={(e) => {setNama(e.target.value);
              if (error) setError("");
            }}
            style={{ display: "block", width: "100%", padding: 6 }}
            />
            {error && <span style={{ color: "red", fontSize: 14 }}>{error}</span>}
        </label>

        <button type="submit" style={{padding: 8}}>
          Lanjut
        </button>
      </form>
    </main>
  );
}