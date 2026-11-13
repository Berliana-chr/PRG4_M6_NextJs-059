"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { hitungBMI } from "@/lib/bmi";  //manggil rumus
import Link from "next/link"; //kl mau ganti nama

//ngasih warna per kategori
function warnaKategori(kategori) {
    if (kategori === "Berat badan kurang") return "navy";
    if (kategori === "Normal") return "green";
    if (kategori === "Berat badan berlebih") return "goldenrod";
    return "red";
}

export default function Page() {
  const params = useParams();
  const nama = decodeURIComponent(params.namalengkap).replaceAll("-", " ");

  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [hasil, setHasil] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setHasil(hitungBMI(Number.parseFloat(berat), Number.parseFloat(tinggi)));
  }

  function handleReset(){
    setBerat("");
    setTinggi("");
    setHasil(null);
  }

  return (
    <main style={{ maxWidth: 360, margin: "40px auto", padding: "0 16px" }}>
      <h1>Halo, {nama}</h1>
      <p>Silakan masukkan berat badan dan tinggi kamu!</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 12, marginTop: 16 }}
      >
        <label>
          <label htmlFor="berat">Berat (kg)</label>
          <input
            type="number"
            step="any"
            min="1"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: 6 }}
          />
        </label>

        <label>
          <label htmlFor="tinggi">Tinggi (cm)</label>
          <input
            type="number"
            step="any"
            min="1"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            required
            style={{ display: "block", width: "100%", padding: 6 }}
          />
        </label>

        <button type="submit" style={{ padding: 8 }}>
          Hitung
        </button>

        {/* masukin handle reset */}
        <button type="button" onClick={handleReset} style={{ padding: 8 }}>
          Reset
        </button>

        {/* manggil link */}
        <p style={{ backgroundColor: "pink", padding:5, borderRadius:5}}>
            <Link href="/">Bukan kamu? Ganti nama</Link>
        </p>
      </form>

      {hasil && (
        //manggil warna
        <p style={{ marginTop: 16, color: warnaKategori(hasil.kategori) }}>
          BMI kamu: <strong>{hasil.bmi}</strong> ({hasil.kategori})
        </p>
      )}
    </main>
  );
}