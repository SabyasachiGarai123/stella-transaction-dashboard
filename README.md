# Stellar Dashboard

A comprehensive web dashboard for interacting with the Stellar blockchain network, featuring a modern Stellar-themed UI.

## Features

- 🌟 **Stellar-Themed Design**: Beautiful gradient backgrounds and Stellar brand colors
- 📋 **Account Management**: Generate new Stellar accounts with automatic testnet funding
- 💰 **Balance Display**: Real-time account balance in XLM
- 📊 **Transaction History**: View recent transactions with links to Stellar Explorer
- 🔍 **Explorer Integration**: Direct links to view accounts and transactions on stellar.expert
- 💾 **Persistent Sessions**: Account data saved in browser for continued access
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Installation

1. Clone or download this project.
2. Run `npm install` to install dependencies.

## Usage

Run the project with:

```bash
npm start
```

Then open your browser and go to `http://localhost:3002`

### Dashboard Features:

1. **Generate Account**: Click to create a new Stellar account and fund it with testnet XLM
2. **View Balance**: See your current XLM balance (refreshes automatically)
3. **Recent Transactions**: Browse your latest transactions
4. **Stellar Explorer**: Open your account in the official Stellar Explorer

## Note

This is for educational purposes on the Stellar testnet. Never use the secret key generated here for real assets on mainnet. Account data is stored locally in your browser.

## Dependencies

- @stellar/stellar-sdk: Stellar JavaScript SDK
- express: Web framework for Node.js