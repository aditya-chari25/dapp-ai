import type { NextConfig } from "next";

module.exports = {
  //add other configs here too
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    HUGGINGFACE_API_KEY:process.env.HUGGINGFACE_API_KEY
  },
}

export default module;
