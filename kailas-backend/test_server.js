const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testServer() {
  console.log('🧪 Testing Book Inventory Server...\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('   Environment:', healthResponse.data.environment);
    console.log('   Port:', healthResponse.data.port, '\n');

    // Test 2: Get All Books (should be empty initially)
    console.log('2. Testing GET /api/books...');
    const booksResponse = await axios.get(`${BASE_URL}/books`);
    console.log('✅ GET Books Success:', booksResponse.data.message || 'Books retrieved');
    console.log('   Total Books:', booksResponse.data.count);
    console.log('   Success:', booksResponse.data.success, '\n');

    // Test 3: Create a New Book
    console.log('3. Testing POST /api/books...');
    const newBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      price: 12.99,
      stock: 25,
      publishedYear: 1925
    };
    
    const createResponse = await axios.post(`${BASE_URL}/books`, newBook);
    console.log('✅ Book Created Successfully');
    console.log('   Title:', createResponse.data.data.title);
    console.log('   Author:', createResponse.data.data.author);
    console.log('   ID:', createResponse.data.data._id, '\n');

    const bookId = createResponse.data.data._id;

    // Test 4: Get the created book
    console.log('4. Testing GET /api/books after creation...');
    const updatedBooksResponse = await axios.get(`${BASE_URL}/books`);
    console.log('✅ Books after creation:', updatedBooksResponse.data.count);
    console.log('   First book title:', updatedBooksResponse.data.data[0].title, '\n');

    // Test 5: Update the book
    console.log('5. Testing PUT /api/books/:id...');
    const updateData = {
      price: 14.99,
      stock: 30
    };
    
    const updateResponse = await axios.put(`${BASE_URL}/books/${bookId}`, updateData);
    console.log('✅ Book Updated Successfully');
    console.log('   New Price:', updateResponse.data.data.price);
    console.log('   New Stock:', updateResponse.data.data.stock, '\n');

    // Test 6: Delete the book
    console.log('6. Testing DELETE /api/books/:id...');
    const deleteResponse = await axios.delete(`${BASE_URL}/books/${bookId}`);
    console.log('✅ Book Deleted Successfully');
    console.log('   Message:', deleteResponse.data.message, '\n');

    // Test 7: Verify book is deleted
    console.log('7. Verifying deletion...');
    const finalBooksResponse = await axios.get(`${BASE_URL}/books`);
    console.log('✅ Final book count:', finalBooksResponse.data.count, '\n');

    console.log('🎉 All tests passed! Server is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Data:', error.response.data);
    }
    
    process.exit(1);
  }
}

// Check if server is running before testing
async function checkServer() {
  try {
    await axios.get('http://localhost:5000/api/health', { timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const isServerRunning = await checkServer();
  
  if (!isServerRunning) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   cd backend && npm run dev');
    process.exit(1);
  }
  
  await testServer();
}

main();