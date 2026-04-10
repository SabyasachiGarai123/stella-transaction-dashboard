const express = require('express');
const StellarSdk = require('@stellar/stellar-sdk');
const path = require('path');

const app = express();
const port = 3002;

// Use testnet
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to generate account
app.get('/generate-account', async (req, res) => {
  try {
    // Create a new keypair
    const pair = StellarSdk.Keypair.random();

    // Fund the account using friendbot
    const response = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`);
    if (!response.ok) {
      throw new Error('Failed to fund account');
    }
    const data = await response.json();

    res.json({
      publicKey: pair.publicKey(),
      secretKey: pair.secret(),
      transactionHash: data.hash,
      explorerUrl: `https://stellar.expert/explorer/testnet/tx/${data.hash}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get account balance
app.get('/account/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params;
    const account = await server.loadAccount(publicKey);
    const balance = account.balances.find(b => b.asset_type === 'native');
    res.json({
      balance: balance ? parseFloat(balance.balance).toFixed(2) : '0.00',
      account: {
        id: account.id,
        sequence: account.sequence,
        subentry_count: account.subentry_count,
        last_modified_ledger: account.last_modified_ledger,
        thresholds: account.thresholds,
        flags: account.flags,
        balances: account.balances,
        signers: account.signers
      }
    });
  } catch (error) {
    // If account not found, return zero balance
    if (error.response && error.response.status === 404) {
      res.json({
        balance: '0.00',
        account: null
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// API endpoint to get recent transactions
app.get('/transactions/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params;
    const transactions = await server.transactions()
      .forAccount(publicKey)
      .limit(20)
      .order('desc')
      .call();

    const formattedTransactions = transactions.records.map(tx => ({
      hash: tx.hash,
      created_at: tx.created_at,
      ledger: tx.ledger,
      operation_count: tx.operation_count,
      fee_charged: tx.fee_charged,
      successful: tx.successful,
      memo: tx.memo || null,
      source_account: tx.source_account
    }));

    res.json({ transactions: formattedTransactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get network info
app.get('/network-info', async (req, res) => {
  try {
    const response = await fetch('https://horizon-testnet.stellar.org/');
    const data = await response.json();
    res.json({
      latest_ledger: data.core_latest_ledger,
      base_fee: data.base_fee_in_stroops
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Stellar app listening at http://localhost:${port}`);
});