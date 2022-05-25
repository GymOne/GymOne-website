import http from "k6/http";
import { sleep } from "k6";

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "10s", target: 100 },
    { duration: "20s", target: 100 },
    { duration: "10s", target: 200 },
    { duration: "20s", target: 200 },
  ],
};

const API_BASE_URL = "http://185.51.76.122:8091";

export default () => {
  http.get(`${API_BASE_URL}/workout/workouts`);
  sleep(1);
};
