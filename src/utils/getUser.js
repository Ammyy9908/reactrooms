import axios from "axios";
import Cookies from "js-cookie";
const getUser = async () => {
  try {
    const r = await axios.get(
      `https://group-chat-serverreact.herokuapp.com/api/user`,
      {
        headers: { Authorization: `${Cookies.get("token")}` },
      }
    );
    return r.data;
  } catch (e) {
    return null;
  }
};

export default getUser;
