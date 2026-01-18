const MiniDB = require('./minidb');

// Create a new database instance
const db = new MiniDB();

console.log('=== MiniDB Test Suite ===\n');

try {
  // Test STORE commands
  console.log('Testing STORE commands:');
  console.log(db.execute('STORE name "John Doe"'));
  console.log(db.execute('STORE age 25'));
  console.log(db.execute('STORE city "New York"'));
  console.log(db.execute('STORE score 95.5'));
  
  console.log('\nTesting duplicate key behavior (append to list):');
  console.log(db.execute('STORE name "Jane Smith"'));  // Should append
  console.log(db.execute('STORE age 30'));             // Should append
  console.log(db.execute('STORE name "Bob Wilson"'));  // Should append again
  
  console.log('\nTesting GET commands:');
  console.log('name:', db.execute('GET name'));
  console.log('age:', db.execute('GET age'));
  console.log('city:', db.execute('GET city'));
  console.log('score:', db.execute('GET score'));
  
  console.log('\nDatabase contents:');
  console.log(db.showAll());
  
  console.log('\nTesting error cases:');
  try {
    db.execute('GET nonexistent');
  } catch (error) {
    console.log('Expected error:', error.message);
  }
  
  try {
    db.execute('INVALID command');
  } catch (error) {
    console.log('Expected error:', error.message);
  }
  
} catch (error) {
  console.error('Test failed:', error.message);
}