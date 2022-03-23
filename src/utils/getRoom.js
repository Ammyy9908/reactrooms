import axios from "axios";

const getRoom = async (id) => {
  try {
    const r = await axios.get(
      `https://group-chat-serverreact.herokuapp.com/roomapi/room/${id}`
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default getRoom;
