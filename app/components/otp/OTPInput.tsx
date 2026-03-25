"use client";

import { useRef } from "react";

type Props = {
 value: string;
 setValue: (val: string) => void;
};

export default function OTPInput({ value, setValue }: Props) {

 const inputs = useRef<(HTMLInputElement | null)[]>([]);

 function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {

  const val = e.target.value;

  if (!/^[0-9]?$/.test(val)) return;

  const arr = value.split("");
  arr[index] = val;

  setValue(arr.join(""));

  if (val && index < 5) {
   inputs.current[index + 1]?.focus();
  }

 }


 function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {

  const paste = e.clipboardData.getData("text");

  if (paste.length === 6) {

   setValue(paste);

   paste.split("").forEach((v: string, i: number) => {

    const input = inputs.current[i];

    if (input) {
     input.value = v;
    }

   });

  }

 }


 return (

  <div
   style={{
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "15px"
   }}
  >

   {[...Array(6)].map((_, i) => (

    <input
     key={i}
     ref={(el) => {
      inputs.current[i] = el;
     }}
     maxLength={1}
     onChange={(e) => handleChange(i, e)}
     onPaste={handlePaste}
     style={{
      width: "45px",
      height: "45px",
      textAlign: "center",
      fontSize: "20px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none"
     }}
    />

   ))}

  </div>

 );
}