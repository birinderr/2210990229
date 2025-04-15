const axios = require('axios');

const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAyMzQ4LCJpYXQiOjE3NDQ3MDIwNDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjUxNDMzMzVlLWFhMWMtNGZlZS05MjIwLTAzZTEzMGZhYzAzOSIsInN1YiI6ImJpcmluZGVyMjI5LmJlMjJAY2hpdGthcmEuZWR1LmluIn0sImVtYWlsIjoiYmlyaW5kZXIyMjkuYmUyMkBjaGl0a2FyYS5lZHUuaW4iLCJuYW1lIjoiYmlyaW5kZXIgc2luZ2giLCJyb2xsTm8iOiIyMjEwOTkwMjI5IiwiYWNjZXNzQ29kZSI6IlB3enVmRyIsImNsaWVudElEIjoiNTE0MzMzNWUtYWExYy00ZmVlLTkyMjAtMDNlMTMwZmFjMDM5IiwiY2xpZW50U2VjcmV0IjoidmF4eG5UeGRYQ0VNbnNkeCJ9.WlFKAdnDrAfx6Fyge0XhesdyORhRATwpM977P4cZPn4'; 

const fetchNumbers = async (type) => {
  const VALID_TYPES = ['p', 'f', 'e', 'r'];
  if (!VALID_TYPES.includes(type)) throw new Error('Invalid number ID');

  const source = axios.CancelToken.source();
  const timeout = setTimeout(() => source.cancel('Request timed out'), 500);

  try {
  const response = await axios.get(`http://20.244.56.144/test/numbers/${type}`, {
    timeout: 500,
    cancelToken: source.token,
    headers: {
      Authorization: `${ACCESS_TOKEN}`
    }
  });

  clearTimeout(timeout);

  console.log("🟡 API raw response:", response.data);
  return response.data.numbers || [];
} catch (err) {
  clearTimeout(timeout);
  console.error("❌ API call failed:", err.message);
  return [];
}

};

module.exports = fetchNumbers;
