const axios = require('axios');

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzA0MDIzLCJpYXQiOjE3NDQ3MDM3MjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjUxNDMzMzVlLWFhMWMtNGZlZS05MjIwLTAzZTEzMGZhYzAzOSIsInN1YiI6ImJpcmluZGVyMjI5LmJlMjJAY2hpdGthcmEuZWR1LmluIn0sImVtYWlsIjoiYmlyaW5kZXIyMjkuYmUyMkBjaGl0a2FyYS5lZHUuaW4iLCJuYW1lIjoiYmlyaW5kZXIgc2luZ2giLCJyb2xsTm8iOiIyMjEwOTkwMjI5IiwiYWNjZXNzQ29kZSI6IlB3enVmRyIsImNsaWVudElEIjoiNTE0MzMzNWUtYWExYy00ZmVlLTkyMjAtMDNlMTMwZmFjMDM5IiwiY2xpZW50U2VjcmV0IjoidmF4eG5UeGRYQ0VNbnNkeCJ9.3WUi17YxbSw7N4IzZOxPsozriZW2BCu3IBGqK-E8wqI'; 

const fetchNumbers = async (type) => {
  const VALID_TYPES = ['p', 'f', 'e', 'r'];
  if (!VALID_TYPES.includes(type)) throw new Error('Invalid number ID');

  const source = axios.CancelToken.source();
  const timeout = setTimeout(() => source.cancel('Request timed out'), 500);

  try {
    const response = await axios.get(`http://20.244.56.144/evaluation-service/${type}`, {
      timeout: 500,
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      }
    });

    clearTimeout(timeout);
    return response.data.numbers || [];
  }catch (err) {
    clearTimeout(timeout);
    if (err.response) {
      console.error("❌ API Response Error:", err.response.status, err.response.data);
    } else if (err.request) {
      console.error("❌ No response received:", err.message);
    } else {
      console.error("❌ Request setup error:", err.message);
    }
    return [];
  }
};

module.exports = fetchNumbers;
