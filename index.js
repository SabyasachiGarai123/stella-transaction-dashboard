const StellarSdk = require('@stellar/stellar-sdk');

// Use testnet
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Create a new keypair
const pair = StellarSdk.Keypair.random();

console.log('Public Key:', pair.publicKey());
console.log('Secret Key:', pair.secret());

// Fund the account using friendbot
fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`)
  .then(response => {
    if (response.ok) {
      console.log('Account funded successfully!');
      return response.json();
    } else {
      throw new Error('Failed to fund account');
    }
  })
  .then(data => {
    console.log('Transaction hash:', data.hash);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });