"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function HomeForm() {
  interface FormType {
    name: string;
    phone: string;
    aadhaar: string;
  }

  interface FileType {
    tenthDmc?: File;
    sign?: File;
    photo?: File;
  }

  const [form, setForm] = useState<FormType>({
    name: "",
    phone: "",
    aadhaar: "",
  });

  const [files, setFiles] = useState<FileType>({});

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "phone" || name === "aadhaar") {
      newValue = value.replace(/\D/g, "");
    }

    // name, email, etc me koi filter nahi
    setForm({
      ...form,
      [name]: newValue,
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("fullName", form.name);
    data.append("mobileNo", form.phone);
    data.append("aadhar", form.aadhaar);

    if (files.tenthDmc) data.append("tenthDMC", files.tenthDmc);
    if (files.sign) data.append("sign", files.sign);
    if (files.photo) data.append("photo", files.photo);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/student/create-student`,
        data,
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setForm({
          name: "",
          phone: "",
          aadhaar: "",
        });

        setFiles({});

        formRef.current?.reset();
      }
    }catch (error: any) {
    const message =
      error?.response?.data?.message || "Somethig Went Wrong";
toast.error(message);
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900">
              Expert Computer Course (NIELIT)
            </h1>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <a href="/components/login">Login</a>
            </button>
          </div>

          <form ref={formRef} onSubmit={submitForm} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  pattern="[A-Za-z\s]{3,50}"
                  title="Name should contain only letters and spaces (3-50 characters)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile No.
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  placeholder="Enter Mobile No"
                  onChange={handleChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  pattern="[0-9]{10}"
                  title="Mobile number must be exactly 10 digits"
                  maxLength={10}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar / APAR ID
                </label>
                <input
                  name="aadhaar"
                  type="text"
                  value={form.aadhaar}
                  placeholder="Enter Aadhaar or APAR ID"
                  onChange={handleChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  pattern="[0-9]{12}"
                  title="Aadhaar must be exactly 12 digits"
                  maxLength={12}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upload Documents
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    10th DMC
                  </label>
                  <input
                    type="file"
                    name="tenthDmc"
                    onChange={handleFile}
                    className="text-black w-full  px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature
                  </label>
                  <input
                    type="file"
                    name="sign"
                    onChange={handleFile}
                    className=" text-black w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFile}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
