import axios from "axios";

export default axios.create({
  baseURL: "https://cryptonews-api.com/api/v1/category?section=general&items=50&token=xjwkrzgkqpuholbaygye2izyb1qv7h8by7pixw7p",
});