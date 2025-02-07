import type { NextConfig } from "next";

module.exports = {
  //add other configs here too
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
}

export default module;
