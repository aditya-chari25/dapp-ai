## Blockchain based Task Management Website

This is a Blockchain Based task Management System where 
- Frontend - Next.JS
- Backend - Nest.JS
- Smart-Contract - Solidity
- AI-Integration - GPT4All
## Installation
First, clone the repository 
```bash
https://github.com/aditya-chari25/dapp-ai.git
```
Then install the frontend repositories and run the Next.JS Application
```bash
cd frontend/
npm i
npm run dev
```
In frontend include .env.local which will have the Backend URL
```bash
BACKEND_URL=http://localhost:8000
```
Then install the backend repositories and run the Nest Application
```bash
cd backend/my-nest-app
npm i
```
In Backend/my-nest-app there'll be URL for Holesky testnet, PrivateKey, Smart Contract Address and Port Number:-
```bash
INFURA_API_URL="Your-testnet-url"
PRIVATE_KEY=<"your-private-key">
CONTRACT_ADDRESS=<"your-smart-contract-address">
PORT=8000
```
Deploy the Smart Contract through Remix IDE, I have used Holesky Testnet for running the Smart Contract

Install [https://www.nomic.ai/gpt4all](GPT4All) locally in your system and install model LLama 3.2.1B Instruct for running the AI Chatbot <br>
And in Settings Enable Local API Server in GPT4All and runs in Port 4891

