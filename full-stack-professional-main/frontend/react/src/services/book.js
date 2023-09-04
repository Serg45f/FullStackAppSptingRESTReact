import axios from 'axios';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export const getBooks = async () => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/books`,
      getAuthConfig()
    );
  } catch (e) {
    throw e;
  }
};

export const saveBook = async (book) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/books`,
      book
    );
  } catch (e) {
    throw e;
  }
};

export const updateBook = async (id, update) => {
  try {
    return await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/books/${id}`,
      update,
      getAuthConfig()
    );
  } catch (e) {
    throw e;
  }
};

export const deleteBook = async (id) => {
  try {
    return await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/books/${id}`,
      getAuthConfig()
    );
  } catch (e) {
    throw e;
  }
};

export const uploadBookProfilePicture = async (id, formData) => {
  try {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/books/${id}/profile-image`,
      formData,
      {
        ...getAuthConfig(),
        'Content-Type': 'multipart/form-data',
      }
    );
  } catch (e) {
    throw e;
  }
};

export const bookProfilePictureUrl = (id) =>
  `${import.meta.env.VITE_API_BASE_URL}/api/v1/books/${id}/profile-image`;
