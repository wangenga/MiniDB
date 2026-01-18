#!/usr/bin/env node

class MiniDB {
  constructor() {
    this.database = {};
  }

  // Parse and execute a MiniDB command
  execute(command) {
    const tokens = this.tokenize(command.trim());
    
    if (tokens.length === 0) {
      return null;
    }

    const operation = tokens[0].toUpperCase();

    switch (operation) {
      case 'STORE':
        return this.handleStore(tokens);
      case 'GET':
        return this.handleGet(tokens);
      default:
        throw new Error(`Unknown command: ${operation}`);
    }
  }

  // Simple tokenizer that handles quoted strings
  tokenize(input) {
    const tokens = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
        if (!inQuotes && current) {
          tokens.push(current);
          current = '';
        }
      } else if (char === ' ' && !inQuotes) {
        if (current) {
          tokens.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }
    
    if (current) {
      tokens.push(current);
    }
    
    return tokens;
  }

  // Handle STORE command
  handleStore(tokens) {
    if (tokens.length !== 3) {
      throw new Error('STORE command requires exactly 2 arguments: STORE [key] [value]');
    }

    const key = tokens[1];
    let value = tokens[2];

    // Try to parse as number
    if (!isNaN(value) && !isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }

    if (key in this.database) {
      // Key exists - append to list
      if (Array.isArray(this.database[key])) {
        // Already a list, append to it
        this.database[key].push(value);
      } else {
        // Convert existing value to list and append new value
        this.database[key] = [this.database[key], value];
      }
      return `Appended to ${key}: ${JSON.stringify(this.database[key])}`;
    } else {
      // New key - store as single value
      this.database[key] = value;
      return `Stored: ${key} = ${value}`;
    }
  }

  // Handle GET command
  handleGet(tokens) {
    if (tokens.length !== 2) {
      throw new Error('GET command requires exactly 1 argument: GET [key]');
    }

    const key = tokens[1];
    
    if (key in this.database) {
      return this.database[key];
    } else {
      throw new Error(`Key not found: ${key}`);
    }
  }

  // Show all stored data
  showAll() {
    return this.database;
  }
}

// Interactive mode
function startInteractive() {
  const readline = require('readline');
  const db = new MiniDB();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MiniDB> '
  });

  console.log('MiniDB Interactive Mode');
  console.log('Commands: STORE [key] [value], GET [key]');
  console.log('Type "exit" to quit, "show" to display all data\n');

  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim();

    if (input === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    if (input === 'show') {
      console.log('Database contents:', db.showAll());
      rl.prompt();
      return;
    }

    if (input === '') {
      rl.prompt();
      return;
    }

    try {
      const result = db.execute(input);
      if (result !== null) {
        console.log(result);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

// Command line mode
function runCommand(command) {
  const db = new MiniDB();
  try {
    const result = db.execute(command);
    if (result !== null) {
      console.log(result);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    startInteractive();
  } else {
    const command = args.join(' ');
    runCommand(command);
  }
}

module.exports = MiniDB;