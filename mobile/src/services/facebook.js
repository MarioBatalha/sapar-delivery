import axios from 'axios';

const graph = axios.create({
  baseURL: 'http://graph.facebook.com/v11.0',
});

export default graph;
