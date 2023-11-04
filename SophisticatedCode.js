/* 
   Filename: SophisticatedCode.js
   
   Description: 

   This code is a simulation of a banking system. It includes four classes: Bank, Account, Transaction, and ATM.

   The Bank class manages multiple accounts and provides operations like opening a new account, closing an existing account, 
   transferring funds between accounts, and generating account statements.

   The Account class represents a bank account with properties like account number, balance, and a transaction history. It 
   provides methods for withdrawing and depositing funds.

   The Transaction class represents a single transaction made by a customer, including details like transaction type, amount, 
   and timestamp.

   The ATM class simulates an ATM machine, allowing users to perform transactions like balance inquiry, cash withdrawal, 
   and funds transfer by interacting with the Bank class.

   Note: This code does not include error handling or security features, as it is intended for demonstration purposes only.

*/

class Transaction {
  constructor(type, amount) {
    this.type = type;
    this.amount = amount;
    this.timestamp = new Date();
  }
}

class Account {
  constructor(accountNumber, initialBalance) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.transactionHistory = [];
  }

  deposit(amount) {
    this.balance += amount;
    const transaction = new Transaction('Deposit', amount);
    this.transactionHistory.push(transaction);
    console.log(`Deposited ${amount} to account ${this.accountNumber}`);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      const transaction = new Transaction('Withdrawal', amount);
      this.transactionHistory.push(transaction);
      console.log(`Withdrawn ${amount} from account ${this.accountNumber}`);
    } else {
      console.log(`Insufficient balance in account ${this.accountNumber}`);
    }
  }

  getStatement() {
    console.log(`Account Statement for Account ${this.accountNumber}`);
    console.log('---------------------------------------------');
    this.transactionHistory.forEach((transaction) =>
      console.log(
        `${transaction.type}: ${transaction.amount} (${transaction.timestamp})`
      )
    );
    console.log('---------------------------------------------');
    console.log(`Current Balance: ${this.balance}`);
  }
}

class Bank {
  constructor() {
    this.accounts = [];
  }

  openAccount(accountNumber, initialBalance) {
    if (this.getAccount(accountNumber) === undefined) {
      const account = new Account(accountNumber, initialBalance);
      this.accounts.push(account);
      console.log(`Opened account ${accountNumber}`);
    } else {
      console.log(`Account ${accountNumber} already exists`);
    }
  }

  closeAccount(accountNumber) {
    const accountIndex = this.getAccountIndex(accountNumber);
    if (accountIndex !== -1) {
      this.accounts.splice(accountIndex, 1);
      console.log(`Closed account ${accountNumber}`);
    } else {
      console.log(`Account ${accountNumber} does not exist`);
    }
  }

  transferFunds(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this.getAccount(fromAccountNumber);
    const toAccount = this.getAccount(toAccountNumber);

    if (fromAccount === undefined) {
      console.log(`Account ${fromAccountNumber} does not exist`);
    } else if (toAccount === undefined) {
      console.log(`Account ${toAccountNumber} does not exist`);
    } else if (fromAccount.balance < amount) {
      console.log(`Insufficient balance in account ${fromAccountNumber}`);
    } else {
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
      console.log(
        `Transferred ${amount} from account ${fromAccountNumber} to account ${toAccountNumber}`
      );
    }
  }

  getAccount(accountNumber) {
    return this.accounts.find(
      (account) => account.accountNumber === accountNumber
    );
  }

  getAccountIndex(accountNumber) {
    return this.accounts.findIndex(
      (account) => account.accountNumber === accountNumber
    );
  }
}

class ATM {
  constructor(bank) {
    this.bank = bank;
  }

  balanceInquiry(accountNumber) {
    const account = this.bank.getAccount(accountNumber);
    if (account === undefined) {
      console.log(`Account ${accountNumber} does not exist`);
    } else {
      console.log(`Current Balance in account ${accountNumber}: ${account.balance}`);
    }
  }

  cashWithdrawal(accountNumber, amount) {
    const account = this.bank.getAccount(accountNumber);
    if (account === undefined) {
      console.log(`Account ${accountNumber} does not exist`);
    } else {
      account.withdraw(amount);
    }
  }

  fundsTransfer(fromAccountNumber, toAccountNumber, amount) {
    this.bank.transferFunds(fromAccountNumber, toAccountNumber, amount);
  }
}

// Example Usage:

const bank = new Bank();

bank.openAccount(12345, 1000);
bank.openAccount(67890, 5000);
bank.openAccount(13579, 2000);

const atm = new ATM(bank);

atm.balanceInquiry(12345); // Output: Current Balance in account 12345: 1000

atm.cashWithdrawal(67890, 2000); // Output: Withdrawn 2000 from account 67890

atm.balanceInquiry(67890); // Output: Current Balance in account 67890: 3000

atm.fundsTransfer(13579, 12345, 500); // Output: Transferred 500 from account 13579 to account 12345

atm.balanceInquiry(13579); // Output: Current Balance in account 13579: 1500

atm.balanceInquiry(12345); // Output: Current Balance in account 12345: 1500

atm.fundsTransfer(13579, 67890, 2000); // Output: Insufficient balance in account 13579

atm.fundsTransfer(12345, 67890, 1500); // Output: Transferred 1500 from account 12345 to account 67890

atm.balanceInquiry(12345); // Output: Current Balance in account 12345: 0

atm.balanceInquiry(67890); // Output: Current Balance in account 67890: 4500