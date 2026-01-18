# MiniDB

A simple database language interpreter built in JavaScript/Node.js. MiniDB provides basic key-value storage operations through an easy-to-use command interface.

## Features

- **Simple Commands**: Store and retrieve data with `STORE` and `GET` commands
- **Multiple Data Types**: Support for strings, numbers, and identifiers
- **Interactive Mode**: REPL interface for live database operations
- **Command Line Mode**: Execute single commands from terminal
- **Error Handling**: Clear error messages for invalid operations

## Installation

Clone or download the project files:

```bash
git clone <repository-url>
cd minidb
```

No additional dependencies required - uses only Node.js built-in modules.

## Usage

### Interactive Mode

Start the interactive REPL:

```bash
node minidb.js
```

Example session:
```
MiniDB Interactive Mode
Commands: STORE [key] [value], GET [key]
Type "exit" to quit, "show" to display all data

MiniDB> STORE name "John Doe"
Stored: name = John Doe
MiniDB> STORE name "Jane Smith"
Appended to name: ["John Doe","Jane Smith"]
MiniDB> STORE age 25
Stored: age = 25
MiniDB> STORE age 30
Appended to age: [25,30]
MiniDB> GET name
[ 'John Doe', 'Jane Smith' ]
MiniDB> GET age
[ 25, 30 ]
MiniDB> show
Database contents: { name: [ 'John Doe', 'Jane Smith' ], age: [ 25, 30 ] }
MiniDB> exit
Goodbye!
```

### Command Line Mode

Execute single commands:

```bash
node minidb.js STORE username "alice"
node minidb.js GET username
node minidb.js STORE score 95.5
```

### Using as a Module

```javascript
const MiniDB = require('./minidb');

const db = new MiniDB();
db.execute('STORE name "Alice"');
const result = db.execute('GET name');
console.log(result); // "Alice"
```

## Commands

### STORE
Store a key-value pair in the database. If the key already exists, the new value is appended to a list instead of overwriting.

**Syntax:** `STORE [key] [value]`

**Examples:**
```
STORE name "John Doe"     # First value: "John Doe"
STORE name "Jane Smith"   # Creates list: ["John Doe", "Jane Smith"]
STORE name "Bob Wilson"   # Appends to list: ["John Doe", "Jane Smith", "Bob Wilson"]
STORE age 25              # First value: 25
STORE age 30              # Creates list: [25, 30]
```

### GET
Retrieve a value by its key.

**Syntax:** `GET [key]`

**Examples:**
```
GET name                  # Returns stored value
GET nonexistent          # Error: Key not found
```

### Interactive Commands
- `show` - Display all database contents
- `exit` - Quit interactive mode

## Grammar (BNF)

```bnf
<program> ::= <statement> | <statement> <program>
<statement> ::= <store_command> | <get_command>
<store_command> ::= "STORE" <key> <value>
<get_command> ::= "GET" <key>
<key> ::= <identifier>
<value> ::= <string> | <number> | <identifier>
```

## Data Types

- **Strings**: Enclosed in double quotes `"hello world"`
- **Numbers**: Integer or decimal `42`, `3.14`
- **Identifiers**: Alphanumeric with underscores `user_name`, `active`

## Testing

Run the included test suite:

```bash
npm test
```

Or run the test file directly:

```bash
node test-minidb.js
```

## Error Handling

MiniDB provides clear error messages for common issues:

- **Unknown command**: `Error: Unknown command: INVALID`
- **Missing arguments**: `Error: STORE command requires exactly 2 arguments`
- **Key not found**: `Error: Key not found: nonexistent`

## Implementation Details

- **Storage**: Uses a JavaScript object `{}` as the in-memory database
- **Tokenizer**: Custom tokenizer handles quoted strings and whitespace
- **Type Conversion**: Automatically converts numeric strings to numbers
- **Memory Only**: Data is not persisted between sessions

## License

MIT License - feel free to use and modify as needed.

## Contributing

This is a simple educational project. Feel free to extend it with additional features like:

- Data persistence (file storage)
- More data types (arrays, objects)
- Additional commands (DELETE, LIST, CLEAR)
- Query operations (FIND, FILTER)
- Transaction support