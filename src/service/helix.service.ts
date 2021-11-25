import axios from 'axios';

const helix = axios.create({
  baseURL: process.env.HELIX_URL,
  headers: {
    'Content-Type': 'application/json',
    'fiware-service': 'helixiot',
    'fiware-servicepath': '/'
  }
});

helix.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 404) {
      throw new Error('Serviço ou recurso não encontrado.');
    }

    return Promise.reject(error);
  },
);

export const updateStatus = async (entityId: string, command: string) => {
  const path = `/v2/entities/${entityId}/attrs`;
  const data = {
      [command]: {
          type : "command",
          value : ""
      }
  };

  const resp = await helix.patch(path, data);

  return resp;
}
